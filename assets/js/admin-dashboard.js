const ctx = document.getElementById('performanceChart').getContext('2d');
const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
gradientGreen.addColorStop(0, 'rgba(0, 255, 127, 0.3)');
gradientGreen.addColorStop(1, 'rgba(255, 255, 255, 0)');

const gradientRed = ctx.createLinearGradient(0, 0, 0, 400);
gradientRed.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
gradientRed.addColorStop(1, 'rgba(255, 255, 255, 0)');

const crx = document.getElementById('financeChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'This Week',
        data: [0, 20, 80, 90, 25, 3, 5, 40, 60, 40, 60, 50],
        borderColor: '#00ff7f',
        backgroundColor: gradientGreen,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'Last Week',
        data: [20, 35, 50, 50, 30, 5, 10, 50, 65, 45, 85, 40],
        borderColor: 'red',
        backgroundColor: gradientRed,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: (ctx) => {
          const index = ctx.dataIndex;
          return index === 8 ? 'white' : 'transparent'; // highlight Sep point
        },
        pointBorderColor: (ctx) => {
          const index = ctx.dataIndex;
          return index === 8 ? 'red' : 'transparent';
        },
        pointBorderWidth: (ctx) => ctx.dataIndex === 8 ? 3 : 0
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#aaa'
        },
        grid: {
          color: '#eee'
        }
      },
      x: {
        ticks: {
          color: '#aaa'
        },
        grid: {
          color: '#eee'
        }
      }
    }
  }
});



    new Chart(crx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'This Week',
            data: [95, 45, 35, 48, 28, 65, 72],
            backgroundColor: '#bfc9ff',
            borderRadius: 6,
            barPercentage: 0.5,
          },
          {
            label: 'Last Week',
            data: [75, 58, 29, 43, 20, 83, 55],
            backgroundColor: '#c5b4a3',
            borderRadius: 6,
            barPercentage: 0.5,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => tooltipItems[0].label,
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                const percent = Math.round((value / 100) * 100);
                return [`${percent}%`];
              },
              labelTextColor: () => '#fff',
            },
            backgroundColor: '#4c46a2',
            titleFont: { weight: 'bold', size: 14 },
            bodyFont: { weight: 'normal', size: 13 },
            padding: 10,
            caretPadding: 5,
            cornerRadius: 6
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#aaa' },
            grid: { color: '#eee' }
          },
          x: {
            ticks: {
              color: '#444',
              font: { weight: (crx) => crx.tick.label === 'Wed' ? 'bold' : 'normal' }
            },
            grid: { display: false }
          }
        }
      }
    });

    // const confirmButton = document.getElementById('confirmButton');

    //     // Add a 'click' event listener to the button
    //     confirmButton.addEventListener('click', function() {
    //         // Use window.confirm() to show a confirmation dialog.
    //         // It returns `true` if the user clicks "OK" and `false` if the user clicks "Cancel".
    //         const userChoice = window.confirm("Are you sure you want to go to the main page?");

    //         // Check the user's choice
    //         if (userChoice) {
    //             // If the user clicked "OK" (true), redirect them to the main page.
    //             // You can change 'https://www.google.com' to your desired URL.
    //             console.log("User chose YES. Redirecting...");
    //             window.location.href = '../../index.html'; 
    //         } else {
    //             // If the user clicked "Cancel" (false), do nothing.
    //             // The script will end, and the user will stay on the current page.
    //             console.log("User chose NO. Staying on the page.");
    //         }
    //     });

document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modalLogout');
    const tombolLogout = document.querySelector('.logout-btn');
    const tombolBatal = document.getElementById('tombolBatal');
    const tombolKonfirmasiLogout = document.getElementById('tombolKonfirmasiLogout');

    // Pastikan semua elemen ada sebelum menambahkan event listener
    if (modal && tombolLogout && tombolBatal && tombolKonfirmasiLogout) {

        // 2. Saat tombol logout di sidebar diklik...
        tombolLogout.addEventListener('click', function (event) {
            // Mencegah link berpindah halaman secara langsung
            event.preventDefault(); 

            // Tampilkan modal
            modal.style.display = 'block';
        });

        // 3. Saat tombol "Batal" di dalam modal diklik...
        tombolBatal.addEventListener('click', function () {
            // Sembunyikan modal
            modal.style.display = 'none';
        });

        // 4. Saat tombol "Ya, Logout" diklik...
        tombolKonfirmasiLogout.addEventListener('click', function (event) {
            event.preventDefault();
            // Arahkan pengguna ke halaman logout yang asli dari link tombol utama
            window.location.href = '../../index.html';
        });

        // 5. (Opsional) Sembunyikan modal jika pengguna mengklik di luar area modal
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});