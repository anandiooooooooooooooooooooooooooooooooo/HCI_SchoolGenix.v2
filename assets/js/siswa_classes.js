document.addEventListener("DOMContentLoaded", function () {
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
    }

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
                return;
            }

            const selectedTab = document.querySelector(`[data-page="${tabId}"]`);
            if (selectedTab) {
                selectedTab.classList.add("active");
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
    }
});
