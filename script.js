/* =========================================
   1. TYPING ANIMATION
========================================= */

const typingWords = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Data Analysis",
  "Python Development",
];

const typingElement = document.getElementById("typingText");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = currentWord.substring(0, charIndex);

  let delay = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    delay = 1400;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    delay = 350;
  }

  setTimeout(typeEffect, delay);
}

if (typingElement) {
  typeEffect();
}

/* =========================================
   2. DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");

function updateThemeIcon() {
  if (!themeIcon) return;

  const isLight = document.body.classList.contains("light-theme");

  themeIcon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode",
  );
}

function applyTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");

  updateThemeIcon();
}

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  // Continue with the default theme if storage is unavailable.
}

applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-theme");
  const nextTheme = isLight ? "dark" : "light";

  document.body.classList.add("theme-anim");
  applyTheme(nextTheme);
  setTimeout(() => document.body.classList.remove("theme-anim"), 500);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Theme still works until the page is refreshed.
  }
});

/* =========================================
   3. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const menuIcon = menuToggle?.querySelector("i");

function closeMenu() {
  navLinks?.classList.remove("open");

  menuToggle?.setAttribute("aria-expanded", "false");

  if (menuIcon) {
    menuIcon.className = "fa-solid fa-bars";
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  if (menuIcon) {
    menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* =========================================
   4. SCROLL REVEAL ANIMATION
========================================= */

const revealSections = document.querySelectorAll(".reveal-section");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });
} else {
  // Fallback for older browsers.
  revealSections.forEach((section) => {
    section.classList.add("visible");
  });
}

/* =========================================
   5. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navItems.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================================
   6. AUTOMATIC FOOTER YEAR
========================================= */

const currentYearElement = document.getElementById("currentYear");

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

/* =========================================
   7. MY SKILLS
========================================= */

// Premium category-based skills section

const skillGroups = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: "fa-solid fa-code",
    description:
      "Programming and problem-solving languages I use to build solutions.",
    skills: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "OOP", icon: "fa-solid fa-cube" },
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      ],
  },

  {
    id: "databases",
    title: "Databases",
    icon: "fa-solid fa-database",
    description: "Storing, managing and querying data for applications.",
    skills: [
      { name: "SQL", icon: "fa-solid fa-database" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
    ],
  },

  {
    id: "analysis",
    title: "Data Analysis & Processing",
    icon: "fa-solid fa-chart-column",
    description: "Data cleaning, manipulation and exploratory data analysis.",
    skills: [
      { name: "Pandas", icon: "devicon-pandas-plain colored" },
      { name: "NumPy", icon: "devicon-numpy-plain colored" },
      { name: "EDA", icon: "fa-solid fa-magnifying-glass-chart" },
      { name: "Data Cleaning", icon: "fa-solid fa-broom" },
      { name: "Feature Engineering", icon: "fa-solid fa-gears" },
    ],
  },

  {
    id: "machine-learning",
    title: "Machine Learning",
    icon: "fa-solid fa-brain",
    description: "Building and evaluating machine learning models.",
    skills: [
      { name: "Scikit-learn", icon: "devicon-scikitlearn-plain colored" },
      { name: "Regression", icon: "fa-solid fa-chart-line" },
      { name: "Classification", icon: "fa-solid fa-diagram-project" },
      { name: "Clustering", icon: "fa-solid fa-circle-nodes" },
      { name: "Model Evaluation", icon: "fa-solid fa-square-poll-vertical" },
    ],
  },

  {
    id: "visualization",
    title: "Data Visualization",
    icon: "fa-solid fa-chart-simple",
    description: "Creating visual insights from data to communicate results.",
    skills: [
      { name: "Matplotlib", icon: "devicon-matplotlib-plain colored" },
      { name: "Seaborn", icon: "fa-solid fa-chart-area" },
    ],
  },

  {
    id: "frameworks",
    title: "Frameworks",
    icon: "fa-solid fa-cubes",
    description: "Tools for building interactive applications and ML projects.",
    skills: [
      { name: "Flask", icon: "devicon-flask-original" },
      { name: "Streamlit", icon: "devicon-streamlit-plain colored" },
    ],
  },

  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "fa-solid fa-screwdriver-wrench",
    description: "Development, version control and collaboration tools I use.",
    skills: [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "Jupyter Notebook", icon: "devicon-jupyter-plain colored" },
      { name: "VS Code", icon: "devicon-vscode-plain colored" },
    ],
  },
];

