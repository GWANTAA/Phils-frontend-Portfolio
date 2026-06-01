const DEFAULT_API_BASE_URL = "https://philemon-portfolio-backend.onrender.com";
const runtimeApiBaseUrl = new URLSearchParams(window.location.search).get("api");
const API_BASE_URL = (runtimeApiBaseUrl || window.PORTFOLIO_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");

const fallback = {
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Node.js",
    "Python",
    "SQL / MySQL",
    "Machine Learning",
    "Data Visualisation",
    "Statistical Analysis",
    "Research Methods",
    "Git / GitHub",
    "Cloud Hosting",
  ],
  qualifications: [
    {
      year: "2022 - Present",
      title: "Bachelor of Science in Data Science",
      institution: "EASTC, Arusha, Tanzania",
      status: "Ongoing",
    },
    {
      year: "2025",
      title: "Web and Cloud Computing",
      institution: "Self-directed learning and online platforms",
      status: "Completed",
    },
  ],
  projects: [
    {
      title: "Cloud Portfolio",
      description: "A responsive personal portfolio deployed with a Vercel frontend and Render API backend.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js", "Cloud"],
    },
    {
      title: "REST Portfolio API",
      description: "A simple Express API that provides portfolio data to the frontend.",
      tags: ["Express", "API", "Render"],
    },
  ],
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fetchFromApi(path, fallbackValue) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return {
      data: await response.json(),
      source: "api",
    };
  } catch (error) {
    return {
      data: fallbackValue,
      source: "fallback",
      error,
    };
  }
}

function renderSkills(skills) {
  const list = document.getElementById("skills-list");
  list.innerHTML = skills.map((skill) => `<div class="skill-pill">${escapeHtml(skill)}</div>`).join("");
}

function renderQualifications(qualifications) {
  const list = document.getElementById("qualification-list");

  list.innerHTML = qualifications.map((item) => `
    <article class="timeline-item">
      <time>${escapeHtml(item.year)}</time>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.institution)}</p>
      </div>
      <span class="status">${escapeHtml(item.status)}</span>
    </article>
  `).join("");
}

function renderProjects(projects) {
  const list = document.getElementById("project-list");

  list.innerHTML = projects.map((project) => {
    const tags = (project.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const link = project.liveUrl
      ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer">Open project</a>`
      : "";

    return `
      <article class="project-card">
        <div>
          <p class="card-kicker">Project</p>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
        </div>
        <div class="tag-row">${tags}</div>
        ${link}
      </article>
    `;
  }).join("");
}

async function loadPortfolioData() {
  const [skills, qualifications, projects] = await Promise.all([
    fetchFromApi("/api/skills", fallback.skills),
    fetchFromApi("/api/qualifications", fallback.qualifications),
    fetchFromApi("/api/projects", fallback.projects),
  ]);

  renderSkills(skills.data);
  renderQualifications(qualifications.data);
  renderProjects(projects.data);

  const apiStatus = document.getElementById("api-status");
  const usingApi = [skills, qualifications, projects].every((result) => result.source === "api");
  apiStatus.textContent = usingApi
    ? `Portfolio data loaded from Render API: ${API_BASE_URL}`
    : `Using local fallback data until the Render API is deployed at ${API_BASE_URL}.`;
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:philandrewjackson618@gmail.com?subject=${subject}&body=${body}`;
    feedback.textContent = "Your email client has been opened.";
    form.reset();
  });
}

loadPortfolioData();
setupContactForm();
