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
 * (הוסר backTopBtn לגמרי)
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (!header) return;

  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * Accessibility + WhatsApp
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

  accBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // שלא יסגר מיד ע"י click בחוץ
    accPanel.classList.contains('open') ? closePanel() : openPanel();
  });

  if (accClose) accClose.addEventListener('click', closePanel);

  // סגירה בלחיצה מחוץ לפאנל
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

  function clearZoom() {
    site.classList.remove('acc-zoom-big', 'acc-zoom-small');
    site.style.transform = '';
  }

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
          openPanel();
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
          clearZoom();
          clearModes();

          document.documentElement.classList.remove('acc-zoom-big', 'acc-zoom-small');
          document.documentElement.style.fontSize = '';
          document.documentElement.style.zoom = '';
          document.documentElement.style.transform = '';

          openPanel();
          break;
      }
    });
  });

  /**
   * WhatsApp bubble (open/close + close on outside click)
   */
  const whatsappWrapper = document.querySelector(".whatsapp-wrapper");
  const whatsappMain = document.querySelector(".whatsapp-main");

  if (whatsappWrapper && whatsappMain) {
    // פתיחה/סגירה בלחיצה על הבועה
    whatsappMain.addEventListener("click", (e) => {
      e.stopPropagation();
      whatsappWrapper.classList.toggle("active");
    });

    // סגירה בלחיצה מחוץ לבועה
    document.addEventListener("click", (e) => {
      if (!whatsappWrapper.contains(e.target)) {
        whatsappWrapper.classList.remove("active");
      }
    });

    // סגירה עם ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        whatsappWrapper.classList.remove("active");
      }
    });
  }

})();
