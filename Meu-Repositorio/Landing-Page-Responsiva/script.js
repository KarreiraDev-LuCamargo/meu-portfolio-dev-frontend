// ===== DARK/LIGHT MODE (robusto) =====
(function () {
  let themeToggleBtn =
    document.getElementById("theme-toggle") ||
    document.getElementById("darkToggle") ||
    document.querySelector("[data-theme-toggle]");

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    try { localStorage.setItem("theme", theme); } catch (_) {}
    updateIcons(isDark);
  }

  function updateIcons(isDark) {
    const darkIcon = document.getElementById("icon-dark") ||
      (themeToggleBtn && themeToggleBtn.querySelector('[data-icon="dark"]'));
    const lightIcon = document.getElementById("icon-light") ||
      (themeToggleBtn && themeToggleBtn.querySelector('[data-icon="light"]'));
    if (darkIcon && lightIcon) {
      if (isDark) { darkIcon.classList.add("hidden"); lightIcon.classList.remove("hidden"); }
      else { lightIcon.classList.add("hidden"); darkIcon.classList.remove("hidden"); }
    } else if (themeToggleBtn) {
      themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    }
  }

  function getInitialTheme() {
    try { const saved = localStorage.getItem("theme"); if (saved) return saved; } catch (_) {}
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  const initialTheme = getInitialTheme();
  setTheme(initialTheme);

  function bindToggle() {
    if (!themeToggleBtn) {
      themeToggleBtn =
        document.getElementById("theme-toggle") ||
        document.getElementById("darkToggle") ||
        document.querySelector("[data-theme-toggle]");
    }
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      });
      updateIcons(initialTheme === "dark");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindToggle);
  else bindToggle();
})();

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== VALIDAÇÃO DE EMAIL =====
function validarFormulario(formSelector, inputSelector) {
  const form = document.querySelector(formSelector);
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(inputSelector);
      const email = input ? input.value.trim() : "";
      if (!email || !email.includes("@")) alert("Por favor, insira um email válido.");
      else { alert("Obrigado por se inscrever!"); form.reset(); }
    });
  }
}
validarFormulario("form", "#email");
validarFormulario("#mobileMenu form", "#email-mobile");

// ===== MENU MOBILE =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("show"));
}