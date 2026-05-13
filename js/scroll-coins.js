/**
 * Automatic Scroll-Depth Coin Earning System
 * Awards coins at 25%, 50%, 75%, and 100% scroll milestones
 */

(function() {
  'use strict';

  // Configuration
  const MILESTONES = [25, 50, 75, 100];
  const COIN_VALUE = 1;
  const STORAGE_KEY = 'nv_coins';
  const MILESTONE_KEY_PREFIX = 'nv_milestone_';

  // Track which milestones have been reached for this page
  const currentPageKey = window.location.pathname;
  const earnedMilestones = new Set();

  // Initialize from localStorage
  try {
    const stored = localStorage.getItem(MILESTONE_KEY_PREFIX + currentPageKey);
    if (stored) {
      JSON.parse(stored).forEach(m => earnedMilestones.add(m));
    }
  } catch (e) {
    console.warn('Failed to load milestone data:', e);
  }

  // Get current coins
  function getCoins() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v ? Number(v) : 0;
    } catch (e) {
      return 0;
    }
  }

  // Set coins
  function setCoins(amount) {
    try {
      localStorage.setItem(STORAGE_KEY, String(amount));
      updateCoinDisplay();
    } catch (e) {
      console.warn('Failed to save coins:', e);
    }
  }

  // Update coin display in header
  function updateCoinDisplay() {
    const display = document.getElementById('coin-count');
    if (display) {
      display.textContent = `Coins: ${getCoins()}`;
    }
  }

  // Award coin and show notification
  function awardCoin(milestone) {
    const currentCoins = getCoins();
    const newCoins = currentCoins + COIN_VALUE;
    setCoins(newCoins);

    // Mark this milestone as earned
    earnedMilestones.add(milestone);
    try {
      localStorage.setItem(
        MILESTONE_KEY_PREFIX + currentPageKey,
        JSON.stringify([...earnedMilestones])
      );
    } catch (e) {
      console.warn('Failed to save milestone:', e);
    }

    // Show notification
    showCoinNotification(milestone);
  }

  // Show animated coin notification
  function showCoinNotification(milestone) {
    const notification = document.getElementById('coin-notification');
    if (!notification) return;

    const span = notification.querySelector('span');
    if (span) {
      span.textContent = `+${COIN_VALUE} Coin! (${milestone}% read)`;
    }

    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Calculate scroll percentage
  function getScrollPercentage() {
    const content = document.getElementById('scrollable-content') || document.body;
    const windowHeight = window.innerHeight;
    const documentHeight = content.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate percentage of content scrolled
    const scrollableHeight = documentHeight - windowHeight;
    if (scrollableHeight <= 0) return 100;

    return Math.min(100, (scrollTop / scrollableHeight) * 100);
  }

  // Check scroll depth and award coins
  function checkScrollMilestones() {
    const scrollPercent = getScrollPercentage();

    MILESTONES.forEach(milestone => {
      // If we've passed this milestone and haven't earned it yet
      if (scrollPercent >= milestone && !earnedMilestones.has(milestone)) {
        awardCoin(milestone);
      }
    });
  }

  // Debounce function to limit scroll event frequency
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Initialize scroll tracking
  function init() {
    // Update display on load
    updateCoinDisplay();

    // Check initial scroll position (in case user refreshed mid-page)
    setTimeout(checkScrollMilestones, 500);

    // Listen for scroll events (debounced)
    window.addEventListener('scroll', debounce(checkScrollMilestones, 200));

    // Also check on resize (in case viewport changes)
    window.addEventListener('resize', debounce(checkScrollMilestones, 300));
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
