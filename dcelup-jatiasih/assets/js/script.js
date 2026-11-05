/**
 * D’Celup Chicken X-tra – Jatiasih
 * Main JavaScript (Vanilla JS - Lightweight & Accessible)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initMenuDetailToggles();
  initFaqAccordion();
});

/**
 * 1. Sticky Header Shadow on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Close drawer when a nav link is clicked
  const mobileLinks = mobileNav.querySelectorAll('.nav-mobile-link');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    }
  });
}

/**
 * 3. Menu Product Cards Detail Toggle (Info Detail ⌄ / Tutup Detail ⌃)
 * Both product name and "Info Detail" button can be clicked to toggle.
 */
function initMenuDetailToggles() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    const titleBtn = card.querySelector('.product-title-btn');
    const toggleBtn = card.querySelector('.btn-detail-toggle');
    const drawer = card.querySelector('.product-description-drawer');
    const toggleLabel = card.querySelector('.detail-label-text');
    const toggleIndicator = card.querySelector('.detail-indicator');

    if (!drawer || !toggleBtn) return;

    const toggleDrawer = () => {
      const isOpen = drawer.classList.contains('is-open');

      if (isOpen) {
        drawer.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (toggleLabel) toggleLabel.textContent = 'Info Detail';
        if (toggleIndicator) toggleIndicator.textContent = '⌄';
      } else {
        drawer.classList.add('is-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (toggleLabel) toggleLabel.textContent = 'Tutup Detail';
        if (toggleIndicator) toggleIndicator.textContent = '⌃';
      }
    };

    // Click on toggle button
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDrawer();
    });

    // Click on product title
    if (titleBtn) {
      titleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDrawer();
      });
    }
  });
}

/**
 * 4. FAQ Accordion with Keyboard Support (+ and - icon switch)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');
    const iconIndicator = item.querySelector('.faq-icon-indicator');

    if (!questionBtn || !answerPanel) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Optional: Close other FAQs for a clean accordion experience
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('is-active')) {
          other.classList.remove('is-active');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherIcon = other.querySelector('.faq-icon-indicator');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('is-active');
        questionBtn.setAttribute('aria-expanded', 'false');
        if (iconIndicator) iconIndicator.textContent = '+';
      } else {
        item.classList.add('is-active');
        questionBtn.setAttribute('aria-expanded', 'true');
        if (iconIndicator) iconIndicator.textContent = '−';
      }
    });
  });
}
