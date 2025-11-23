// ------------------------
// DELOITTE – FILTAR
// ------------------------

const poljePretraga = document.getElementById("mentorSearchInput");
const padajucaOblast = document.getElementById("departmentSelect");
const padajucaLokacija = document.getElementById("mentorLocationSelect");
const kartice = document.querySelectorAll(".mentor-card");

function primeniFiltre() {
    const tekst = (poljePretraga?.value || "").trim().toLowerCase();
    const oblast = padajucaOblast?.value || "";
    let lokacija = (padajucaLokacija?.value || "").toLowerCase();

    kartice.forEach((kartica) => {
        const ime = kartica.querySelector("h3")?.textContent.toLowerCase() || "";
        const uloga = kartica.querySelector(".mentor-role")?.textContent.toLowerCase() || "";

        let kOblast = kartica.dataset.departman || "";
        let kLokacija = kartica.dataset.lokacija || "";

        // Normalize location naming (novisad → novi-sad)
        if (kLokacija === "novisad") kLokacija = "novi-sad";
        if (lokacija === "novisad") lokacija = "novi-sad";

        let prikazi = true;

        // 1. tekst
        if (tekst && !ime.includes(tekst) && !uloga.includes(tekst)) {
            prikazi = false;
        }

        // 2. oblast
        if (oblast && oblast !== kOblast) {
            prikazi = false;
        }

        // 3. lokacija
        if (lokacija && lokacija !== kLokacija) {
            prikazi = false;
        }

        kartica.style.display = prikazi ? "block" : "none";
    });
}

// Event listeneri
poljePretraga?.addEventListener("input", primeniFiltre);
padajucaOblast?.addEventListener("change", primeniFiltre);
padajucaLokacija?.addEventListener("change", primeniFiltre);

// Pokreni odmah
primeniFiltre();


// ------------------------
// DELOITTE – KALENDAR
// ------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");

let izabraniDan = null;

// Generator kalendara (30 dana, neki blokirani)
function napraviKalendar() {
    calendarContainer.innerHTML = "";
    izabraniDan = null;

    for (let i = 1; i <= 30; i++) {
        const dan = document.createElement("div");
        dan.classList.add("calendar-day");

        // Random 30% zauzeti dani
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

// otvaranje kalendara ("Detalji o danu prakse")
document.querySelectorAll(".mentor-actions button").forEach((btn) => {
    btn.addEventListener("click", () => {
        napraviKalendar();
        scheduleOverlay.style.display = "flex";
    });
});

// zatvaranje
scheduleCloseBtn?.addEventListener("click", () => {
    scheduleOverlay.style.display = "none";
});

scheduleOverlay?.addEventListener("click", (e) => {
    if (e.target === scheduleOverlay) scheduleOverlay.style.display = "none";
});

// zakazivanje
scheduleConfirmBtn?.addEventListener("click", () => {
    if (!izabraniDan) {
        alert("Izaberite slobodan dan!");
        return;
    }

    scheduleOverlay.style.display = "none";
    successOverlay.style.display = "flex";
});

// zatvaranje success ekrana
successCloseBtn?.addEventListener("click", () => {
    successOverlay.style.display = "none";
});

successOverlay?.addEventListener("click", (e) => {
    if (e.target === successOverlay) successOverlay.style.display = "none";
});
