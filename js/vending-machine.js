/**
 * Retro Arcade Vending Machine Logic
 * Manages riddle dispensing, coin handling, and user interactions
 */

import { RIDDLES, getRiddleByIndex, checkAnswer } from './riddles.js';

// Storage keys
const STORAGE_KEYS = {
  coins: 'nv_coins',
  riddleIndex: 'nv_riddle_index',
  riddlesSolved: 'nv_riddles_solved',
  totalAttempts: 'nv_total_attempts',
  currentStreak: 'nv_current_streak'
};

// Game state
let currentRiddle = null;
let riddleIndex = 0;
let hintRevealed = false;

// DOM elements
const elements = {
  screenText: document.getElementById('screen-text'),
  insertCoinBtn: document.getElementById('insert-coin-btn'),
  coinAnimation: document.getElementById('coin-animation'),
  newRiddleBtn: document.getElementById('new-riddle-btn'),
  hintBtn: document.getElementById('hint-btn'),
  revealBtn: document.getElementById('reveal-btn'),
  answerArea: document.getElementById('answer-area'),
  answerInput: document.getElementById('answer-input'),
  submitAnswerBtn: document.getElementById('submit-answer-btn'),
  coinCount: document.getElementById('coin-count'),
  riddlesSolved: document.getElementById('riddles-solved'),
  totalAttempts: document.getElementById('total-attempts'),
  currentStreak: document.getElementById('current-streak')
};

// Initialize
function init() {
  loadStats();
  loadRiddleIndex();
  updateCoinDisplay();
  attachEventListeners();
}

// Load stats from localStorage
function loadStats() {
  try {
    elements.riddlesSolved.textContent = localStorage.getItem(STORAGE_KEYS.riddlesSolved) || '0';
    elements.totalAttempts.textContent = localStorage.getItem(STORAGE_KEYS.totalAttempts) || '0';
    elements.currentStreak.textContent = localStorage.getItem(STORAGE_KEYS.currentStreak) || '0';
  } catch (e) {
    console.warn('Failed to load stats:', e);
  }
}

// Load riddle index
function loadRiddleIndex() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.riddleIndex);
    riddleIndex = stored ? parseInt(stored, 10) : 0;
  } catch (e) {
    riddleIndex = 0;
  }
}

// Save riddle index
function saveRiddleIndex() {
  try {
    localStorage.setItem(STORAGE_KEYS.riddleIndex, String(riddleIndex));
  } catch (e) {
    console.warn('Failed to save riddle index:', e);
  }
}

// Get current coins
function getCoins() {
  try {
    const v = localStorage.getItem(STORAGE_KEYS.coins);
    return v ? Number(v) : 0;
  } catch (e) {
    return 0;
  }
}

// Set coins
function setCoins(amount) {
  try {
    localStorage.setItem(STORAGE_KEYS.coins, String(amount));
    updateCoinDisplay();
  } catch (e) {
    console.warn('Failed to save coins:', e);
  }
}

// Update coin display
function updateCoinDisplay() {
  const coins = getCoins();
  elements.coinCount.textContent = `Coins: ${coins}`;

  // Enable/disable insert button based on coins
  if (coins <= 0 && !currentRiddle) {
    elements.insertCoinBtn.disabled = true;
    elements.insertCoinBtn.style.opacity = '0.5';
  } else if (!currentRiddle) {
    elements.insertCoinBtn.disabled = false;
    elements.insertCoinBtn.style.opacity = '1';
  }
}

// Update stats
function updateStat(key, value) {
  try {
    localStorage.setItem(key, String(value));
    const elementId = key.replace('nv_', '').replace(/_/g, '-');
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = value;
    }
  } catch (e) {
    console.warn('Failed to update stat:', e);
  }
}

