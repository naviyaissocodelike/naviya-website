// Fun interactive features for Naviya's personal website

// 1. Typewriter effect for the name
function typewriterEffect() {
    const nameElement = document.querySelector('h1');
    const name = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < name.length) {
            nameElement.textContent += name.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Add a subtle pulse effect after typing
            nameElement.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }, 100);
}

// 2. Animated bullet points that appear on scroll
function animateBullets() {
    const bullets = document.querySelectorAll('.content-list > li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    bullets.forEach(bullet => {
        bullet.style.opacity = '0';
        bullet.style.transform = 'translateX(-20px)';
        bullet.style.transition = 'all 0.5s ease';
        observer.observe(bullet);
    });
}

// 3. Interactive cursor trail
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #2563eb;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transition: opacity 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || { offsetLeft: mouseX, offsetTop: mouseY };
            dot.style.left = nextDot.offsetLeft + 'px';
            dot.style.top = nextDot.offsetTop + 'px';
        });
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
}

// 4. Dynamic time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 17) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// 5. Fun hover effects for links
function enhanceLinkHovers() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(4px) scale(1.02)';
            link.style.textShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0) scale(1)';
            link.style.textShadow = 'none';
        });
    });
}

// 6. Random color accent on page load
function randomAccentColor() {
    const colors = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#ea580c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Update CSS custom property
    document.documentElement.style.setProperty('--accent-color', randomColor);
    
    // Update all accent elements
    const accentElements = document.querySelectorAll('.content-list > li::before, .container::before');
    // Note: CSS custom properties will handle this automatically
}

// 7. Smooth scroll for internal links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 8. Add a subtle floating animation to the accent line
function floatingAccent() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .container::before {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// 9. Add a fun loading animation
function loadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Start with loading animation
    loadingAnimation();
    
    // Initialize features after a short delay
    setTimeout(() => {
        typewriterEffect();
        animateBullets();
        createCursorTrail();
        updateGreeting();
        enhanceLinkHovers();
        randomAccentColor();
        smoothScroll();
        floatingAccent();
    }, 1500);
});

// Add a fun easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out';
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});
