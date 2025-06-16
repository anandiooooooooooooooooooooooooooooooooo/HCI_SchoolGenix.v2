let selectedRole = localStorage.getItem("selectedRole") || null;

function selectRole(role, button) {
  const buttons = document.querySelectorAll(".role-button");

  if (selectedRole === role) {
    selectedRole = null;
    localStorage.removeItem("selectedRole");

    buttons.forEach(btn => btn.classList.remove("selected"));
  } else {
    selectedRole = role;
    localStorage.setItem("selectedRole", role);

    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  }
}


function goToLogin() {
  if (!selectedRole) {
    showAlert("Please select a role first.");
    return;
  }
  window.location.href = "login.html";
}

function goToBack() {
  window.location.href = "index.html";
}

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}

// Wait for the document to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const mainElement = document.querySelector('.main');
    const allRoleButtons = document.querySelectorAll('.role-button');
    const alertElement = document.getElementById('custom-alert');

    // --- State Variable ---
    // This will keep track of which role is currently chosen.
    let selectedRole = null;

    // --- Color Mapping ---
    // A clean way to store the background gradient for each role.
    const roleBackgrounds = {
        admin: 'linear-gradient(145deg, #34495E, #2C3E50)',     // Dark Slate
        principal: 'linear-gradient(145deg, #6E45E2, #5D3EBF)', // Purple
        teacher: 'linear-gradient(145deg, #1DCDAF, #1ABC9C)',   // Teal
        student: 'linear-gradient(145deg, #F3D054, #F1C40F)',   // Yellow
        guardian: 'linear-gradient(145deg, #F16B5C, #E74C3C)',   // Red
    };
    const defaultBackground = 'linear-gradient(145deg, #2f5f2d, #254F1A)';

    /**
     * Shows a custom alert message.
     * @param {string} message The message to display.
     */
    function showAlert(message) {
        alertElement.textContent = message;
        alertElement.classList.add('show');
        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 3000); // Alert disappears after 3 seconds
    }

    /**
     * Main function to handle role selection.
     * @param {string} roleName - The name of the role ('admin', 'teacher', etc.).
     * @param {HTMLElement} clickedButton - The button element that was clicked.
     */
    window.selectRole = (roleName, clickedButton) => {
        // If the clicked button is already selected, deselect it.
        if (clickedButton.classList.contains('selected')) {
            clickedButton.className = 'role-button'; // Reset classes
            mainElement.style.backgroundImage = defaultBackground;
            selectedRole = null;
            return; // Stop the function here
        }

        // --- Selection Logic ---

        // 1. Deselect all other buttons first.
        allRoleButtons.forEach(button => {
            button.className = 'role-button'; // Reset classes on all buttons
        });

        // 2. Select the new button.
        clickedButton.classList.add('selected', roleName);
        selectedRole = roleName;

        // 3. Update the page background with a smooth transition.
        mainElement.style.backgroundImage = roleBackgrounds[roleName];
    };

    /**
     * Navigates to the login page if a role is selected.
     */
    window.goToLogin = () => {
        if (selectedRole) {
            // If a role is selected, proceed to the login page.
            // We can pass the role in the URL if needed, e.g., 'login.html?role=' + selectedRole
            window.location.href = `login.html?role=${selectedRole}`;
        } else {
            // If no role is selected, show an alert.
            showAlert('Please select your role first.');
        }
    };

    /**
     * Navigates back to the previous page (index.html).
     */
    window.goToBack = () => {
        // You can change this to 'index.html' if you prefer
        window.history.back();
    };

    /**
     * This function is not used by a button but would be called by the form's onsubmit.
     * It prevents the form from submitting in the traditional way and uses our custom logic.
     */
    window.redirectToRolePage = () => {
        goToLogin();
        return false; // Prevent default form submission
    };
});

// Wait for the document to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {

    // === DYNAMIC BACKGROUND LOGIC ===

    // 1. Define the color map for each role.
    const roleBackgrounds = {
        admin:     'linear-gradient(135deg, #34495E, #2C3E50)',   // Dark Slate
        kepsek:    'linear-gradient(135deg, #6E45E2, #5D3EBF)',   // Purple (Note: HTML uses 'kepsek')
        teacher:   'linear-gradient(135deg, #1DCDAF, #1ABC9C)',   // Teal
        student:   'linear-gradient(145deg, #F3D054, #F1C40F)',   // Yellow
        wali:      'linear-gradient(145deg, #F16B5C, #E74C3C)',   // Red (Note: HTML uses 'wali')
    };

    // 2. Read the role from the page's URL.
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role'); // This will be 'admin', 'kepsek', etc.

    // 3. Find the main element and apply the background if the role is valid.
    const mainElement = document.querySelector('.main');
    if (role && roleBackgrounds[role]) {
        // This line overrides the CSS background with the correct role color.
        // All other animations in the CSS file will remain active!
        mainElement.style.backgroundImage = roleBackgrounds[role];
    }

    // === EXISTING LOGIN PAGE LOGIC ===

    const alertElement = document.getElementById('custom-alert');

    /**
     * Shows a custom alert message.
     * @param {string} message The message to display.
     */
    function showAlert(message) {
        alertElement.textContent = message;
        alertElement.classList.add('show');
        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 3000);
    }

    /**
     * Placeholder for actual login logic.
     */
    window.redirectToRolePage = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showAlert('Username and password cannot be empty.');
            return false; // Prevent form submission
        }

        console.log(`Attempting to log in as: ${role || 'user'}`);
        showAlert('Login successful! (Demo)');

        return false; // Prevent default form submission
    };

    /**
     * Navigates back to the role selection page.
     */
    window.goToBack = () => {
        window.location.href = 'select.html';
    };

});