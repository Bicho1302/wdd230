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
