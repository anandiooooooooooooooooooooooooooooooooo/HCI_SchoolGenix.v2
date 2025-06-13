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