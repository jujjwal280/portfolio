
class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.maxParticles = 100;
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '100%';

    this.ctx = this.canvas.getContext('2d');
    document.getElementById('animated-bg').appendChild(this.canvas);

    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  drawParticle(particle) {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = document.body.classList.contains('dark') ? '#8b5cf6' : '#6366f1';
    this.ctx.fill();
    this.ctx.restore();
  }

  drawConnections() {
    this.ctx.save();
    this.ctx.strokeStyle = document.body.classList.contains('dark') ? '#8b5cf6' : '#6366f1';
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.globalAlpha = (100 - distance) / 100 * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
    this.ctx.restore();
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();
    this.particles.forEach(particle => this.drawParticle(particle));

    requestAnimationFrame(() => this.animate());
  }
}

class AdvancedPortfolio {
  constructor() {
    this.particleSystem = null;
    this.typed = null;
    this.init();
  }

  init() {
    this.showLoadingScreen();
    this.initParticleSystem();
    this.initTypedJS();
    this.initScrollAnimations();
    this.initNavigation();
    this.initThemeToggle();
    this.initScrollProgress();
    this.initScrollToTop();
    this.initPopups();
    this.initContactForm();
    this.initProjectFilters();
    this.initSkillAnimations();
    this.initCounterAnimations();
    this.hideLoadingScreen();
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
    }
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 1500);
  }

  initParticleSystem() {
    this.particleSystem = new ParticleSystem();
  }

  initTypedJS() {
    if (window.Typed) {
      this.typed = new Typed('#typed-text', {
        strings: [
          "Mobile Developer",
          "AI & ML Enthusiast",
          "Cybersecurity Researcher",
          "Full-Stack Developer",
          "Open Source Contributor"
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }
  }

  initScrollAnimations() {
    if (window.ScrollReveal) {
      const sr = ScrollReveal({
        distance: '60px',
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        origin: 'bottom',
        reset: false,
        interval: 100
      });

      sr.reveal('.hero-content', { delay: 200 });
      sr.reveal('.section-header', { delay: 100 });
      sr.reveal('.about-text', { delay: 200, origin: 'left' });
      sr.reveal('.about-card', { delay: 300, origin: 'right' });
      sr.reveal('.project-card', { interval: 200 });
      sr.reveal('.skill-category', { interval: 150 });
      sr.reveal('.timeline-item', { interval: 200 });
      sr.reveal('.contact-item', { interval: 150, origin: 'left' });
      sr.reveal('.contact-form', { delay: 300, origin: 'right' });
    }
  }

  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section, .hero');

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId) || document.querySelector('.hero');

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 100;

      if (scrollPos < 300) {
        current = 'hero';
      } else {
        sections.forEach(section => {
          if (section.id && scrollPos >= section.offsetTop - 100) {
            current = section.id;
          }
        });
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` ||
          (current === 'hero' && link.getAttribute('href') === '#about')) {
          link.classList.add('active');
        }
      });
    });
  }

  initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
      const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    const body = document.body;
    const icon = document.querySelector('#theme-toggle i');

    if (theme === 'dark') {
      body.classList.add('dark');
      icon?.classList.remove('fa-moon');
      icon?.classList.add('fa-sun');
    } else {
      body.classList.remove('dark');
      icon?.classList.remove('fa-sun');
      icon?.classList.add('fa-moon');
    }

    localStorage.setItem('theme', theme);
  }

  initScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
  }

  initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  initPopups() {
    const overlay = document.getElementById('overlay');

    // Close popup functions
    window.showPopup = (id) => {
      const popup = document.getElementById(id);
      if (popup && overlay) {
        popup.classList.add('active');
        overlay.classList.add('active');
        popup.focus();
        document.body.style.overflow = 'hidden';
      }
    };

    window.closePopup = (id) => {
      const popup = document.getElementById(id);
      if (popup && overlay) {
        popup.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    // Close on overlay click
    overlay?.addEventListener('click', () => {
      const activePopups = document.querySelectorAll('.popup.active');
      activePopups.forEach(popup => {
        popup.classList.remove('active');
      });
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activePopups = document.querySelectorAll('.popup.active');
        activePopups.forEach(popup => {
          popup.classList.remove('active');
        });
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  initContactForm() {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
      submitBtn.disabled = true;

      // Simulate form submission
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        message.innerHTML = '<span style="color: var(--secondary-color);">✓ Message sent successfully!</span>';
        form.reset();
      } catch (error) {
        message.innerHTML = '<span style="color: var(--highlight-color);">✗ Failed to send message. Please try again.</span>';
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          message.innerHTML = '';
        }, 5000);
      }
    });
  }

  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category')?.split(' ') || [];

          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  initSkillAnimations() {
    const skillLevels = document.querySelectorAll('.skill-level');

    const animateSkills = () => {
      skillLevels.forEach(level => {
        const rect = level.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const targetWidth = level.parentElement.getAttribute('data-level') || '0';
          level.style.setProperty('--skill-width', `${targetWidth}%`);
          level.classList.add('animated');
        }
      });
    };

    // Add CSS for skill animation
    const style = document.createElement('style');
    style.textContent = `
      .skill-level.animated::after {
        width: var(--skill-width, 0%) !important;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check
  }

  initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
      counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          counter.classList.add('counted');

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
          }, 16);
        }
      });
    };

    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 2000); // Initial check after loading
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedPortfolio();
});

// Add smooth reveal animations for elements
const addRevealAnimation = () => {
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    .scale-in {
      transform: scale(0.8);
      opacity: 0;
      transition: all 0.5s ease;
    }

    .scale-in.active {
      transform: scale(1);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
};

addRevealAnimation();
