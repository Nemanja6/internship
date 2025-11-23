// ------------------------
// FLOW NINJA – FILTAR DANA PRAKSE
// ------------------------

// Uzimamo elemente iz DOM-a
const poljePretraga = document.getElementById("mentorSearchInput");
const padajucaOblast = document.getElementById("departmentSelect");
const padajucaLokacija = document.getElementById("mentorLocationSelect");
const kartice = document.querySelectorAll(".mentor-card");

// Glavna funkcija za filtriranje
function primeniFiltre() {
    const tekst = poljePretraga.value.trim().toLowerCase();
    const oblast = padajucaOblast.value;      // ui, ux, brending
    const lokacija = padajucaLokacija.value;  // beograd (za sada jedina)

    kartice.forEach(kartica => {
        const imeOsobe = kartica.querySelector("h3").textContent.toLowerCase();
        const uloga = kartica.querySelector(".mentor-role").textContent.toLowerCase();

        const karticaOblast = kartica.dataset.departman;  // ui / ux / brending
        const karticaLokacija = kartica.dataset.lokacija; // beograd

        let prikazi = true;

        // 1) Filter po tekstu (ime ili uloga)
        if (tekst && !imeOsobe.includes(tekst) && !uloga.includes(tekst)) {
            prikazi = false;
        }

        // 2) Filter po oblasti
        if (oblast && karticaOblast !== oblast) {
            prikazi = false;
        }

        // 3) Filter po lokaciji
        if (lokacija && karticaLokacija !== lokacija) {
            prikazi = false;
        }

        // Primeni odluku
        kartica.style.display = prikazi ? "block" : "none";
    });
}

// Event listener-i
poljePretraga.addEventListener("input", primeniFiltre);
padajucaOblast.addEventListener("change", primeniFiltre);
padajucaLokacija.addEventListener("change", primeniFiltre);

// Prvi poziv da sve bude usklađeno sa početnim vrednostima
primeniFiltre();


// ------------------------
// KALENDAR ZA FLOW NINJA
// ------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");

let izabraniDan = null;

// Funkcija za pravljenje kalendara
function napraviKalendar() {
    calendarContainer.innerHTML = "";
    izabraniDan = null;

    // napravi 30 dana
    for (let i = 1; i <= 30; i++) {
        const dan = document.createElement("div");
        dan.classList.add("calendar-day");

        // nasumično blokirani dani (30% šanse)
        if (Math.random() < 0.3) {
            dan.classList.add("blocked");
        } else {
            dan.classList.add("available");
            dan.addEventListener("click", () => {
                document.querySelectorAll(".calendar-day.available")
                    .forEach(d => d.classList.remove("selected"));
                dan.classList.add("selected");
                izabraniDan = i;
            });
        }

        dan.textContent = i;
        calendarContainer.appendChild(dan);
    }
}

// Otvaranje modala klikom na bilo koji "Detalji o danu prakse"
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

// Klik na "Zakaži dan prakse"
scheduleConfirmBtn.addEventListener("click", () => {
    if (!izabraniDan) {
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
