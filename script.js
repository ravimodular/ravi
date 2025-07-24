document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinkItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Animate feature cards on scroll
  function animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (cardPosition < screenPosition) {
        card.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Trigger once on page load
});


document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable some F12 / Ctrl+Shift+I shortcuts
document.addEventListener('keydown', function(e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
  }
  // Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault();
  }
  // Ctrl+U (view source)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
  }
});
