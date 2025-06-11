


document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modalLogout');
    const tombolLogout = document.querySelector('.logout-btn');
    const tombolBatal = document.getElementById('tombolBatal');
    const tombolKonfirmasiLogout = document.getElementById('tombolKonfirmasiLogout');

 
    if (modal && tombolLogout && tombolBatal && tombolKonfirmasiLogout) {

        
        tombolLogout.addEventListener('click', function (event) {
           
            event.preventDefault(); 

            
            modal.style.display = 'block';
        });

       
        tombolBatal.addEventListener('click', function () {
            
            modal.style.display = 'none';
        });

       
        tombolKonfirmasiLogout.addEventListener('click', function (event) {
            event.preventDefault();
           
            window.location.href = tombolLogout.href;
        });

        
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});