/* =========================================
   RENDER SKILL CATEGORIES
========================================= */

const skillsContainer = document.getElementById("skillsContainer");

function renderSkillGroups() {
  if (!skillsContainer) return;

  skillsContainer.replaceChildren();

  skillGroups.forEach((group) => {
    const card = document.createElement("article");
    card.className = `skill-group-card skill-group-${group.id}`;

    // Category heading
    const heading = document.createElement("div");
    heading.className = "skill-group-heading";

    const categoryIcon = document.createElement("i");
    categoryIcon.className = group.icon;
    categoryIcon.setAttribute("aria-hidden", "true");

    const headingText = document.createElement("div");
    headingText.className = "skill-group-heading-text";

    const title = document.createElement("h3");
    title.textContent = group.title;

    const description = document.createElement("p");
    description.textContent = group.description;

    headingText.append(title, description);
    heading.append(categoryIcon, headingText);

    // Divider
    const divider = document.createElement("div");
    divider.className = "skill-group-divider";

    // Technology icons and labels
    const items = document.createElement("div");
    items.className = "skill-items";

    group.skills.forEach((skill) => {
      const item = document.createElement("div");
      item.className = "skill-item";
      item.title = skill.name;

      const icon = document.createElement("i");
      icon.className = skill.icon;
      icon.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.textContent = skill.name;

      item.append(icon, label);
      items.appendChild(item);
    });

    card.append(heading, divider, items);
    skillsContainer.appendChild(card);
  });
}

renderSkillGroups();

/* =========================================
   8. MY PROJECTS
========================================= */

