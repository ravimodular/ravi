document.addEventListener("DOMContentLoaded", () => {
  // Fade in cards when in viewport
  const cards = document.querySelectorAll('.cards-section .card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => observer.observe(card));

  // Make hero content fade in immediately
  const heroContent = document.querySelector('.about-hero .hero-content');
  if (heroContent) {
    heroContent.classList.add('visible');
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
});