// Display text on screen with typewriter effect
function displayText(text, options = {}) {
  const { instant = false, className = '' } = options;

  elements.screenText.className = `screen-text ${className}`;

  if (instant) {
    elements.screenText.innerHTML = text;
    return;
  }

  // Typewriter effect
  elements.screenText.innerHTML = '';
  let i = 0;
  const speed = 30;

  function typeWriter() {
    if (i < text.length) {
      elements.screenText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

// Insert coin animation and dispense riddle
function insertCoin() {
  const coins = getCoins();

  if (coins <= 0) {
    displayText('NO COINS!\nREAD ARTICLES\nTO EARN MORE', { instant: true, className: 'message-error' });
    return;
  }

  // Deduct coin
  setCoins(coins - 1);

  // Disable insert button
  elements.insertCoinBtn.disabled = true;

  // Play coin animation
  elements.coinAnimation.style.animation = 'none';
  setTimeout(() => {
    elements.coinAnimation.style.animation = 'coin-drop 0.8s ease-out';
  }, 10);

  // Show processing message
  displayText('PROCESSING...', { instant: true });

  // Dispense riddle after delay
  setTimeout(() => {
    dispenseRiddle();
  }, 1000);
}

// Dispense a new riddle
function dispenseRiddle() {
  // Get next riddle
  currentRiddle = getRiddleByIndex(riddleIndex);
  hintRevealed = false;

  // Increment riddle index (cycles through all 50)
  riddleIndex = (riddleIndex + 1) % RIDDLES.length;
  saveRiddleIndex();

  // Display riddle
  displayText(currentRiddle.question);

  // Enable control buttons
  elements.newRiddleBtn.disabled = false;
  elements.hintBtn.disabled = false;
  elements.revealBtn.disabled = false;

  // Show answer area
  elements.answerArea.style.display = 'block';
  elements.answerInput.value = '';
  elements.answerInput.focus();
}

// Show hint
function showHint() {
  if (!currentRiddle) return;

  if (!hintRevealed) {
    displayText(`${currentRiddle.question}\n\n💡 HINT: ${currentRiddle.hint}`, { instant: true });
    hintRevealed = true;
  }
}

// Reveal answer
function revealAnswer() {
  if (!currentRiddle) return;

  displayText(
    `${currentRiddle.question}\n\n✨ ANSWER: ${currentRiddle.answer.toUpperCase()}`,
    { instant: true, className: 'message-success' }
  );

  // Reset for next riddle
  setTimeout(() => {
    resetMachine();
  }, 5000);
}

// Submit answer
function submitAnswer() {
  if (!currentRiddle) return;

  const userAnswer = elements.answerInput.value.trim();

  if (!userAnswer) {
    displayText('ENTER AN ANSWER!', { instant: true, className: 'message-error' });
    return;
  }

  // Update attempts
  const attempts = parseInt(localStorage.getItem(STORAGE_KEYS.totalAttempts) || '0', 10);
  updateStat(STORAGE_KEYS.totalAttempts, attempts + 1);

  // Check answer
  if (checkAnswer(currentRiddle, userAnswer)) {
    // Correct!
    const solved = parseInt(localStorage.getItem(STORAGE_KEYS.riddlesSolved) || '0', 10);
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.currentStreak) || '0', 10);

    updateStat(STORAGE_KEYS.riddlesSolved, solved + 1);
    updateStat(STORAGE_KEYS.currentStreak, streak + 1);

    displayText(
      `✓ CORRECT!\n\n${currentRiddle.answer.toUpperCase()}\n\n🎉 STREAK: ${streak + 1}`,
      { instant: true, className: 'message-success' }
    );

    // Reset after success
    setTimeout(() => {
      resetMachine();
    }, 4000);
  } else {
    // Wrong answer
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.currentStreak) || '0', 10);
    if (streak > 0) {
      updateStat(STORAGE_KEYS.currentStreak, 0);
    }

    displayText(
      `✗ WRONG!\n\nTRY AGAIN\nOR USE HINT`,
      { instant: true, className: 'message-error' }
    );

    // Clear input
    elements.answerInput.value = '';
    elements.answerInput.focus();

    // Restore riddle after 2 seconds
    setTimeout(() => {
      displayText(hintRevealed
        ? `${currentRiddle.question}\n\n💡 HINT: ${currentRiddle.hint}`
        : currentRiddle.question,
        { instant: true }
      );
    }, 2000);
  }
}

// Reset machine for next riddle
function resetMachine() {
  currentRiddle = null;
  hintRevealed = false;

  // Disable control buttons
  elements.newRiddleBtn.disabled = true;
  elements.hintBtn.disabled = true;
  elements.revealBtn.disabled = true;

  // Hide answer area
  elements.answerArea.style.display = 'none';
  elements.answerInput.value = '';

  // Re-enable insert coin button if user has coins
  updateCoinDisplay();

  // Reset screen
  displayText('INSERT COIN<br><span class="blink">▼</span>', { instant: true });
}

// Get new riddle (costs another coin)
function getNewRiddle() {
  const coins = getCoins();

  if (coins <= 0) {
    displayText('NO COINS!\nREAD ARTICLES\nTO EARN MORE', { instant: true, className: 'message-error' });
    setTimeout(() => {
      displayText(currentRiddle.question, { instant: true });
    }, 2000);
    return;
  }

  // Reset current riddle
  resetMachine();

  // Insert coin for new riddle
  setTimeout(() => {
    insertCoin();
  }, 500);
}

// Attach event listeners
function attachEventListeners() {
  elements.insertCoinBtn.addEventListener('click', insertCoin);
  elements.newRiddleBtn.addEventListener('click', getNewRiddle);
  elements.hintBtn.addEventListener('click', showHint);
  elements.revealBtn.addEventListener('click', revealAnswer);
  elements.submitAnswerBtn.addEventListener('click', submitAnswer);

  // Enter key to submit
  elements.answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });
}

// Start the machine
init();
