document.addEventListener("DOMContentLoaded", () => {
  // Cards fade in on scroll
  const cards = document.querySelectorAll('.cards-section .card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));

  // Hero title + subtitle animate one after another
  const heroTitle = document.querySelector('.about-hero .hero-title');
  const heroSubtitle = document.querySelector('.about-hero .hero-subtitle');

  if (heroTitle) heroTitle.classList.add('visible');
  if (heroSubtitle) heroSubtitle.classList.add('visible');

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Sticky header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
});
