document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.contact-card');
  const heroContent = document.querySelector('.contact-hero .hero-content');

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

  // 👉 Observe the hero content too
  if (heroContent) {
    observer.observe(heroContent);
  }

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
});