const myProjects = [
  {
    title: "Car Price Predictor",
    image: "images/car-price-predictor.webp",
    // icon: "fa-solid fa-car",
    description:
      "Predicts used-car resale prices using machine learning based on vehicle features such as brand, age, mileage, fuel type, and ownership history.",

    details:
      "Performed exploratory data analysis, cleaned the dataset, extracted car brands, engineered car-age features, and applied preprocessing techniques including missing-value imputation, One-Hot Encoding, feature scaling, and target log transformation. Trained and compared multiple regression models, selecting CatBoost Regressor with an R² score of 0.8078. Integrated the trained model and preprocessing pipeline into a Flask web application for real-time price predictions.",
    
      
features: [
    "Used-car resale price prediction",
    "Vehicle brand and car-age feature engineering",
    "Missing-value imputation and One-Hot Encoding",
    "Multiple regression model comparison",
    "CatBoost Regressor with R² score of 0.8078",
    "Real-time predictions through Flask"
],

    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Scikit-learn",
      "CatBoost",
      "Flask",
    ],

    github: "https://github.com/DivyeshChavda77/Car_Price_Predictor",

    demo: "https://car-price-predictor-u6r8.onrender.com/",
  },

  {
    title: "Student Performance Indicator",
    image: "images/student-performance.webp",
    // icon: "fa-solid fa-graduation-cap",
    description:
      "A machine learning web application that predicts students' Mathematics scores using demographic and academic performance data.",

    details:
      "Developed an end-to-end regression pipeline to predict Mathematics scores using features such as reading and writing scores, gender, parental education, lunch type, and test preparation status. Implemented data preprocessing and feature engineering, then compared multiple regression algorithms to evaluate predictive performance. Integrated the trained model and preprocessing pipeline into a Flask web application that generates predictions from user inputs.",

      
features: [
    "Mathematics score prediction",
    "Reading and writing score inputs",
    "Student demographic and academic features",
    "Data preprocessing and feature engineering",
    "Regression model evaluation",
    "Flask-based prediction interface"
],

    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Scikit-learn",
      "Regression",
      "Flask",
    ],

    github: "https://github.com/DivyeshChavda77/Student_Performance_Indicator",

    demo: "https://student-performance-indicator-kdtq.onrender.com/",
  },

  {
    title: "Factory-to-Customer Shipping Route Efficiency Analysis",
    image: "images/shipping-route-analysis.webp",
    // icon: "fa-solid fa-route",
    description:
      "A business analytics project that evaluates shipping performance, route efficiency, sales, and profitability using an interactive dashboard.",

    details:
      "Analyzed 10,194 records from the Nassau Candy Distributor dataset. Performed data ingestion, data transformation, exploratory data analysis, and feature engineering to calculate shipping duration and profit margin. Compared shipping modes, regions, cities, and products to identify performance patterns and potential logistics bottlenecks. Built an interactive Streamlit dashboard featuring business KPIs, filters, route comparisons, charts, summary tables, and filtered CSV downloads.",

      
features: [
    "Analysis of 10,194 shipping records",
    "Shipping duration and profit margin analysis",
    "Shipping mode and regional comparisons",
    "Logistics performance KPIs",
    "Interactive Streamlit dashboard",
    "Dynamic filters and Plotly visualizations",
    "Filtered CSV data export"
],

    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Streamlit",
    ],

    github:
      "https://github.com/DivyeshChavda77/Factory-to-Customer-Shipping-Route-Efficiency-Analysis",
    demo: "https://factory-to-customer-shipping-route-efficiency-analysis-baczndh.streamlit.app/",
  },

  {
    title: "Customer Retention Analysis",
    image: "images/customer-retention.webp",
    // icon: "fa-solid fa-user-check",
    description:
      "A customer analytics project that examines historical churn, customer engagement, product utilization, and retention opportunities.",

    details:
      "Analyzed 10,000 banking customer records to understand historical churn patterns across customer demographics, engagement levels, product usage, and financial attributes. Developed retention KPIs, including an engagement retention ratio, product depth index, high-balance disengagement rate, credit-card stickiness score, and relationship strength index. Created a rule-based retention risk scoring framework to categorize customers by risk and prioritize high-value disengaged customers. Built an interactive Streamlit dashboard with filters, visualizations, customer-level insights, and CSV export functionality.",

      
features: [
    "Analysis of 10,000 banking customer records",
    "Historical churn pattern analysis",
    "Customer engagement and product usage analysis",
    "Custom retention KPI calculations",
    "Rule-based retention risk scoring",
    "High-value disengaged customer identification",
    "Interactive Streamlit dashboard",
    "Customer filters and CSV export"
],

    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Plotly",
      "Streamlit",
      "Data Analysis",
      "Business Analytics",
    ],

    github: "https://github.com/DivyeshChavda77/customer-retention-analysis",
    demo: "https://customer-retention-analysis-rv35pimwywteugvvlje9yg.streamlit.app/",
  },
];

/* =========================================
   RENDER PROJECT CARDS
========================================= */

const projectsGrid = document.getElementById("projectsGrid");

function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.replaceChildren();

  myProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const thumbnail = document.createElement("img");
    thumbnail.className = "project-thumbnail";
    thumbnail.src = project.image;
    thumbnail.alt = `${project.title} project preview`;
    thumbnail.loading = "lazy";
    thumbnail.decoding = "async";

    thumbnail.onerror = () => {
      thumbnail.style.display = "none";
    };

    card.appendChild(thumbnail);

    const iconBox = document.createElement("div");
    iconBox.className = "project-icon";

    const icon = document.createElement("i");
    icon.className = project.icon;
    icon.setAttribute("aria-hidden", "true");
    iconBox.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "project-tags";

    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      tags.appendChild(tag);
    });

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "View Details";
    detailsButton.addEventListener("click", () => {
      openProjectModal(index);
    });

    actions.appendChild(detailsButton);

    // Only show GitHub when a real URL is provided.
    if (isValidExternalUrl(project.github)) {
      const githubLink = document.createElement("a");
      githubLink.href = project.github;
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";
      githubLink.innerHTML = '<i class="fa-brands fa-github"></i> GitHub';

      actions.appendChild(githubLink);
    }

    // Only show Live Demo when a real URL is provided.
    if (isValidExternalUrl(project.demo)) {
      const demoLink = document.createElement("a");
      demoLink.href = project.demo;
      demoLink.target = "_blank";
      demoLink.rel = "noopener noreferrer";
      demoLink.textContent = "Live Demo";

      actions.appendChild(demoLink);
    }

    card.append(iconBox, title, description, tags, actions);
    projectsGrid.appendChild(card);
  });
}

