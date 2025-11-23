// ------------------------
// MANPOWERGROUP – FILTAR DANA PRAKSE
// ------------------------

// elementi filtera
const poljePretraga = document.getElementById("mentorSearchInput");
const padajucaOblast = document.getElementById("departmentSelect");
const padajucaLokacija = document.getElementById("mentorLocationSelect");
const kartice = document.querySelectorAll(".mentor-card");

function primeniFiltre() {
    if (!kartice.length) return;

    const tekst = (poljePretraga?.value || "").trim().toLowerCase();
    const oblast = padajucaOblast?.value || "";
    const lokacija = padajucaLokacija?.value || "";

    kartice.forEach((kartica) => {
        const imeOsobe = kartica.querySelector("h3")?.textContent.toLowerCase() || "";
        const uloga = kartica.querySelector(".mentor-role")?.textContent.toLowerCase() || "";

        let karticaOblast = kartica.dataset.departman || "";
        let karticaLokacija = kartica.dataset.lokacija || "";

        // ispravljanje razlike "novisad" vs "novi-sad"
        if (karticaLokacija === "novisad") {
            karticaLokacija = "novi-sad";
        }

        let prikazi = true;

        // 1) tekst (ime ili pozicija)
        if (tekst && !imeOsobe.includes(tekst) && !uloga.includes(tekst)) {
            prikazi = false;
        }

        // 2) oblast prakse
        if (oblast && karticaOblast !== oblast) {
            prikazi = false;
        }

        // 3) lokacija
        if (lokacija && karticaLokacija !== lokacija) {
            prikazi = false;
        }

        kartica.style.display = prikazi ? "block" : "none";
    });
}

// event listener-i za filtere
if (poljePretraga) {
    poljePretraga.addEventListener("input", primeniFiltre);
}
if (padajucaOblast) {
    padajucaOblast.addEventListener("change", primeniFiltre);
}
if (padajucaLokacija) {
    padajucaLokacija.addEventListener("change", primeniFiltre);
}

// inicijalni poziv
primeniFiltre();


// ------------------------
// KALENDAR – MANPOWERGROUP
// ------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");

let izabraniDan = null;

// pravljenje kalendara (30 dana, neki random zauzeti)
function napraviKalendar() {
    if (!calendarContainer) return;

    calendarContainer.innerHTML = "";
    izabraniDan = null;

    for (let i = 1; i <= 30; i++) {
        const dan = document.createElement("div");
        dan.classList.add("calendar-day");

        // ~30% zauzetih dana
        if (Math.random() < 0.3) {
            dan.classList.add("blocked");
        } else {
            dan.classList.add("available");
            dan.addEventListener("click", () => {
                document
                    .querySelectorAll(".calendar-day.available")
                    .forEach((d) => d.classList.remove("selected"));
                dan.classList.add("selected");
                izabraniDan = i;
            });
        }

        dan.textContent = i;
        calendarContainer.appendChild(dan);
    }
}

// otvaranje modala sa kalendarom klikom na "Detalji o danu prakse"
document.querySelectorAll(".mentor-actions button").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!scheduleOverlay) return;
        napraviKalendar();
        scheduleOverlay.style.display = "flex";
    });
});

// zatvaranje kalendara
if (scheduleCloseBtn && scheduleOverlay) {
    scheduleCloseBtn.addEventListener("click", () => {
        scheduleOverlay.style.display = "none";
    });

    scheduleOverlay.addEventListener("click", (e) => {
        if (e.target === scheduleOverlay) {
            scheduleOverlay.style.display = "none";
        }
    });
}

// klik na "Zakaži dan prakse"
if (scheduleConfirmBtn) {
    scheduleConfirmBtn.addEventListener("click", () => {
        if (!izabraniDan) {
            alert("Morate izabrati slobodan dan!");
            return;
        }

        if (scheduleOverlay) {
            scheduleOverlay.style.display = "none";
        }
        if (successOverlay) {
            successOverlay.style.display = "flex";
        }
    });
}

// zatvaranje success modala
if (successCloseBtn && successOverlay) {
    successCloseBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
    });

    successOverlay.addEventListener("click", (e) => {
        if (e.target === successOverlay) {
            successOverlay.style.display = "none";
        }
    });
}
