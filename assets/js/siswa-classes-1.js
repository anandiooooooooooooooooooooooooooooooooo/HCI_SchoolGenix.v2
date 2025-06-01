function selectClass(subjectName) {
    localStorage.setItem("selectedClass", subjectName);
    window.location.href = "./siswa-classes-2.html";
}