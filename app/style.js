mode.addEventListener("click", () => {
    const root = document.documentElement;  // this document.documentElement is the :root (the <html> element).
    if(root.dataset.theme === "light") {
        // Currently light -> switch to dark
        root.dataset.theme = "dark";
        mode.textContent = "🌛";
    } else {
        // Currently dark => switch to light
        root.dataset.theme = "light";
        mode.textContent = "🌞";
        // ...do Light-mode side effects here
    }
    root.dataset.theme = isLight ? "dark" : "light";
});