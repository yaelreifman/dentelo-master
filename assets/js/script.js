'use strict';

/**
 * addEvent on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (!elem) return;

  // NodeList
  if (elem.length && elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
    return;
  }

  // single element
  elem.addEventListener(type, callback);
};

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  if (!navbar || !navbarToggler) return;
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
};

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  if (!navbar || !navbarToggler) return;
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNav);

/**
 * header active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (!header || !backTopBtn) return;

  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Accessibility
 */
(function () {
  const accBtn = document.querySelector('.acc-float');
  const accPanel = document.querySelector('.acc-panel');
  const accClose = document.querySelector('.acc-close');
  const site = document.getElementById('site-wrapper');

  if (!accBtn || !accPanel || !site) return;

  function openPanel() {
    accPanel.classList.add('open');
    accPanel.setAttribute('aria-hidden', 'false');
    accBtn.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    accPanel.classList.remove('open');
    accPanel.setAttribute('aria-hidden', 'true');
    accBtn.setAttribute('aria-expanded', 'false');
  }

  accBtn.addEventListener('click', () => {
    accPanel.classList.contains('open') ? closePanel() : openPanel();
  });

  if (accClose) accClose.addEventListener('click', closePanel);

  // סגירה בלחיצה מחוץ לפאנל (אם את לא רוצה - תמחקי את כל הבלוק הזה)
  document.addEventListener('click', (e) => {
    if (!accPanel.classList.contains('open')) return;
    if (accPanel.contains(e.target) || accBtn.contains(e.target)) return;
    closePanel();
  });

  // סגירה עם ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  const buttons = accPanel.querySelectorAll('[data-action]');

  // ✅ זום עובד על #site-wrapper (כמו ה-CSS שלך)
  function clearZoom() {
    site.classList.remove('acc-zoom-big', 'acc-zoom-small');
    site.style.transform = ''; // למקרה שמשהו הוגדר inline
  }

  // ✅ מצבים ויזואליים/טקסט
  function clearModes() {
    site.classList.remove(
      'acc-grayscale',
      'acc-high-contrast',
      'acc-invert',
      'acc-light-bg',
      'acc-highlight-links',
      'acc-readable-font'
    );
    site.style.filter = '';
    site.style.backgroundColor = '';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');

      switch (action) {
        case 'bigger':
          clearZoom();
          site.classList.add('acc-zoom-big');
          openPanel(); // נשאר פתוח
          break;

        case 'smaller':
          clearZoom();
          site.classList.add('acc-zoom-small');
          openPanel();
          break;

        case 'grayscale':
          clearModes();
          site.classList.add('acc-grayscale');
          openPanel();
          break;

        case 'high-contrast':
          clearModes();
          site.classList.add('acc-high-contrast');
          openPanel();
          break;

        case 'invert':
          clearModes();
          site.classList.add('acc-invert');
          openPanel();
          break;

        case 'light-bg':
          clearModes();
          site.classList.add('acc-light-bg');
          openPanel();
          break;

        case 'links':
          clearModes();
          site.classList.add('acc-highlight-links');
          openPanel();
          break;

        case 'readable-font':
          clearModes();
          site.classList.add('acc-readable-font');
          openPanel();
          break;

        case 'reset':
          // ✅ איפוס מלא: גם זום וגם מצבים
          clearZoom();
          clearModes();

          // אם היה לך בעבר זום על html/font-size - נוודא שלא נשאר שום דבר
          document.documentElement.classList.remove('acc-zoom-big', 'acc-zoom-small');
          document.documentElement.style.fontSize = '';
          document.documentElement.style.zoom = '';
          document.documentElement.style.transform = '';

          // משאירים את הפאנל פתוח
          openPanel();
          break;
      }
    });
  });
})();
