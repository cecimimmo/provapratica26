document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navigation-panel");
  const navToggle = document.querySelector(".navigation-toggle");

  if (!navPanel) return;

  // 1. Gestione responsive del Popover (Menu dei Capitoli)
  // Utilizza MatchMedia per applicare o rimuovere l'attributo `popover` in base alla larghezza dello schermo
  const mediaQuery = window.matchMedia("(min-width: 63.25rem)");

  function handleBreakpointChange(e) {
    if (e.matches) {
      // Schermi grandi: Rimuove l'attributo popover per mostrare la nav inline
      if (navPanel.hasAttribute("popover")) {
        navPanel.removeAttribute("popover");
      }
    } else {
      // Schermi piccoli/medio-piccoli: Attiva la modalità popover
      if (!navPanel.hasAttribute("popover")) {
        navPanel.setAttribute("popover", "auto");
      }
    }
  }

  // Inizializzazione al caricamento
  handleBreakpointChange(mediaQuery);
  mediaQuery.addEventListener("change", handleBreakpointChange);

  // 2. Chiusura automatica del menu al click su un link (su dispositivi mobili)
  const navLinks = navPanel.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navPanel.hasAttribute("popover") && navPanel.hidePopover) {
        try {
          navPanel.hidePopover();
        } catch (err) {
          // Ignora se il popover era già chiuso
        }
      }
    });
  });

  // 3. Smooth Scrolling per i link di ancoraggio
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Imposta il focus per l'accessibilità (A11y)
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus({ preventScroll: true });
      }
    });
  });
});