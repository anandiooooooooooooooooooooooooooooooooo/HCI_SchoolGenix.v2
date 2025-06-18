document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Element References ---
  const mainElement = document.querySelector('.main');
  const loginButton = document.querySelector('.login');
  const allRoleButtons = document.querySelectorAll('.role-button');
  const alertElement = document.getElementById('custom-alert');

  // --- UPDATED: Theme Mapping now uses CSS classes ---
  const roleThemes = {
    admin: {
      backgroundClass: 'main-theme-admin',
      buttonClass: 'login-btn-admin'
    },
    kepsek: {
      backgroundClass: 'main-theme-kepsek',
      buttonClass: 'login-btn-kepsek'
    },
    teacher: {
      backgroundClass: 'main-theme-teacher',
      buttonClass: 'login-btn-teacher'
    },
    student: {
      backgroundClass: 'main-theme-student',
      buttonClass: 'login-btn-student'
    },
    wali: {
      backgroundClass: 'main-theme-wali',
      buttonClass: 'login-btn-wali'
    }
  };
  // REMOVED: No need for a default background variable here anymore

  // --- State Variable ---
  let selectedRole = localStorage.getItem("selectedRole") || null;

  /**
   * UPDATED: Updates the UI by toggling CSS classes.
   */
  function updateUI() {
    // --- 1. Update Role Button Selection State ---
    allRoleButtons.forEach(button => {
      const buttonRole = button.getAttribute('onclick').match(/'([^']+)'/)[1];
      button.classList.remove('selected', ...Object.keys(roleThemes));
      if (buttonRole === selectedRole) {
        button.classList.add('selected', buttonRole);
      }
    });

    // --- 2. Get all possible theme classes ---
    const allThemeClasses = Object.values(roleThemes).map(theme => theme.buttonClass);
    const allBackgroundClasses = Object.values(roleThemes).map(theme => theme.backgroundClass);

    // --- 3. Reset Button and Background ---
    loginButton.classList.remove(...allThemeClasses);
    mainElement.classList.remove(...allBackgroundClasses);

    // --- 4. Apply New Theme if a role is selected ---
    if (selectedRole && roleThemes[selectedRole]) {
      const theme = roleThemes[selectedRole];
      // Add the correct classes to the main background and the login button
      mainElement.classList.add(theme.backgroundClass);
      loginButton.classList.add(theme.buttonClass);
    }
    // If no role is selected, the elements automatically revert to their default styles
    // defined in the CSS, so no 'else' block is needed.
  }


  // Run once on page load to apply any saved theme
  updateUI();

  /**
   * Main function to handle when a user clicks a role button.
   */
  window.selectRole = (roleName) => {
    if (selectedRole === roleName) {
      selectedRole = null;
      localStorage.removeItem("selectedRole");
    } else {
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