/* =========================================
   PROJECT DETAILS POPUP
========================================= */

function isValidExternalUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      (url.hostname === "github.com" ||
        url.hostname === "www.github.com" ||
        url.hostname.includes("."))
    );
  } catch {
    return false;
  }
}

function openProjectModal(index) {
  const project = myProjects[index];

  if (!project) return;

  let modal = document.getElementById("projectModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "projectModal";
    modal.className = "project-modal";
    modal.hidden = true;

    modal.innerHTML = `
    <div class="modal-content"
         role="dialog"
         aria-modal="true"
         aria-labelledby="modalTitle">

        <button class="modal-close"
                type="button"
                aria-label="Close project details">
            &times;
        </button>

        <h2 id="modalTitle"></h2>

        <div id="modalTechnologies"
             class="project-tags"></div>

        <div class="case-study-content">
            <h3>Project Overview</h3>
            <p id="modalDescription"></p>

            <h3>Technical Implementation</h3>
            <p id="modalImplementation"></p>

            <h3>Key Features</h3>
            <ul id="modalFeatures"></ul>
        </div>

        <div id="modalActions"
             class="project-actions"></div>
    </div>
`;

    document.body.appendChild(modal);

    modal
      .querySelector(".modal-close")
      .addEventListener("click", closeProjectModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeProjectModal();
      }
    });
  }


modal.querySelector("#modalTitle").textContent = project.title;

modal.querySelector("#modalDescription").textContent =
  project.description;

modal.querySelector("#modalImplementation").textContent =
  project.details;

const featureList = modal.querySelector("#modalFeatures");
featureList.replaceChildren();

(project.features || []).forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featureList.appendChild(li);
});

  const technologyBox = modal.querySelector("#modalTechnologies");
  technologyBox.replaceChildren();

  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    technologyBox.appendChild(tag);
  });

  const actions = modal.querySelector("#modalActions");
  actions.replaceChildren();

  if (isValidExternalUrl(project.github)) {
    const link = document.createElement("a");
    link.href = project.github;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View on GitHub";
    actions.appendChild(link);
  }

  if (isValidExternalUrl(project.demo)) {
    const link = document.createElement("a");
    link.href = project.demo;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Live Demo";
    actions.appendChild(link);
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  modal.querySelector(".modal-close").focus();
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");

  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (event) => {
  const modal = document.getElementById("projectModal");

  if (event.key === "Escape" && modal && !modal.hidden) {
    closeProjectModal();
  }
});

/* Display all project cards */
renderProjects();

/* =========================================
   9. MY EDUCATION
========================================= */

const myEducation = [
  {
    qualification: "B.E. – Artificial Intelligence & Data Science",
    institution: "Government Engineering College, Rajkot · GTU",
    year: "2023–2027",
    description: "7.57 CGPA",
  },
  {
    qualification: "H.S.C.",
    institution: "V.C. Technical H.S., Morbi · GSHSEB",
    year: "2023",
    description: "64%",
  },
  {
    qualification: "S.S.C.",
    institution: "Nirmal Vidhyalaya, Morbi · GSEB",
    year: "2021",
    description: "75.83%",
  },
];

/* Render Education Cards */

const educationContainer = document.getElementById("educationContainer");

function renderEducation() {
  if (!educationContainer) return;

  educationContainer.replaceChildren();

  myEducation.forEach((education) => {
    const card = document.createElement("article");
    card.className = "education-card";

    const heading = document.createElement("h3");
    heading.textContent = education.qualification;

    const institution = document.createElement("p");
    institution.textContent = education.institution;

    const description = document.createElement("p");
    description.textContent = education.description;

    const year = document.createElement("span");
    year.className = "education-date";
    year.textContent = education.year;

    card.append(heading, institution, description, year);
    educationContainer.appendChild(card);
  });
}

renderEducation();

