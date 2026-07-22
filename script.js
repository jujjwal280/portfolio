/**
 * UJJWAL JAIN - INTERACTIVE PORTFOLIO ENGINE
 */

// 1. Dynamic Interactive Particle Mesh Canvas
class ParticleMesh {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 60;
    this.init();
  }

  init() {
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
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const isDark = document.body.classList.contains('dark-mode');
    this.ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)';
    this.ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)';

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

// 2. Terminal CLI Shell Controller
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

const COMMANDS = {
  help: "Available commands: <span class='t-cmd'>skills</span>, <span class='t-cmd'>projects</span>, <span class='t-cmd'>research</span>, <span class='t-cmd'>contact</span>, <span class='t-cmd'>stats</span>, <span class='t-cmd'>clear</span>",
  skills: "Core Skills: C++, Python, Dart, Flutter, Firebase, ARIMA, LSTM, Wireshark, DVWA, SQL.",
  projects: "Projects: 1. MoneyMinder (AI Finance) 2. College ERP 3. Drug Peddler Tracker 4. Wipro Security Lab.",
  research: "Publication: ICCSC 2026 IEEE Survey on AI-Driven Personal Finance Systems.",
  stats: "Academic SGPA: 8.3 | LeetCode: 350+ Problems Solved | IEEE Papers: 1",
  contact: "Email: jujjwal280@gmail.com | Phone: +91 63976 50021 | GitHub: jujjwal280"
};

function runCommand(cmd) {
  cmd = cmd.trim().toLowerCase();
  appendTerminalLine(`<span class="t-prompt">ujjwal@kiet:~$</span> ${cmd}`);

  if (cmd === 'clear') {
    terminalBody.innerHTML = '';
    return;
  }

  if (COMMANDS[cmd]) {
    appendTerminalLine(`<span class="t-out">${COMMANDS[cmd]}</span>`);
  } else if (cmd !== '') {
    appendTerminalLine(`<span style="color:#ef4444;">Command not found: '${cmd}'. Type 'help' for options.</span>`);
  }
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function appendTerminalLine(htmlContent) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = htmlContent;
  terminalBody.appendChild(line);
}

terminalInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    runCommand(terminalInput.value);
    terminalInput.value = '';
  }
});

// 3. Project Modal Injection System
const PROJECT_DETAILS = {
  moneyminder: {
    title: "MoneyMinder - AI Personal Finance",
    subtitle: "Flutter, Firebase, ARIMA, LSTM, Scikit-learn",
    body: `
      <p>Built a cross-platform mobile app featuring AI-driven expense predictions across 5+ categories using ARIMA and LSTM models.</p>
      <br>
      <h4>Key Metrics:</h4>
      <ul>
        <li>Reduced Firestore data-fetch latency by ~35% through query structuring.</li>
        <li>Architected full user journey from Figma wireframes to cloud release.</li>
        <li>Demonstrated to 50+ attendees at Innotech Tech Fest 2024.</li>
      </ul>
      <br>
      <a href="https://github.com/jujjwal280/major" target="_blank" class="btn btn-glow"><i class="fab fa-github"></i> Repository</a>
    `
  },
  erp: {
    title: "College ERP - Attendance System",
    subtitle: "Flutter, Firebase Firestore, Auth",
    body: `
      <p>Full-stack ERP app replacing manual attendance registers for 200+ students with digital record management.</p>
      <br>
      <h4>Key Metrics:</h4>
      <ul>
        <li>Implemented Role-Based Access Control (RBAC) via Firebase Auth.</li>
        <li>Reduced report generation time from hours to under 5 seconds.</li>
      </ul>
      <br>
      <a href="https://github.com/jujjwal280/erp" target="_blank" class="btn btn-glow"><i class="fab fa-github"></i> Repository</a>
    `
  },
  drugtracker: {
    title: "Drug Peddler Tracking System",
    subtitle: "Department SIH Shortlisted Project",
    body: `
      <p>Designed an NLP keyword extraction pipeline and social media graph analysis model to detect illicit trafficking networks.</p>
      <br>
      <h4>Achievements:</h4>
      <ul>
        <li>Shortlisted among top 3 out of 15+ competing teams at KIET SIH 2024.</li>
      </ul>
    `
  },
  securitylab: {
    title: "Network Security & Pentesting Lab",
    subtitle: "Wipro Centre of Excellence Internship",
    body: `
      <p>Inspected network packets using Wireshark and conducted web application penetration testing on DVWA.</p>
      <br>
      <h4>Work Scope:</h4>
      <ul>
        <li>Detected 3+ network anomalies during live traffic inspection.</li>
        <li>Practiced SQL Injection, XSS, and CSRF attack/defense mechanics.</li>
      </ul>
    `
  }
};

function openProjectModal(key) {
  const data = PROJECT_DETAILS[key];
  if (!data) return;

  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <h3>${data.title}</h3>
    <p style="color:var(--accent-primary); font-size:0.85rem; margin-bottom:1rem;">${data.subtitle}</p>
    <div>${data.body}</div>
  `;
  document.getElementById('project-modal').classList.add('active');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
}

// 4. Tab Switcher Logic
function switchExpTab(tabName) {
  document.querySelectorAll('.exp-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.exp-tab-content').forEach(c => c.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// 5. Scroll Progress & Theme Toggle
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('read-progress').style.width = `${scrolled}%`;
});

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
});

document.getElementById('top-btn')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 6. Project Filter Logic
document.querySelectorAll('.p-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.p-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const category = card.getAttribute('data-category') || '';
      if (filter === 'all' || category.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  new ParticleMesh();

  if (window.Typed) {
    new Typed('#typed-roles', {
      strings: [
        "Cross-Platform Flutter Apps",
        "ARIMA & LSTM Forecasting Pipelines",
        "Wireshark Vulnerability Assessments",
        "350+ Solved LeetCode Algorithms"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });
  }

  // Counter animation
  document.querySelectorAll('.metric-num').forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const dec = counter.getAttribute('data-dec');
    let count = 0;
    const speed = target / 30;

    const timer = setInterval(() => {
      count += speed;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      counter.textContent = dec ? count.toFixed(parseInt(dec)) : Math.floor(count);
    }, 40);
  });
});