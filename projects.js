document.addEventListener('DOMContentLoaded', function() {
  // ----------------------------
  // Mobile navigation
  // ----------------------------
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

  // ----------------------------
  // Header scroll effect
  // ----------------------------
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ----------------------------
  // Project data
  // ----------------------------
  const projects = [
    {
      title: "Mexico Pampanga",
      images: ["mp/mexico_p1.jpg", "mp/mexico_p2.jpg", "mp/mexico_p3.jpg"]
    },
    {
      title: "Sampaloc Manila",
      images: ["sm/sm_1.jpg", "sm/sm_2.jpg", "sm/sm_3.jpg"]
    },
    {
      title: "Makati City",
      images: ["mc/mc_1.jpg", "mc/mc_2.jpg", "mc/mc_3.jpg", "mc/mc_4.jpg", "mc/mc_5.jpg", "mc/mc_8.jpg"]
    },
    {
      title: "Lindenwood Residences",
      images: ["lr/lr_1.jpeg", "lr/lr_2.jpeg", "lr/lr_3.jpeg", "lr/lr_4.jpeg"]
    },
    {
      title: "Vista Real QC",
      images: ["vrqc/vrqc_1.jpg", "vrqc/vrqc_2.jpg", "vrqc/vrqc_3.jpg", "vrqc/vrqc_4.jpg", "vrqc/vrqc_5.jpg", "vrqc/vrqc_6.jpg", "vrqc/vrqc_7.jpg"]
    },
    {
      title: "Project 8 QC",
      images: ["p8qc/p8qc_1.jpg", "p8qc/p8qc_2.jpg", "p8qc/p8qc_3.jpg", "p8qc/p8qc_4.jpg", "p8qc/p8qc_5.jpg", "p8qc/p8qc_6.jpg"]
    },
    {
      title: "BGC",
      images: ["bgc/bgc_1.jpg", "bgc/bgc_2.jpg", "bgc/bgc_3.jpg", "bgc/bgc_4.jpg", "bgc/bgc_5.jpg", "bgc/bgc_6.jpg", "bgc/bgc_7.jpg", "bgc/bgc_8.jpg"]
    }
  ];

  // ----------------------------
  // DOM elements
  // ----------------------------
  const projectsContainer = document.getElementById('projectsContainer');
  const pagination = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // ----------------------------
  // Pagination variables
  // ----------------------------
  let currentPage = 1;
  const projectsPerPage = 3;
  let filteredProjects = [...projects];

  // ----------------------------
  // Initialize
  // ----------------------------
  function init() {
    renderProjects();
    renderPagination();
    setupGalleryNavigation();
    setupImageModal();
    setupSearch();
    animateOnScroll();
  }

  // ----------------------------
  // Render projects
  // ----------------------------
  function renderProjects() {
    projectsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);

    projectsToShow.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'feature-card project-card';
      projectCard.setAttribute('data-title', project.title);

      let imagesHTML = '';
      project.images.forEach(img => {
        imagesHTML += `<img src="${img}" alt="${project.title} project">`;
      });

      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <div class="gallery">
          <div class="gallery-track">
            ${imagesHTML}
          </div>
          <div class="gallery-nav prev"><i class="fas fa-chevron-left"></i></div>
          <div class="gallery-nav next"><i class="fas fa-chevron-right"></i></div>
        </div>
      `;

      projectsContainer.appendChild(projectCard);
    });

    setupGalleryNavigation(); // Reinitialize for new elements
  }

  // ----------------------------
  // Gallery navigation
  // ----------------------------
  function setupGalleryNavigation() {
    document.querySelectorAll('.gallery').forEach(gallery => {
      const track = gallery.querySelector('.gallery-track');
      const prevBtn = gallery.querySelector('.prev');
      const nextBtn = gallery.querySelector('.next');
      const images = gallery.querySelectorAll('img');
      let currentIndex = 0;

      function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      updateSlide();

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
      });

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
      });

      let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
      }, 4000);

      gallery.addEventListener('mouseenter', () => clearInterval(slideInterval));
      gallery.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % images.length;
          updateSlide();
        }, 4000);
      });
    });
  }

  // ----------------------------
  // Image modal
  // ----------------------------
  function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    document.addEventListener('click', function(e) {
      if (e.target.matches('.gallery-track img')) {
        modal.style.display = "block";
        modalImg.src = e.target.src;
      }
    });

    closeModal.addEventListener('click', () => modal.style.display = "none");

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  }

  // ----------------------------
  // Search functionality
  // ----------------------------
  function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      searchResults.innerHTML = '';

      if (searchTerm.length < 2) {
        searchResults.classList.remove('active');
        filteredProjects = [...projects];
        currentPage = 1;
        renderProjects();
        renderPagination();
        return;
      }

      const matchedProjects = projects
        .filter(project => project.title.toLowerCase().includes(searchTerm))
        .slice(0, 5);

      if (matchedProjects.length > 0) {
        matchedProjects.forEach(project => {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          resultItem.textContent = project.title;
          resultItem.addEventListener('click', function() {
            searchInput.value = project.title;
            searchResults.classList.remove('active');
            filterProjects(project.title);
          });
          searchResults.appendChild(resultItem);
        });
        searchResults.classList.add('active');
      } else {
        const noResults = document.createElement('div');
        noResults.className = 'search-result-item';
        noResults.textContent = 'No projects found';
        searchResults.appendChild(noResults);
        searchResults.classList.add('active');
      }
    });

    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });

    function filterProjects(searchTerm) {
      filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      currentPage = 1;
      renderProjects();
      renderPagination();

      document.querySelector('.features-section').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  // ----------------------------
  // Pagination
  // ----------------------------
  function renderPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

    if (pageCount <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&laquo;';
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProjects();
        renderPagination();
        window.scrollTo({
          top: projectsContainer.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= pageCount; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderProjects();
        renderPagination();
        window.scrollTo({
          top: projectsContainer.offsetTop - 100,
          behavior: 'smooth'
        });
      });
      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&raquo;';
    nextBtn.addEventListener('click', () => {
      if (currentPage < pageCount) {
        currentPage++;
        renderProjects();
        renderPagination();
        window.scrollTo({
          top: projectsContainer.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
    pagination.appendChild(nextBtn);
  }

  // ----------------------------
  // Animate cards on scroll
  // ----------------------------
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

  // ----------------------------
  // Initialize
  // ----------------------------
  init();
});

// ----------------------------
// Block right-click and dev tools
// ----------------------------
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
      (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
    e.preventDefault();
  }
});
