'use strict';


const themeSelect = document.querySelector(".theme-select");

// Check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeSelect.value = "dark";
}

// Change theme
themeSelect.addEventListener("change", function () {

    if (themeSelect.value === "dark") {

        document.body.classList.add("dark-mode");

        localStorage.setItem("theme", "dark");

    } else {

        document.body.classList.remove("dark-mode");

        localStorage.setItem("theme", "light");

    }

});