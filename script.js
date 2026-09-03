const galleryImages = [
  { src: "assets/espaco-01.jpg", alt: "Interior do espaço terapêutico Bizitza" },
  { src: "assets/espaco-02.jpg", alt: "Zona de acolhimento Bizitza" },
  { src: "assets/espaco-03.jpg", alt: "Zona de trabalho Bizitza" },
  { src: "assets/espaco-04.jpg", alt: "Detalhe do espaço Bizitza" }
];

const galleryImage = document.getElementById("gallery-image");
const counter = document.getElementById("gallery-counter");
const thumbs = [...document.querySelectorAll(".thumb")];
let current = 0;
let galleryTimer;

function showSlide(index) {
  current = (index + galleryImages.length) % galleryImages.length;
  galleryImage.style.opacity = "0";
  setTimeout(() => {
    galleryImage.src = galleryImages[current].src;
    galleryImage.alt = galleryImages[current].alt;
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;
    thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === current));
    galleryImage.style.opacity = "1";
  }, 180);
}

function restartGallery() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => showSlide(current + 1), 5500);
}

document.querySelector(".gallery-arrow.prev").addEventListener("click", () => {
  showSlide(current - 1);
  restartGallery();
});
document.querySelector(".gallery-arrow.next").addEventListener("click", () => {
  showSlide(current + 1);
  restartGallery();
});
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    showSlide(Number(thumb.dataset.index));
    restartGallery();
  });
});
restartGallery();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ----------------------------------------------------------
   Reflexão do Bizitza — editor simples para site estático.
   Palavra-passe local: bizitza2026
   Para um site publicado online, recomenda-se substituir este
   mecanismo por um CMS/backend com autenticação real.
----------------------------------------------------------- */
const ORIGINAL_REFLECTION = "Respira. Observa. Permanece.\nNem tudo precisa de uma resposta imediata.";
const ADMIN_PASSWORD = "bizitza2026";
const REFLECTION_KEY = "bizitza-featured-reflection";

const publishedReflection = document.getElementById("published-reflection");
const openAdmin = document.getElementById("open-admin");
const closeAdmin = document.getElementById("close-admin");
const adminPanel = document.getElementById("admin-panel");
const adminLogin = document.getElementById("admin-login");
const adminEditor = document.getElementById("admin-editor");
const adminPassword = document.getElementById("admin-password");
const adminEnter = document.getElementById("admin-enter");
const adminError = document.getElementById("admin-error");
const adminReflection = document.getElementById("admin-reflection");
const adminCount = document.getElementById("admin-count");
const adminSave = document.getElementById("admin-save");
const adminReset = document.getElementById("admin-reset");
const adminSaved = document.getElementById("admin-saved");

function getReflection() {
  return localStorage.getItem(REFLECTION_KEY) || ORIGINAL_REFLECTION;
}

function renderReflection(text) {
  publishedReflection.innerHTML = text.replace(/\n/g, "<br>");
}

function updateAdminCount() {
  adminCount.textContent = `${adminReflection.value.length} / 1000`;
}

function openAdminPanel() {
  adminPanel.hidden = false;
  adminPassword.focus();
  adminPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeAdminPanel() {
  adminPanel.hidden = true;
  adminLogin.hidden = false;
  adminEditor.hidden = true;
  adminPassword.value = "";
  adminError.textContent = "";
  adminSaved.textContent = "";
}

renderReflection(getReflection());

openAdmin.addEventListener("click", openAdminPanel);
closeAdmin.addEventListener("click", closeAdminPanel);

adminEnter.addEventListener("click", () => {
  if (adminPassword.value === ADMIN_PASSWORD) {
    adminLogin.hidden = true;
    adminEditor.hidden = false;
    adminReflection.value = getReflection();
    updateAdminCount();
    adminReflection.focus();
    adminError.textContent = "";
  } else {
    adminError.textContent = "Palavra-passe incorreta.";
  }
});

adminPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") adminEnter.click();
});

adminReflection.addEventListener("input", updateAdminCount);

adminSave.addEventListener("click", () => {
  const value = adminReflection.value.trim();
  if (!value) {
    adminSaved.textContent = "Escreve uma reflexão antes de publicar.";
    return;
  }
  localStorage.setItem(REFLECTION_KEY, value);
  renderReflection(value);
  adminSaved.textContent = "Reflexão publicada neste navegador ✓";
});

adminReset.addEventListener("click", () => {
  adminReflection.value = ORIGINAL_REFLECTION;
  updateAdminCount();
  adminSaved.textContent = "Texto original carregado. Clica em “Publicar reflexão” para o guardar.";
});

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  formStatus.textContent = "Obrigado. A mensagem foi validada neste navegador. Para envio real, liga o formulário a um serviço de email/backend.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
