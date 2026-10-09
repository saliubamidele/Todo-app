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

// Notifications

const notificationToggle = document.querySelector(".notification-toggle");

const savedNotifications = localStorage.getItem("notifications");

if (savedNotifications === "enabled") {
    notificationToggle.checked = true;
}

notificationToggle.addEventListener("change", function () {

    if (notificationToggle.checked) {

        localStorage.setItem("notifications", "enabled");

    } else {

        localStorage.setItem("notifications", "disabled");

    }

});

// Edit Email

const editEmailButton = document.querySelector(".edit-email-btn");

editEmailButton.addEventListener("click", function () {

    let activeUser = JSON.parse(localStorage.getItem("Active_user"));
    let users = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (!activeUser) {
        alert("No active user found.");
        return;
    }

    const newEmail = prompt(
        "Enter your new email address:",
        activeUser.email
    );

    if (!newEmail || newEmail === activeUser.email) {
        return;
    }

    // Check if another account already uses the email
    const emailAlreadyExists = users.some(function (user) {
        return user.email === newEmail;
    });

    if (emailAlreadyExists) {
        alert("This email is already in use.");
        return;
    }

    // Find the logged-in user
    const userIndex = users.findIndex(function (user) {
        return user.email === activeUser.email;
    });

    if (userIndex === -1) {
        alert("User account not found.");
        return;
    }

    // Update email in users array
    users[userIndex].email = newEmail;

    // Update active user
    activeUser.email = newEmail;

    // Save both
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("Active_user", JSON.stringify(activeUser));

    alert("Email updated successfully!");
});