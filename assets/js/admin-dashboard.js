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