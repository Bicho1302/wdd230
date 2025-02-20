// getDates.js

// Dynamically populate the current year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// Dynamically populate the last modified date
const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last Updated: ${document.lastModified}`;
}
const toggleButton = document.getElementById("dark-mode-toggle");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
