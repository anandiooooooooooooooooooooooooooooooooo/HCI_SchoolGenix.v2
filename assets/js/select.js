// assets/js/select.js

document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Element References ---
  const mainElement = document.querySelector('.main');
  const loginButton = document.querySelector('.login'); // Get the "Next" button
  const allRoleButtons = document.querySelectorAll('.role-button');
  const alertElement = document.getElementById('custom-alert');

  // --- Theme Mapping for Roles ---
  const roleThemes = {
    admin: {
      background: 'linear-gradient(145deg, #34495E, #2C3E50)',
      buttonClass: 'login-btn-admin'
    },
    kepsek: {
      background: 'linear-gradient(145deg, #6E45E2, #5D3EBF)',
      buttonClass: 'login-btn-kepsek'
    },
    teacher: {
      background: 'linear-gradient(145deg, #1DCDAF, #1ABC9C)',
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
  const defaultBackground = 'linear-gradient(145deg, #2f5f2d, #254F1A)';

  // --- State Variable ---
  let selectedRole = localStorage.getItem("selectedRole") || null;

  /**
   * Updates the entire UI based on the current selectedRole.
   */
  function updateUI() {
    // Update the selection state of the role buttons
    allRoleButtons.forEach(button => {
      // Find the role associated with the button from its onclick attribute
      const buttonRole = button.getAttribute('onclick').match(/'([^']+)'/)[1];

      // First, remove any existing role classes to reset the button
      button.classList.remove('selected', ...Object.keys(roleThemes));

      // If this button's role is the one currently selected, add the correct classes
      if (buttonRole === selectedRole) {
        button.classList.add('selected', buttonRole);
      }
    });

    // --- UPDATE THE "NEXT" BUTTON AND BACKGROUND ---

    // First, reset the "Next" button by removing all possible theme classes
    Object.values(roleThemes).forEach(theme => {
      loginButton.classList.remove(theme.buttonClass);
    });

    if (selectedRole && roleThemes[selectedRole]) {
      // If a role is selected, apply its theme to the background AND the "Next" button
      mainElement.style.backgroundImage = roleThemes[selectedRole].background;
      loginButton.classList.add(roleThemes[selectedRole].buttonClass);
    } else {
      // Otherwise, revert to the default theme
      mainElement.style.backgroundImage = defaultBackground;
    }
  }

  // Run once on page load to apply any saved theme from previous visits
  updateUI();

  /**
   * Main function to handle when a user clicks a role button.
   */
  window.selectRole = (roleName) => {
    if (selectedRole === roleName) {
      // If clicking the same role, deselect it
      selectedRole = null;
      localStorage.removeItem("selectedRole");
    } else {
      // Otherwise, select the new role
      selectedRole = roleName;
      localStorage.setItem("selectedRole", roleName);
    }
    updateUI(); // Update the entire UI to reflect the change
  };

  /**
   * Navigates to the login page if a role is selected.
   */
  window.goToLogin = () => {
    if (!selectedRole) {
      showAlert("Please select a role first.");
      return;
    }
    window.location.href = "login.html";
  };

  /**
   * Navigates back to the home page.
   */
  window.goToBack = () => {
    window.location.href = "index.html";
  };

  /**
   * Shows a custom alert message.
   */
  function showAlert(message) {
    alertElement.textContent = message;
    alertElement.classList.add("show");
    setTimeout(() => {
      alertElement.classList.remove("show");
    }, 3000);
  }
});