/**
* Template Name: MyResume - v4.8.1
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  'use strict';

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const titleRole = select('.title-role');
  const titleCursor = select('.title-cursor');
  if (titleRole && titleCursor && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const titleText = titleRole.textContent || '';
    titleRole.textContent = '';
    let characterIndex = 0;

    const typeNextCharacter = () => {
      titleRole.textContent += titleText[characterIndex];
      characterIndex++;
      titleCursor.classList.remove('is-blinking');
      void titleCursor.offsetWidth;
      titleCursor.classList.add('is-blinking');

      if (characterIndex < titleText.length) {
        window.setTimeout(typeNextCharacter, 90);
      }
    };

    typeNextCharacter();
  }

  const contactContent = select('#contact .container');
  if (contactContent && 'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    contactContent.classList.add('contact-content-pending');
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('contact-content-visible');
          contactObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    contactObserver.observe(contactContent);
  }

  const sectionTitles = select('.section-title h2', true);
  if (sectionTitles.length && 'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sectionTitleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('section-title-visible', entry.isIntersecting);

        if (entry.isIntersecting) {
          void entry.target.offsetWidth;
        }
      });
    }, { threshold: 0.25 });

    sectionTitles.forEach((sectionTitle) => sectionTitleObserver.observe(sectionTitle));
  } else {
    sectionTitles.forEach((sectionTitle) => {
      sectionTitle.classList.add('section-title-visible');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  let scrollAnimationFrame = null;
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop;

    if (scrollAnimationFrame !== null) {
      window.cancelAnimationFrame(scrollAnimationFrame);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: elementPos, behavior: 'instant' });
      scrollAnimationFrame = null;
      return;
    }

    const startPosition = window.scrollY;
    const distance = elementPos - startPosition;
    const startTime = performance.now();
    const duration = 1400;

    const animateScroll = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 5);
      window.scrollTo({
        top: startPosition + distance * easedProgress,
        behavior: 'instant'
      });

      if (progress < 1) {
        scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationFrame = null;
      }
    };

    scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  document.addEventListener('click', (event) => {
    const body = select('body');
    const header = select('#header');
    const mobileNavToggle = select('.mobile-nav-toggle');

    if (!body.classList.contains('mobile-nav-active') || !header || !mobileNavToggle ||
      !(event.target instanceof Node)) {
      return;
    }

    if (!header.contains(event.target) && !mobileNavToggle.contains(event.target)) {
      body.classList.remove('mobile-nav-active');
      mobileNavToggle.classList.remove('bi-x');
      mobileNavToggle.classList.add('bi-list');
    }
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      const body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Portfolio grid layout
   */
  window.addEventListener('load', () => {
    const projectContainer = select('.project-container');
    if (projectContainer) {
      new Isotope(projectContainer, {
        itemSelector: '.project-item'
      });
    }
  });

  /**
   * Initiate project lightbox
   */
  if (select('.project-lightbox')) {
    GLightbox({
      selector: '.project-lightbox'
    });
  }

  /**
   * Portfolio details slider
   */
  if (select('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

})();
