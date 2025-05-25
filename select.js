let selectedRole = null;

    function selectRole(role, button) {
      selectedRole = role;

      // Save role in localStorage
      localStorage.setItem("selectedRole", role);

      // Reset all buttons
      const buttons = document.querySelectorAll(".role-button");
      buttons.forEach(btn => btn.classList.remove("selected"));

      // Highlight selected
      button.classList.add("selected");
    }

    function goToLogin() {
      if (!selectedRole) {
        alert("Please select a role first.");
        return;
      }
      window.location.href = "login.html";
    }