/**
 * ===================================================================
 * Main Page Object for Siswa Pages
 * ===================================================================
 */
const SiswaPage = {
    /**
     * The main entry point, called when the page is loaded.
     */
    init: function() {
        this.initDropdown();
        this.initTabs(); // This will use the corrected function below
        this.setClassName();
    },

    /**
     * Handles all logic for the user dropdown menu.
     */
    initDropdown: function() {
        const dropdown = document.querySelector(".dropdown");
        if (!dropdown) return;

        const dropdownToggle = dropdown.querySelector(".dropdown-btn");
        dropdownToggle.addEventListener("click", function(event) {
            event.stopPropagation();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", function(event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    },

    /**
     * Handles all logic for the tabbed interface. (Corrected and Final Version)
     */
    initTabs: function() {
        const tabs = document.querySelectorAll(".tab");
        const pages = document.querySelectorAll(".page");

        if (tabs.length === 0 || pages.length === 0) return;

        const activateTab = (tabId) => {
            if (!tabId || !document.getElementById(tabId)) {
                console.error(`Tab content with id "${tabId}" not found.`);
                return;
            }

            // --- THIS IS THE FIX ---
            // This loop removes the .active class from ALL pages, hiding them.
            pages.forEach(page => page.classList.remove("active"));
            
            // This loop removes the .active class from ALL tab buttons.
            tabs.forEach(tab => tab.classList.remove("active"));
            // --- END OF FIX ---

            // Now, we activate the new one.
            document.getElementById(tabId).classList.add("active");
            const selectedTab = document.querySelector(`[data-page="${tabId}"]`);
            if (selectedTab) {
                selectedTab.classList.add("active");
            }
            
            localStorage.setItem("activeTab", tabId);
        };

        tabs.forEach(tab => {
            tab.addEventListener("click", function() {
                const targetId = this.getAttribute("data-page");
                activateTab(targetId);
            });
        });

        let activeTabId = localStorage.getItem("activeTab");
        if (!activeTabId || !document.getElementById(activeTabId)) {
            activeTabId = tabs[0].getAttribute("data-page");
        }
        
        activateTab(activeTabId);
    },

    /**
     * Finds an element with the id "class-name" and sets its text.
     */
    setClassName: function() {
        const className = localStorage.getItem("selectedClass");
        if (className) {
            const classNameEl = document.getElementById("class-name");
            if (classNameEl) {
                classNameEl.textContent = className;
            }
        }
    },

    /**
     * This function should be called from an HTML onclick attribute to select a class.
     * Example: <div onclick="SiswaPage.selectClass('Matematika')">...</div>
     */
    selectClass: function(subjectName) {
        localStorage.setItem("selectedClass", subjectName);
        window.location.href = "./siswa-classes-2.html";
    }
};

/**
 * ===================================================================
 * SCRIPT INITIALIZATION
 * ===================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    SiswaPage.init();
});