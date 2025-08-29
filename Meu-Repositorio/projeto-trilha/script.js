const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const themeToggle = document.getElementById("theme-toggle");

// Atualizar progresso
function updateProgress() {
  const total = checkboxes.length;
  const checked = [...checkboxes].filter((cb) => cb.checked).length;
  const percent = (checked / total) * 100;

  progressText.textContent = `${checked} de ${total} concluídos`;
  progressFill.style.width = `${percent}%`;
}

// Carregar estado salvo
checkboxes.forEach((checkbox, index) => {
  const saved = localStorage.getItem(`frontendTrail-project-${index}`);
  if (saved === "true") checkbox.checked = true;

  checkbox.addEventListener("change", () => {
    localStorage.setItem(`frontendTrail-project-${index}`, checkbox.checked);
    updateProgress();
  });
});

// Dark mode
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
  }
  localStorage.setItem("frontendTrail-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

// Carregar tema salvo
const savedTheme = localStorage.getItem("frontendTrail-theme") || "light";
applyTheme(savedTheme);

// Inicializar progresso
updateProgress();
