/* =========================================================
   HUMOR911 — Vanilla JS interactions
   ========================================================= */

/* ---------- Mobile navigation toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  links.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // --- Fixing the Glitch Happens when screen width is at 768px
  const mq = window.matchMedia("(min-width: 769px)");
  
  function handleBreakpoint(e) {
    if (e.matches) {
      // We just switched to DESKTOP (769px or wider)
      // Clean up the mobile classes silently
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  // Listen for the change
  mq.addEventListener("change", handleBreakpoint);
}

/* ---------- Active navigation state on scroll ---------- */
function initActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Scroll reveal animations ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Contact form validation (frontend only) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };
  const success = document.getElementById("form-success");

  const setError = (key, message) => {
    const errorEl = document.getElementById("error-" + key);
    const field = fields[key].closest(".field");
    errorEl.textContent = message;
    field.classList.toggle("has-error", Boolean(message));
  };

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? ""
        : "Please enter a valid email address.",
    message: (v) =>
      v.trim().length >= 10 ? "" : "Give us a little more — at least 10 characters.",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prototype: never actually submits
    success.textContent = "";

    let isValid = true;
    Object.keys(fields).forEach((key) => {
      const message = validators[key](fields[key].value);
      setError(key, message);
      if (message) isValid = false;
    });

    if (isValid) {
      success.textContent =
        "Thanks! Your message looks great. (Prototype demo — nothing was actually sent.)";
      form.reset();
    }
  });

  // Clear error as the user fixes the field
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNav();
  initScrollReveal();
  initContactForm();
});