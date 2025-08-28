// Carrega fragmentos HTML (header/footer) com várias tentativas de caminho relativo
async function loadFragment(id, candidates) {
  const hostEl = document.getElementById(id);
  if (!hostEl) return;
  for (const file of candidates) {
    try {
      const res = await fetch(file, { cache: "no-cache" });
      if (res.ok) {
        hostEl.innerHTML = await res.text();
        return;
      }
    } catch (e) {
      // tenta próximo caminho
    }
  }
  console.warn("Não foi possível carregar", id, "a partir de", candidates);
}

document.addEventListener("DOMContentLoaded", () => {
  const headerCandidates = [
    "includes/header.html",
    "../includes/header.html",
    "../../includes/header.html",
    "../../../includes/header.html"
  ];
  const footerCandidates = [
    "includes/footer.html",
    "../includes/footer.html",
    "../../includes/footer.html",
    "../../../includes/footer.html"
  ];
  loadFragment("header", headerCandidates);
  loadFragment("footer", footerCandidates);
});
