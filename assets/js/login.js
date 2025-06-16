// assets/js/login.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Referensi Elemen DOM ---
    const mainElement = document.querySelector('.main');
    const loginButton = document.querySelector('.login'); // BARU: Dapatkan referensi tombol Login
    const alertElement = document.getElementById('custom-alert');

    // --- Peta Tema (Termasuk Kelas Tombol) ---
    // UPDATED: Menambahkan 'buttonClass' untuk setiap role
    const roleThemes = {
        admin: {
            background: 'linear-gradient(135deg, #34495E, #2C3E50)',
            buttonClass: 'login-btn-admin'
        },
        kepsek: {
            background: 'linear-gradient(135deg, #6E45E2, #5D3EBF)',
            buttonClass: 'login-btn-kepsek'
        },
        teacher: {
            background: 'linear-gradient(135deg, #1DCDAF, #1ABC9C)',
            buttonClass: 'login-btn-teacher'
        },
        student: {
            background: 'linear-gradient(145deg, #F3D054, #F1C40F)',
            buttonClass: 'login-btn-student'
        },
        wali: {
            background: 'linear-gradient(145deg, #F16B5C, #E74C3C)',
            buttonClass: 'login-btn-wali'
        }
    };
    const defaultLoginBackground = 'linear-gradient(135deg, #e9c0e9, #502274)';

    // --- Logika Latar Belakang & Tombol Dinamis ---
    const role = localStorage.getItem("selectedRole");

    if (role && roleThemes[role]) {
        // Jika role valid ditemukan:
        // 1. Ubah latar belakang halaman.
        mainElement.style.backgroundImage = roleThemes[role].background;

        // 2. BARU: Tambahkan kelas tema yang sesuai ke tombol Login.
        loginButton.classList.add(roleThemes[role].buttonClass);

    } else {
        // Jika tidak ada role, gunakan latar belakang default.
        mainElement.style.backgroundImage = defaultLoginBackground;
    }

    // --- Fungsi Halaman yang Ada ---

    window.goToBack = () => {
        window.location.href = "select.html";
    };

    window.redirectToRolePage = () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const currentRole = localStorage.getItem("selectedRole");

        if(!username && !password) {
            showAlert("Please enter both username and password.");
            return false;
        }

        if (!username) {
            showAlert("Please enter a username.");
            return false;
        }
        if (!password) {
            showAlert("Please enter a password.");
            return false;
        }
        if (!currentRole) {
            showAlert("No role selected. Please go back and choose a role.");
            return false;
        }

        // Logika redirect Anda sudah benar
        const dashboardPaths = {
            student: "pages/siswa/siswa-dashboard.html",
            teacher: "pages/guru/guru-dashboard.html",
            kepsek: "pages/kepalasekolah/kepalasekolah-dashboard.html",
            wali: "pages/wali/wali-dashboard.html",
            admin: "pages/admin/admin-dashboard.html",
        };

        if (dashboardPaths[currentRole]) {
            window.location.href = dashboardPaths[currentRole];
        } else {
            showAlert("Invalid role detected.");
        }
        return false;
    };

    function showAlert(message) {
        alertElement.textContent = message;
        alertElement.classList.add("show");
        setTimeout(() => {
            alertElement.classList.remove("show");
        }, 3000);
    }
});