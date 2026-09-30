document.addEventListener("DOMContentLoaded", () => {
  const navPanel = document.getElementById("navigation-panel");

  if (!navPanel) return;

  // Gestione del menu Popover responsive
  const mediaQuery = window.matchMedia("(min-width: 63.25rem)");

  function handleBreakpointChange(e) {
    if (e.matches) {
      if (navPanel.hasAttribute("popover")) {
        navPanel.removeAttribute("popover");
      }
    } else {
      if (!navPanel.hasAttribute("popover")) {
        navPanel.setAttribute("popover", "auto");
      }
    }
  }

  handleBreakpointChange(mediaQuery);
  mediaQuery.addEventListener("change", handleBreakpointChange);

  // Chiusura del menu al click sui link
  const navLinks = navPanel.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navPanel.hasAttribute("popover") && navPanel.hidePopover) {
        try {
          navPanel.hidePopover();
        } catch (err) {
          // Gestione fallback per browser datati
        }
      }
    });
  });

  // Smooth scroll per tutti i link interni (compresi #concept e Torna all'inizio)
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

        // Gestione del focus per l'accessibilità
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus({ preventScroll: true });
      }
    });
  });
});