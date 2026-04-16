/* ============================================================
   AVALUX — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header ───────────────────────────────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const mainNav   = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
  });

  // Mobile: tap dropdown parent to open/close
  document.querySelectorAll('.nav__item--dropdown > .nav__link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.nav__item--dropdown').classList.toggle('open');
      }
    });
  });
  document.querySelectorAll('.dropdown__item--has-sub > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.dropdown__item--has-sub').classList.toggle('open');
      }
    });
  });

  /* ── Hero Slider ─────────────────────────────────────────── */
  const slides   = document.querySelectorAll('.hero__slide');
  const dots     = document.querySelectorAll('.hero__dot');
  let current    = 0;
  let autoTimer  = null;

  function goToSlide(index) {
    slides[current].classList.remove('hero__slide--active');
    dots[current].classList.remove('hero__dot--active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('hero__slide--active');
    dots[current].classList.add('hero__dot--active');
    // Re-trigger text animations by cloning content
    resetSlideAnimations();
  }

  function resetSlideAnimations() {
    const active = slides[current];
    const animEls = active.querySelectorAll('.hero__sub, .hero__title, .hero__body, .hero__actions');
    animEls.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    });
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 5500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  document.getElementById('heroNext').addEventListener('click', () => { nextSlide(); startAuto(); });
  document.getElementById('heroPrev').addEventListener('click', () => { prevSlide(); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(+dot.dataset.slide);
      startAuto();
    });
  });

  startAuto();

  /* ── Scroll Reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.product-card, .value-card, .testimonial-card, .stat, .about-strip__text, .about-strip__image, .brand-logo, .section-header'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 4)}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* ── Animated Counters ───────────────────────────────────── */
  const counters = document.querySelectorAll('.stat__number[data-target]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const step   = Math.max(1, Math.ceil(target / 60));
      let current  = 0;
      const tick = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(tick); }
        else el.textContent = current;
      }, 28);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

});