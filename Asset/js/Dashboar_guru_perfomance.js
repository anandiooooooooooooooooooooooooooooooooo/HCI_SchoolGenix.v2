const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'This Week',
        data: [5, 20, 75, 50, 10, 0, 15, 40, 60, 35, 25, 80],
        fill: true,
        backgroundColor: 'rgba(250, 204, 21, 0.2)',
        borderColor: '#facc15',
        tension: 0.4,
        pointBackgroundColor: '#facc15'
      },
      {
        label: 'Last Week',
        data: [20, 30, 50, 45, 15, 5, 25, 50, 65, 40, 10, 90],
        fill: true,
        backgroundColor: 'rgba(251, 137, 107, 0.2)',
        borderColor: '#fb896b',
        tension: 0.4,
        pointBackgroundColor: '#fb896b'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 25
        }
      }
    }
  }
});
