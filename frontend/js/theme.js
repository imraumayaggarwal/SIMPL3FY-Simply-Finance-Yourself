document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Apply the saved theme across the entire application
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "Light Mode";
    }

    // Toggle Dark Mode
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                themeToggleBtn.textContent = "Light Mode";
            } else {
                localStorage.setItem("darkMode", "disabled");
                themeToggleBtn.textContent = "Dark Mode";
            }
        });
    }
});
