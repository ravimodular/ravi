document.addEventListener('DOMContentLoaded', function () {
  // ----------------------------
  // Enhanced Mobile Navigation - FIXED
  // ----------------------------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinkItems.forEach(item => {
    item.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // ----------------------------
  // Enhanced Header Scroll Effect
  // ----------------------------
  const header = document.querySelector('.header');

  function updateHeader() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class based on scroll position
    header.classList.toggle('scrolled', currentScrollY > 50);
  }

  window.addEventListener('scroll', updateHeader);

  // ----------------------------
  // Enhanced Project Data
  // ----------------------------
  const projects = [
    { 
      title: "Mexico Pampanga", 
      images: ["mp/mexico_p1.jpg", "mp/mexico_p2.jpg", "mp/mexico_p3.jpg"],
      category: "residential"
    },
    { 
      title: "Sampaloc Manila", 
      images: ["sm/sm_1.jpg", "sm/sm_2.jpg", "sm/sm_3.jpg"],
      category: "commercial"
    },
    { 
      title: "Sampaloc Manila 2", 
      images: ["sm_2/sm_1.jpg", "sm_2/sm_2.jpg", "sm_2/sm_3.jpg", "sm_2/sm_4.jpg", "sm_2/sm_5.jpg", "sm_2/sm_6.jpg", "sm_2/sm_7.jpg"],
      category: "commercial"
    },
    { 
      title: "Makati City", 
      images: ["mc/mc_1.jpg", "mc/mc_2.jpg", "mc/mc_3.jpg", "mc/mc_4.jpg", "mc/mc_5.jpg", "mc/mc_8.jpg"],
      category: "residential"
    },
    { 
      title: "Lindenwood Residences", 
      images: ["lr/lr_1.jpeg", "lr/lr_2.jpeg", "lr/lr_3.jpeg", "lr/lr_4.jpeg"],
      category: "residential"
    },
    { 
      title: "Vista Real QC", 
      images: ["vrqc/vrqc_1.jpg", "vrqc/vrqc_2.jpg", "vrqc/vrqc_3.jpg", "vrqc/vrqc_4.jpg", "vrqc/vrqc_5.jpg", "vrqc/vrqc_6.jpg", "vrqc/vrqc_7.jpg"],
      category: "residential"
    },
    { 
      title: "Project 8 QC", 
      images: ["p8qc/p8qc_1.jpg", "p8qc/p8qc_2.jpg", "p8qc/p8qc_3.jpg", "p8qc/p8qc_4.jpg", "p8qc/p8qc_5.jpg", "p8qc/p8qc_6.jpg", "p8qc/p8qc_7.jpg", "p8qc/p8qc_8.jpg","p8qc/p8qc_9.jpg","p8qc/p8qc_10.jpg"],
      category: "commercial"
    },
    { 
      title: "BGC", 
      images: ["bgc/bgc_1.jpg", "bgc/bgc_2.jpg", "bgc/bgc_3.jpg", "bgc/bgc_4.jpg", "bgc/bgc_5.jpg", "bgc/bgc_6.jpg", "bgc/bgc_7.jpg", "bgc/bgc_8.jpg"],
      category: "commercial"
    },
    { 
      title: "Quezon City, K Brosas", 
      images: ["qc_kbrosas/qck_1.jpg", "qc_kbrosas/qck_2.jpg", "qc_kbrosas/qck_3.jpg"],
      category: "residential"
    },
    { 
      title: "Oro Vista Royale, Antipolo City", 
      images: ["antip/antip_1.jpg", "antip/antip_2.jpg", "antip/antip_3.jpg", "antip/antip_4.jpg"],
      category: "residential"
    },
    { 
      title: "Casa Mithi Resort, Pampanga", 
      images: ["cm/cm_1.jpg", "cm/cm_2.jpg", "cm/cm_3.jpg", "cm/cm_4.jpg", "cm/cm_5.jpg", "cm/cm_6.jpg","cm/cm_7.jpg", "cm/cm_8.jpg"],
      category: "commercial"
    }  
  ];

  // ----------------------------
  // DOM elements
  // ----------------------------
  const projectsContainer = document.getElementById('projectsContainer');
  const pagination = document.getElementById('pagination');
  const viewCreationsBtn = document.getElementById('viewCreationsBtn');

  // ----------------------------
  // Pagination variables
  // ----------------------------
  let currentPage = 1;
  const projectsPerPage = 3;
  let filteredProjects = [...projects];
  let galleryIntervals = new Map();

  // ----------------------------
  // Enhanced Initialization
  // ----------------------------
  function init() {
    renderProjects();
    renderPagination();
    setupGalleryNavigation();
    setupImageModal();
    setupViewCreationsButton();
    animateOnScroll();
    setupSmoothScrolling();
  }

  // ----------------------------
  // Enhanced Project Rendering
  // ----------------------------
  function renderProjects() {
    projectsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);

    projectsToShow.forEach((project, projectIndex) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.setAttribute('data-title', project.title);
      projectCard.setAttribute('data-category', project.category);
      projectCard.style.animationDelay = `${projectIndex * 0.1}s`;

      let imagesHTML = '';
      project.images.forEach((img, imgIndex) => {
        imagesHTML += `
          <img 
            src="${img}" 
            alt="${project.title} - Image ${imgIndex + 1}" 
            loading="${imgIndex === 0 ? 'eager' : 'lazy'}"
          >
        `;
      });

      projectCard.innerHTML = `
        <div class="gallery" data-project="${project.title}">
          <div class="gallery-track">
            ${imagesHTML}
          </div>
          <div class="gallery-nav prev" aria-label="Previous image">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="gallery-nav next" aria-label="Next image">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        <div class="gallery-indicator">
          ${project.images.map((_, i) => 
            `<span class="indicator-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
          ).join('')}
        </div>
        <h3>${project.title}</h3>
      `;

      projectsContainer.appendChild(projectCard);
    });

    // Trigger animation
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('visible');
      });
    }, 100);

    setupGalleryNavigation();
  }

  // ----------------------------
  // Enhanced Gallery Navigation with Auto-play
  // ----------------------------
  function setupGalleryNavigation() {
    // Clear existing intervals
    galleryIntervals.forEach(interval => clearInterval(interval));
    galleryIntervals.clear();

    document.querySelectorAll('.gallery').forEach(gallery => {
      const track = gallery.querySelector('.gallery-track');
      const prevBtn = gallery.querySelector('.prev');
      const nextBtn = gallery.querySelector('.next');
      const images = gallery.querySelectorAll('img');
      const indicators = gallery.parentElement.querySelectorAll('.indicator-dot');
      let currentIndex = 0;

      function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
        });
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
      }

      // Initialize
      updateSlide();

      // Event listeners
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        resetAutoPlay();
      });

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        resetAutoPlay();
      });

      // Indicator clicks
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentIndex = index;
          updateSlide();
          resetAutoPlay();
        });
      });

      // Auto-play
      let slideInterval = setInterval(nextSlide, 4000);
      galleryIntervals.set(gallery, slideInterval);

      function resetAutoPlay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
        galleryIntervals.set(gallery, slideInterval);
      }

      // Pause on hover
      gallery.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });

      gallery.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
        galleryIntervals.set(gallery, slideInterval);
      });

      // Touch support for mobile
      let startX = 0;
      let currentX = 0;

      gallery.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearInterval(slideInterval);
      });

      gallery.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
      });

      gallery.addEventListener('touchend', () => {
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        resetAutoPlay();
      });
    });
  }

  // ----------------------------
  // FIXED Image Modal with Gesture Support
  // ----------------------------
  function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let currentProjectImages = [];
    let currentImageIndex = 0;
    let touchStartX = 0;
    let isModalOpen = false;

    function openModal(images, startIndex) {
      currentProjectImages = images;
      currentImageIndex = startIndex;
      
      // Set modal to display block first
      modal.style.display = 'block';
      
      // Force reflow
      modal.offsetHeight;
      
      // Then add active class for animation
      setTimeout(() => {
        modal.classList.add('active');
        modalImg.src = currentProjectImages[currentImageIndex];
        modalImg.alt = `Project image ${currentImageIndex + 1} of ${currentProjectImages.length}`;
        document.body.style.overflow = 'hidden';
        isModalOpen = true;
      }, 10);
    }

    function closeModalHandler() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      isModalOpen = false;
      
      // Wait for animation to complete before hiding
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
      modalImg.src = currentProjectImages[currentImageIndex];
      animateImageChange('next');
    }

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
      modalImg.src = currentProjectImages[currentImageIndex];
      animateImageChange('prev');
    }

    function animateImageChange(direction) {
      modalImg.style.opacity = '0';
      setTimeout(() => {
        modalImg.style.opacity = '1';
      }, 50);
    }

    // Open modal on image click - FIXED
    document.addEventListener('click', function (e) {
      if (e.target.matches('.gallery-track img') && !isModalOpen) {
        const gallery = e.target.closest('.gallery-track');
        currentProjectImages = Array.from(gallery.querySelectorAll('img')).map(img => img.src);
        currentImageIndex = Array.from(gallery.querySelectorAll('img')).indexOf(e.target);
        openModal(currentProjectImages, currentImageIndex);
      }
    });

    // Close modal - FIXED
    closeModal.addEventListener('click', closeModalHandler);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalHandler();
      }
    });

    // Keyboard navigation - FIXED
    document.addEventListener('keydown', function (e) {
      if (!isModalOpen) return;

      switch(e.key) {
        case "Escape":
          closeModalHandler();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
      }
    });

    // Modal navigation - FIXED
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });

    // Touch gestures for modal - FIXED
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    modal.addEventListener('touchend', (e) => {
      if (!isModalOpen) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    });

    // Prevent modal from closing when clicking on navigation buttons or image
    [prevBtn, nextBtn, modalImg].forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  // ----------------------------
  // "View Our Creations" Button Functionality
  // ----------------------------
  function setupViewCreationsButton() {
    if (viewCreationsBtn) {
      viewCreationsBtn.addEventListener('click', function() {
        // Smooth scroll to projects section
        document.querySelector('.features-section').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Add subtle animation to first project cards
        setTimeout(() => {
          const firstCards = document.querySelectorAll('.project-card');
          firstCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.transform = 'translateY(0) scale(1.02)';
              setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
              }, 200);
            }, index * 100);
          });
        }, 500);
      });
    }
  }

  // ----------------------------
  // Enhanced Pagination
  // ----------------------------
  function renderPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
    if (pageCount <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&laquo;';
    prevBtn.setAttribute('aria-label', 'Previous page');
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProjects();
        renderPagination();
        scrollToProjects();
      }
    });
    pagination.appendChild(prevBtn);

    // Page buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.setAttribute('aria-label', `Page ${i}`);
      if (i === currentPage) pageBtn.classList.add('active');
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderProjects();
        renderPagination();
        scrollToProjects();
      });
      pagination.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&raquo;';
    nextBtn.setAttribute('aria-label', 'Next page');
    nextBtn.disabled = currentPage === pageCount;
    nextBtn.addEventListener('click', () => {
      if (currentPage < pageCount) {
        currentPage++;
        renderProjects();
        renderPagination();
        scrollToProjects();
      }
    });
    pagination.appendChild(nextBtn);
  }

  function scrollToProjects() {
    window.scrollTo({ 
      top: projectsContainer.offsetTop - 100, 
      behavior: 'smooth' 
    });
  }

  // ----------------------------
  // Enhanced Scroll Animations
  // ----------------------------
  function animateOnScroll() {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
  }

  // ----------------------------
  // Enhanced Smooth Scrolling
  // ----------------------------
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ----------------------------
  // Initialize Enhanced App
  // ----------------------------
  init();
});

// ----------------------------
// Enhanced Security & UX
// ----------------------------
document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  // Allow F12 for development, but block in production
  if (e.keyCode === 123 && window.location.hostname !== 'localhost') {
    e.preventDefault();
  }
  
  // Block other dev tools shortcuts in production
  if (window.location.hostname !== 'localhost' && (
    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
    (e.ctrlKey && e.keyCode === 85)
  )) {
    e.preventDefault();
  }
});

// ----------------------------
// Enhanced Error Handling
// ----------------------------
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
});