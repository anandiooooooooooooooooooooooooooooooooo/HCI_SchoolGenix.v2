function redirectToRolePage() {
    const role = localStorage.getItem("selectedRole");

    if (role === "student") {
    window.location.href = "pages/siswa/siswa_dashboard.html";
    } else if (role === "teacher") {
    window.location.href = "pages/guru/guru_dashboard.html";
    } else if (role === "kepsek") {
    window.location.href = "pages/kepalasekolah/kepalasekolah_dashboard.html";
    } else if (role === "wali") {
    window.location.href = "pages/wali/wali_dashboard.html";
    } else if (role === "admin") {
    window.location.href = "/pages/admin/admin_dashboard.html";
    } else {
    alert("No role selected.");
    }

    return false; // Prevent default form submission
}