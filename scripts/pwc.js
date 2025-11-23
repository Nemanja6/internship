const poljePretragaPrakse = document.getElementById('mentorSearchInput');
const padajucaOblastPrakse = document.getElementById('departmentSelect');
const padajucaLokacijaPrakse = document.getElementById('mentorLocationSelect');
const karticePrakse = document.querySelectorAll('.mentor-card');

function primeniFiltrePrakse() {
    if (!karticePrakse.length) return;

    const tekstPretraga = poljePretragaPrakse.value.trim().toLowerCase();
    const vrednostOblast = padajucaOblastPrakse.value;      // npr. "it", "kreativa", "revizija"...
    const vrednostLokacija = padajucaLokacijaPrakse.value;  // npr. "beograd", "novi-sad", "nis", "remote"

    karticePrakse.forEach((kartica) => {
        const naslovPrakse = kartica.querySelector('h3')?.textContent.toLowerCase() || "";
        const ulogaPrakse = kartica.querySelector('.mentor-role')?.textContent.toLowerCase() || "";

        const oblastKartice = kartica.dataset.departman || kartica.dataset.deparman || kartica.dataset.dept || kartica.dataset.oblast || kartica.dataset.departman || kartica.dataset.deparman || kartica.dataset.departman || kartica.dataset.departman;// wrong, stop

    });
}

// ------------------------
// PWC – FILTAR DANA PRAKSE
// ------------------------

const poljePretraga = document.getElementById("mentorSearchInput");
const padajucaOblast = document.getElementById("departmentSelect");
const padajucaLokacija = document.getElementById("mentorLocationSelect");
const kartice = document.querySelectorAll(".mentor-card");

function primeniFiltre() {
    const tekst = poljePretraga.value.trim().toLowerCase();
    const oblast = padajucaOblast.value;      // npr. revizija, finansije, racunovodstvo…
    const lokacija = padajucaLokacija.value;  // beograd, novi-sad

    kartice.forEach(kartica => {
        const imeOsobe = kartica.querySelector("h3").textContent.toLowerCase();
        const uloga = kartica.querySelector(".mentor-role").textContent.toLowerCase();

        const karticaOblast = kartica.dataset.departman;
        const karticaLokacija = kartica.dataset.lokacija;

        let prikazi = true;

        if (tekst && !imeOsobe.includes(tekst) && !uloga.includes(tekst)) {
            prikazi = false;
        }

        if (oblast && karticaOblast !== oblast) {
            prikazi = false;
        }

        if (lokacija && karticaLokacija !== lokacija) {
            prikazi = false;
        }

        kartica.style.display = prikazi ? "block" : "none";
    });
}

poljePretraga.addEventListener("input", primeniFiltre);
padajucaOblast.addEventListener("change", primeniFiltre);
padajucaLokacija.addEventListener("change", primeniFiltre);

primeniFiltre();

// ------------------------------
// KALENDAR SISTEM — PWC
// ------------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");

let selektovaniDan = null;

if (
    scheduleOverlay &&
    scheduleCloseBtn &&
    scheduleConfirmBtn &&
    successOverlay &&
    successCloseBtn &&
    calendarContainer
) {
    // pravi nasumičan kalendar sa blokiranim danima
    function napraviKalendar() {
        calendarContainer.innerHTML = "";
        selektovaniDan = null;

        for (let i = 1; i <= 30; i++) {
            const dan = document.createElement("div");
            dan.classList.add("calendar-day");

            // ~30% šansa da dan bude zauzet
            if (Math.random() < 0.3) {
                dan.classList.add("blocked");
                dan.textContent = i;
            } else {
                dan.classList.add("available");
                dan.textContent = i;

                dan.addEventListener("click", () => {
                    // skini selekciju sa svih slobodnih
                    document.querySelectorAll(".calendar-day.available").forEach(d => {
                        d.classList.remove("selected");
                        d.style.background = "";
                    });

                    dan.classList.add("selected");
                    dan.style.background = "#90ee90";
                    selektovaniDan = i;
                });
            }

            calendarContainer.appendChild(dan);
        }
    }

    // Otvori kalendar kad se klikne "Detalji o danu prakse"
    document.querySelectorAll(".mentor-actions button").forEach(btn => {
        btn.addEventListener("click", () => {
            napraviKalendar();
            scheduleOverlay.style.display = "flex";
        });
    });

    // Zatvori kalendar (X)
    scheduleCloseBtn.addEventListener("click", () => {
        scheduleOverlay.style.display = "none";
    });

    // Klik na pozadinu zatvara kalendar
    scheduleOverlay.addEventListener("click", (e) => {
        if (e.target === scheduleOverlay) {
            scheduleOverlay.style.display = "none";
        }
    });

    // Klik na "Zakaži"
    scheduleConfirmBtn.addEventListener("click", () => {
        if (!selektovaniDan) {
            alert("Morate izabrati slobodan dan!");
            return;
        }
        scheduleOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    });

    // Zatvaranje success modala
    successCloseBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
    });

    successOverlay.addEventListener("click", (e) => {
        if (e.target === successOverlay) {
            successOverlay.style.display = "none";
        }
    });
}
