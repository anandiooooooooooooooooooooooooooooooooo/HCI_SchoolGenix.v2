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