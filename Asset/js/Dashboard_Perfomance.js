document.addEventListener('DOMContentLoaded', () => {
    const grade = 89.3; // Bisa juga ambil dari backend
    const needle = document.getElementById("needle");
    const gauge = document.getElementById("gauge");
    const gradeText = document.getElementById("grade-value");
  
    // Update angka grade
    gradeText.textContent = grade;
  
    // Hitung persentase isi gauge
    const fillPercent = (grade / 100) * 100;
    gauge.style.background = `conic-gradient(#00c896 0% ${fillPercent}%, #e0e0e0 ${fillPercent}% 100%)`;
  
    // Putar jarum (maks 180 derajat)
    const rotation = (grade / 100) * 180;
    needle.style.transform = `rotate(${rotation}deg)`;
  });
  