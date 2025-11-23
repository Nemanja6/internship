// LOGIN MODAL
const loginOpenBtn = document.getElementById('loginOpenBtn');
const loginOverlay = document.getElementById('loginOverlay');
const loginCloseBtn = document.getElementById('loginCloseBtn');

if (loginOpenBtn && loginOverlay && loginCloseBtn) {
    loginOpenBtn.addEventListener('click', () => {
        loginOverlay.classList.add('active');
    });

    loginCloseBtn.addEventListener('click', () => {
        loginOverlay.classList.remove('active');
    });

    // klik van modala zatvara prozor
    loginOverlay.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active');
        }
    });
}
const dugmeMeni = document.getElementById('navToggle');

if (dugmeMeni) {
    dugmeMeni.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}

// ------------------------
// FILTIRANJE KOMPANIJA
// ------------------------

const poljePretragaKompanije = document.getElementById('searchInput');
const izborOblast = document.getElementById('fieldSelect');
const izborLokacija = document.getElementById('locationSelect');
const dugmeResetFilteri = document.getElementById('resetFilters');
const karticeKompanija = document.querySelectorAll('.company-card');

function primeniFiltere() {
    const tekstPretraga = poljePretragaKompanije.value.trim().toLowerCase();
    const vrednostOblast = izborOblast.value;      // npr. "it", "marketing"...
    const vrednostLokacija = izborLokacija.value; // npr. "beograd", "novi-sad", "nis"

    karticeKompanija.forEach((kartica) => {
        const nazivKompanije = kartica
            .querySelector('h3')
            .textContent
            .toLowerCase();

        const oblastKartice = kartica.dataset.oblast;     // data-oblast
        const lokacijaKartice = kartica.dataset.lokacija; // data-lokacija

        let prikazi = true;

        // filtriranje po tekstu (ime kompanije)
        if (tekstPretraga && !nazivKompanije.includes(tekstPretraga)) {
            prikazi = false;
        }

        // filtriranje po oblasti
        if (vrednostOblast && oblastKartice !== vrednostOblast) {
            prikazi = false;
        }

        // filtriranje po lokaciji
        if (vrednostLokacija && lokacijaKartice !== vrednostLokacija) {
            prikazi = false;
        }

        kartica.style.display = prikazi ? "" : "none";
    });
}

// dodavanje osluškivača na input/select polja
if (poljePretragaKompanije && izborOblast && izborLokacija) {
    poljePretragaKompanije.addEventListener('input', primeniFiltere);
    izborOblast.addEventListener('change', primeniFiltere);
    izborLokacija.addEventListener('change', primeniFiltere);
}

// reset filtera
if (dugmeResetFilteri) {
    dugmeResetFilteri.addEventListener('click', () => {
        poljePretragaKompanije.value = "";
        izborOblast.value = "";
        izborLokacija.value = "";
        primeniFiltere();
    });
}
