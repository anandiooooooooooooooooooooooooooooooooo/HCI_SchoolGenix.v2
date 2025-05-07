document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Dropdown Menu Toggle
    const dropdownToggle = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdown = document.querySelector(".dropdown");

    if (dropdownToggle && dropdown && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent closing dropdown when clicking button
            dropdown.classList.toggle("active");

            // Ensure dropdown appears on top
            dropdown.style.zIndex = "9999";
        });

        // Close dropdown if clicking outside
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
        // Hide all pages initially
        pages.forEach(page => page.classList.remove("active"));

        // Get last active tab from localStorage or default to first tab
        let activeTab = localStorage.getItem("activeTab");

        // Ensure the stored tab exists, otherwise fallback to the first tab
        if (!activeTab || !document.getElementById(activeTab)) {
            activeTab = pages[0].id; // Set to first page if invalid
            localStorage.setItem("activeTab", activeTab);
        }

        function activateTab(tabId) {
            if (!tabId) return;

            // 🔥 Hide all pages
            pages.forEach(page => {
                page.classList.remove("active");
                page.style.display = "none"; // Hide non-active pages
            });

            // 🔥 Remove active class from all tabs
            tabs.forEach(tab => tab.classList.remove("active"));

            // ✅ Show the selected page
            const selectedPage = document.getElementById(tabId);
            if (selectedPage) {
                selectedPage.classList.add("active");
                selectedPage.style.display = "flex"; // Make active page visible
            } else {
                console.error("❌ Page not found:", tabId);
                return;
            }

            // ✅ Highlight the active tab
            const selectedTab = document.querySelector(`[data-page="${tabId}"]`);
            if (selectedTab) {
                selectedTab.classList.add("active");
            } else {
                console.error("❌ Tab not found:", tabId);
            }

            // ✅ Save the selected tab in localStorage
            localStorage.setItem("activeTab", tabId);
        }

        // Apply the last active tab on page load
        activateTab(activeTab);

        // Add event listener to all tabs
        tabs.forEach(tab => {
            tab.addEventListener("click", function () {
                const targetId = this.getAttribute("data-page");
                activateTab(targetId);
            });
        });
    } else {
        console.warn("⚠ Tabs or pages not found. Skipping tab setup.");
    }
});
