const className = localStorage.getItem("selectedClass");
if (className) {
    document.getElementById("class-name").textContent = className;
}