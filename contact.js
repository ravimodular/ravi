document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.contact-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));

  const heroContent = document.querySelector('.contact-hero .hero-content');
  if (heroContent) {
    heroContent.classList.add('visible');
  }

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // ✅ add this for the X animation
  });

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
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

  function openFacebook() {
    const fbAppUrl = "fb://page/100083231412583";
    const fbWebUrl = "https://www.facebook.com/ravimodularcabinet";

    // Try app link first
    window.location = fbAppUrl;

    // If app fails, fallback after short delay
    setTimeout(() => {
      window.open(fbWebUrl, '_blank');
    }, 500);
  }

  function openInstagram() {
    const igAppUrl = "instagram://user?username=ravimodular0121";
    const igWebUrl = "https://www.instagram.com/ravimodular0121";

    window.location = igAppUrl;

    setTimeout(() => {
      window.open(igWebUrl, '_blank');
    }, 500);
  }

  
  
