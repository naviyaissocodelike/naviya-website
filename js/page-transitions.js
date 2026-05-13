/**
 * Smooth Page Transitions for Multi-Page Navigation
 * Adds fade-in animation and cross-fade effect when navigating between pages
 */

(function() {
  'use strict';

  // Apply fade-in animation on page load
  function initPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';

    // Fade in after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 50);
    });

    // If already loaded (cached page)
    if (document.readyState === 'complete') {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 50);
    }
  }

  // Intercept navigation links for smooth transitions
  function setupLinkTransitions() {
    // Get all internal links
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

    links.forEach(link => {
      // Skip if it's an anchor link or external
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      link.addEventListener('click', (e) => {
        // Allow default behavior for cmd/ctrl+click (open in new tab)
        if (e.metaKey || e.ctrlKey) return;

        e.preventDefault();
        const targetUrl = link.href;

        // Fade out
        document.body.style.opacity = '0';

        // Navigate after fade completes
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      });
    });
  }

  // Initialize
  initPageTransition();
  setupLinkTransitions();
})();
