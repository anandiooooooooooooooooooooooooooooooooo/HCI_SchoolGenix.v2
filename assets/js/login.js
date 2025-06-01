function goToBack() {
    window.location.href = "select.html";
}

function redirectToRolePage() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = localStorage.getItem("selectedRole");

    if (!username && !password) {
        showAlert("Please enter both username and password.");
        return false;
    }

    if (!username) {
        showAlert("Please enter username.");
        return false;
    }

    if (!password) {
        showAlert("Please enter password.");
        return false;
    }

    if (!role) {
        showAlert("Please select a role first.");
        return false;
    }

    // Redirect based on role
    switch (role) {
        case "student":
            window.location.href = "pages/siswa/siswa-dashboard.html";
            break;
        case "teacher":
            window.location.href = "pages/guru/guru-dashboard.html";
            break;
        case "kepsek":
            window.location.href = "pages/kepalasekolah/kepalasekolah-dashboard.html";
            break;
        case "wali":
            window.location.href = "pages/wali/wali-dashboard.html";
            break;
        case "admin":
            window.location.href = "pages/admin/admin-dashboard.html";
            break;
        default:
            alert("Invalid role.");
    }

    return false;
}

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}