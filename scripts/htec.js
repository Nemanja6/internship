// ------------------------
// FILTER ZA DANE PRAKSE U HTEC
// ------------------------

// ELEMENTI FILTERA
const poljePretragaPrakse = document.getElementById("mentorSearchInput");
const padajucaOblastPrakse = document.getElementById("departmentSelect");
const padajucaLokacijaPrakse = document.getElementById("mentorLocationSelect");
const karticePrakse = document.querySelectorAll(".mentor-card");

// FUNKCIJA FILTRIRANJA
function primeniFiltrePrakse() {
    if (!karticePrakse.length) return;

    const tekstPretraga = (poljePretragaPrakse?.value || "").trim().toLowerCase();
    const izabranaOblast = padajucaOblastPrakse?.value || "";
    const izabranaLokacija = padajucaLokacijaPrakse?.value || "";

    karticePrakse.forEach((kartica) => {
        const ime = kartica.querySelector("h3")?.textContent.toLowerCase() || "";
        const uloga = kartica.querySelector(".mentor-role")?.textContent.toLowerCase() || "";

        const oblastKartice = kartica.dataset.departman || ""; // backend, frontend, qa, product
        const lokacijaKartice = kartica.dataset.lokacija || ""; // beograd, novi-sad, nis, remote

        let prikazi = true;

        // FILTER PRETRAGE PO TEKSTU
        if (tekstPretraga && !ime.includes(tekstPretraga) && !uloga.includes(tekstPretraga)) {
            prikazi = false;
        }

        // FILTER OBLASTI
        if (izabranaOblast && oblastKartice !== izabranaOblast) {
            prikazi = false;
        }

        // FILTER LOKACIJE
        if (izabranaLokacija && lokacijaKartice !== izabranaLokacija) {
            prikazi = false;
        }

        // PRIKAZ / SAKRIVANJE
        kartica.style.display = prikazi ? "block" : "none";
    });
}

// EVENT LISTENERI ZA FILTERE
if (poljePretragaPrakse) {
    poljePretragaPrakse.addEventListener("input", primeniFiltrePrakse);
}
if (padajucaOblastPrakse) {
    padajucaOblastPrakse.addEventListener("change", primeniFiltrePrakse);
}
if (padajucaLokacijaPrakse) {
    padajucaLokacijaPrakse.addEventListener("change", primeniFiltrePrakse);
}

// inicijalno filtriranje (da sve bude "u stanju 0")
primeniFiltrePrakse();


// ------------------------------
// KALENDAR SISTEM — ZA SVE MENTORE U HTEC
// ------------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");

let selektovaniDan = null;

// Ako elementi za kalendar postoje u HTML-u, tek onda inicijalizuj
if (
    scheduleOverlay &&
    scheduleCloseBtn &&
    scheduleConfirmBtn &&
    successOverlay &&
    successCloseBtn &&
    calendarContainer
) {

    function napraviKalendar() {
        calendarContainer.innerHTML = "";
        selektovaniDan = null;

        for (let i = 1; i <= 30; i++) {
            const dan = document.createElement("div");
            dan.classList.add("calendar-day");

            // Nasumično blokirani dani (30% šanse)
            if (Math.random() < 0.3) {
                dan.classList.add("blocked");
                dan.textContent = i;
            } else {
                dan.classList.add("available");
                dan.textContent = i;

                dan.addEventListener("click", () => {
                    // skini selekciju sa svih slobodnih
                    document.querySelectorAll(".calendar-day.available")
                        .forEach(d => {
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

    // Otvaranje kalendara klikom na "Detalji o danu prakse"
    document.querySelectorAll(".mentor-actions button").forEach(btn => {
        btn.addEventListener("click", () => {
            napraviKalendar();
            scheduleOverlay.style.display = "flex";
        });
    });

    // Zatvaranje kalendara
    scheduleCloseBtn.addEventListener("click", () => {
        scheduleOverlay.style.display = "none";
    });

    // Klik na pozadinu da se zatvori
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

    // Zatvaranje SUCCESS modala
    successCloseBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
    });

    successOverlay.addEventListener("click", (e) => {
        if (e.target === successOverlay) {
            successOverlay.style.display = "none";
        }
    });
}
