

document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Dropdown Menu Toggle
    const dropdownToggle = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdown = document.querySelector(".dropdown");

    if (dropdownToggle && dropdown && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdown.classList.toggle("active");
            dropdown.style.zIndex = "9999";
        });

        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    } else {
        console.warn("⚠ Dropdown elements not found. Skipping dropdown setup.");
    }

    // 🔹 Tabs and Pages Management
    const tabs = document.querySelectorAll(".tab");
    const pages = document.querySelectorAll(".page");

    if (tabs.length > 0 && pages.length > 0) {
        pages.forEach(page => page.classList.remove("active"));

        let activeTab = localStorage.getItem("activeTab");

        if (!activeTab || !document.getElementById(activeTab)) {
            activeTab = pages[0].id;
            localStorage.setItem("activeTab", activeTab);
        }

        function activateTab(tabId) {
            if (!tabId) return;

            pages.forEach(page => {
                page.classList.remove("active");
                page.style.display = "none";
            });

            tabs.forEach(tab => tab.classList.remove("active"));

            const selectedPage = document.getElementById(tabId);
            if (selectedPage) {
                selectedPage.classList.add("active");
                selectedPage.style.display = "flex";
            } else {
                console.error("❌ Page not found:", tabId);
                return;
            }

            const selectedTab = document.querySelector(`[data-page="${tabId}"]`);
            if (selectedTab) {
                selectedTab.classList.add("active");
            } else {
                console.error("❌ Tab not found:", tabId);
            }
            
            localStorage.setItem("activeTab", tabId);
        }

        activateTab(activeTab);

        tabs.forEach(tab => {
            tab.addEventListener("click", function () {
                const targetId = this.getAttribute("data-page");
                activateTab(targetId);
            });
        });
    } else {
        console.warn("⚠ Tabs or pages not found. Skipping tab setup.");
    }

    // 🔹 MODAL LOGOUT FUNCTIONALITY
    const modalLogout = document.getElementById('modalLogout');
    const tombolLogout = document.querySelector('.logout-btn');
    const tombolBatal = document.getElementById('tombolBatal');
    const tombolKonfirmasiLogout = document.getElementById('tombolKonfirmasiLogout');

    if (modalLogout && tombolLogout && tombolBatal && tombolKonfirmasiLogout) {
        
        tombolLogout.addEventListener('click', function (event) {
            event.preventDefault();
            modalLogout.style.display = 'block';
        });

        tombolBatal.addEventListener('click', function () {
            modalLogout.style.display = 'none';
        });

        tombolKonfirmasiLogout.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = tombolLogout.href;
        });

        window.addEventListener('click', function (event) {
            if (event.target == modalLogout) {
                modalLogout.style.display = 'none';
            }
        });
    } else {
        console.warn("⚠ Logout modal elements not found. Skipping logout modal setup.");
    }

});