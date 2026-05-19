// Header scroll state
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
  const open = mobileNav.hasAttribute('hidden');
  mobileNav.toggleAttribute('hidden', !open);
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.setAttribute('hidden', '');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

// Hero elements visible on load
requestAnimationFrame(() => {
  document.querySelectorAll('.hero-content .reveal, .hero-visual.reveal').forEach((el) => {
    el.classList.add('visible');
  });
});

// Craving carousel
const carousel = document.getElementById('craving-carousel');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');

if (carousel && prevBtn && nextBtn) {
  const scrollAmount = () => carousel.querySelector('.carousel-card')?.offsetWidth + 24 || 304;

  const updateButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    prevBtn.disabled = scrollLeft <= 4;
    nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 4;
  };

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  carousel.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}
