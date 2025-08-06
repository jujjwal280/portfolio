document.addEventListener("DOMContentLoaded", () => {
  // --- Typed.js initialization (library-based) ---
  if (window.Typed) {
    new Typed("#typed-text", {
      strings: [
        "Mobile Developer.",
        "Machine Learning Enthusiast.",
        "Cybersecurity Researcher.",
        "Open Source Contributor.",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    });
  } else {
    // Fallback: custom typing animation on #hero-tagline if Typed.js not loaded
    const heroTagline = document.getElementById("hero-tagline");
    if (heroTagline) {
      const phrases = [
        "Full Stack Developer",
        "Open Source Enthusiast",
        "Tech Blogger",
        "Lifelong Learner",
      ];
      let phraseIndex = 0,
        letterIndex = 0,
        typingSpeed = 100,
        deletingSpeed = 50,
        delayBetweenPhrases = 1800;

      function type() {
        if (letterIndex <= phrases[phraseIndex].length) {
          heroTagline.textContent = phrases[phraseIndex].slice(0, letterIndex);
          letterIndex++;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(deleteText, delayBetweenPhrases);
        }
      }

      function deleteText() {
        if (letterIndex >= 0) {
          heroTagline.textContent = phrases[phraseIndex].slice(0, letterIndex);
          letterIndex--;
          setTimeout(deleteText, deletingSpeed);
        } else {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, typingSpeed);
        }
      }

      type();
    }
  }

  // --- ScrollReveal animations for content sections ---
  if (window.ScrollReveal) {
    ScrollReveal({
      distance: "40px",
      duration: 1000,
      easing: "ease-in-out",
      origin: "bottom",
      reset: false,
      interval: 200,
    }).reveal(".content-section");
  }

  // --- Navbar link active state on scroll ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + section.id) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // --- Theme toggle with persistence ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle?.querySelector("i");

  function setTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark");
      icon?.classList.remove("fa-sun");
      icon?.classList.add("fa-moon");
    } else {
      body.classList.remove("dark");
      icon?.classList.remove("fa-moon");
      icon?.classList.add("fa-sun");
    }
    localStorage.setItem("theme", theme);
  }

  // Initialize theme from localStorage
  setTheme(localStorage.getItem("theme") || "light");

  themeToggle?.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });

  // --- Particle.js config ---
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#38bdf8" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000" },
          polygon: { nb_sides: 5 },
        },
        opacity: { value: 0.3, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 120,
          color: "#38bdf8",
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          bounce: false,
          attract: { enable: false },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  // --- Project carousel using scrollBy (more flexible) ---
  const carousel = document.querySelector(".carousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  const scrollStep = 300;

  prevBtn?.addEventListener("click", () => {
    carousel?.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  nextBtn?.addEventListener("click", () => {
    carousel?.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  // --- Popup logic for projects and content sections ---

  const popup = document.querySelector(".popup");
  const popupCloseBtn = document.querySelector(".popup-close");
  const overlay = document.getElementById("overlay");

  // Reuse popup for projects with title/desc attributes
  document.querySelectorAll(".project").forEach((proj) => {
    proj.addEventListener("click", () => {
      const title = proj.getAttribute("data-title");
      const desc = proj.getAttribute("data-desc");
      if (popup) {
        const titleElem = popup.querySelector("#popup-title");
        const descElem = popup.querySelector("#popup-desc");
        if (titleElem && descElem) {
          titleElem.textContent = title || "";
          descElem.textContent = desc || "";
        }
        popup.classList.add("show", "active");
        overlay?.classList.add("show", "active");
      }
    });
  });

  // Popup triggers for content sections on scroll
  const popupTriggers = {
    about: "Welcome to the About section! Here you can learn more about me.",
    projects: "Check out some of my exciting projects I've worked on.",
    skills: "These are my core skills that I bring to every project.",
    contact: "Feel free to reach out to me via this Contact section!",
  };

  const shownPopups = new Set();

  window.addEventListener("scroll", () => {
    document.querySelectorAll(".content-section").forEach((section) => {
      const id = section.id;
      if (!shownPopups.has(id)) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (popupTriggers[id]) {
            if (popup) {
              popup.querySelector(".popup-message")?.textContent =
                popupTriggers[id];
              popup.classList.add("active", "show");
              overlay?.classList.add("active", "show");
              shownPopups.add(id);
            }
          }
        }
      }
    });
  });

  function hidePopup() {
    if (popup) popup.classList.remove("active", "show", "show");
    overlay?.classList.remove("active", "show");
  }

  popupCloseBtn?.addEventListener("click", hidePopup);
  overlay?.addEventListener("click", hidePopup);
});