/* =========================================
   10. LIGHTWEIGHT DEVELOPER / DATA CANVAS
   Pauses when hidden and respects reduced motion.
========================================= */
(() => {
  const canvas = document.getElementById("techCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const symbols = [
    "Python",
    "SQL",
    "NumPy",
    "Pandas",
    "ML",
    "{ }",
    "</>",
    "01",
    "AI",
  ];
  let width = 0,
    height = 0,
    rafId = 0;
  let particles = [];
  const isLight = () => document.body.classList.contains("light-theme");

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(42, Math.max(16, Math.floor(width / 30)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 1.7 + 0.6,
      label:
        index % 4 === 0
          ? symbols[Math.floor(Math.random() * symbols.length)]
          : "",
    }));
  }

  function draw() {
    if (document.hidden || reducedMotion.matches) {
      rafId = 0;
      return;
    }
    context.clearRect(0, 0, width, height);
    const light = isLight();
    const particleColor = light ? "8, 145, 178" : "103, 232, 249";
    const lineColor = light ? "79, 70, 229" : "34, 211, 238";
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particleColor}, ${light ? 0.24 : 0.48})`;
      context.fill();
      if (p.label) {
        context.font = "11px monospace";
        context.fillStyle = `rgba(${particleColor}, ${light ? 0.2 : 0.3})`;
        context.fillText(p.label, p.x + 8, p.y - 7);
      }
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i],
          b = particles[j];
        const dx = a.x - b.x,
          dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 135) {
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(${lineColor}, ${(1 - distance / 135) * (light ? 0.09 : 0.14)})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    }
    rafId = window.requestAnimationFrame(draw);
  }

  function start() {
    if (rafId || document.hidden || reducedMotion.matches) return;
    rafId = window.requestAnimationFrame(draw);
  }
  function stop() {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = 0;
  }

  resize();
  start();
  window.addEventListener("resize", () => {
    resize();
  });
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start(),
  );
  reducedMotion.addEventListener?.("change", () =>
    reducedMotion.matches ? stop() : start(),
  );
})();

/* =========================================
   11. STAGGER INDEX + ACTIVE NAV ARIA
========================================= */
document
  .querySelectorAll(
    ".about-content, .skills-container, .projects-grid, .contact-content, .education-container",
  )
  .forEach((group) => {
    Array.from(group.children).forEach((child, i) =>
      child.style.setProperty("--i", i),
    );
  });

if ("IntersectionObserver" in window) {
  const ariaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => {
          if (link.classList.contains("active"))
            link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-25% 0px -60% 0px" },
  );
  sections.forEach((section) => ariaObserver.observe(section));
}


/* =========================================
   LOADING SCREEN
========================================= */
(function initPreloader() {
  const pre = document.getElementById("preloader");
  if (!pre) return;

  const fill = document.getElementById("plFill");
  const pct = document.getElementById("plPct");
  const status = document.getElementById("plStatus");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const steps = [
    "import pandas as pd",
    "df.describe()",
    "model.fit(X, y)",
    "building dashboards...",
    "ready.",
  ];
  const MIN_TIME = reduce ? 300 : 1800; // always show a smooth intro
  const MAX_TIME = 6000;                // never block the site
  const start = performance.now();
  let loaded = document.readyState === "complete";
  let shown = 0;
  let finished = false;

  window.addEventListener("load", () => (loaded = true), { once: true });

  function render(p) {
    const v = Math.max(0, Math.min(100, Math.round(p)));
    fill.style.width = v + "%";
    pct.textContent = v + "%";
    status.textContent = steps[Math.min(steps.length - 1, Math.floor((v / 100) * steps.length))];
  }

  function finish() {
    if (finished) return;
    finished = true;
    render(100);
    setTimeout(() => {
      pre.classList.add("is-done");
      document.body.classList.remove("is-loading");
      setTimeout(() => pre.remove(), 900);
    }, 250);
  }

  function tick(now) {
    const t = Math.max(0, now - start);
    // ease toward 90% while assets load, then complete
    const target = loaded && t >= MIN_TIME ? 100 : Math.min(90, (t / MIN_TIME) * 90);
    shown += (target - shown) * 0.12 + 0.15;
    if (shown > target) shown = target;
    render(shown);

    if ((loaded && t >= MIN_TIME && shown >= 99) || t >= MAX_TIME) return finish();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
