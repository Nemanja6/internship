// ------------------------
// McCANN – FILTAR DANA PRAKSE
// ------------------------

const poljePretraga = document.getElementById("mentorSearchInput");
const padajucaOblast = document.getElementById("departmentSelect");
const padajucaLokacija = document.getElementById("mentorLocationSelect");
const kartice = document.querySelectorAll(".mentor-card");

function primeniFiltre() {
    const tekst = poljePretraga.value.trim().toLowerCase();
    const oblast = padajucaOblast.value;
    const lokacija = padajucaLokacija.value;

    kartice.forEach(kartica => {
        const ime = kartica.querySelector("h3").textContent.toLowerCase();
        const uloga = kartica.querySelector(".mentor-role").textContent.toLowerCase();

        const karticaOblast = kartica.dataset.departman;
        const karticaLokacija = kartica.dataset.lokacija;

        let prikazi = true;

        if (tekst && !ime.includes(tekst) && !uloga.includes(tekst)) prikazi = false;

        if (oblast && karticaOblast !== oblast) prikazi = false;

        if (lokacija && karticaLokacija !== lokacija) prikazi = false;

        kartica.style.display = prikazi ? "block" : "none";
    });
}

poljePretraga.addEventListener("input", primeniFiltre);
padajucaOblast.addEventListener("change", primeniFiltre);
padajucaLokacija.addEventListener("change", primeniFiltre);

primeniFiltre();


// ------------------------
// KALENDAR ZA MCCANN
// ------------------------

const scheduleOverlay = document.getElementById("scheduleOverlay");
const scheduleCloseBtn = document.getElementById("scheduleCloseBtn");
const calendarContainer = document.getElementById("calendarContainer");
const scheduleConfirmBtn = document.getElementById("scheduleConfirmBtn");
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");

let izabraniDan = null;

// PRAVLJENJE KALENDARA
function napraviKalendar() {
    calendarContainer.innerHTML = "";
    izabraniDan = null;

    for (let i = 1; i <= 30; i++) {
        const dan = document.createElement("div");
        dan.classList.add("calendar-day");

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

// OTVARANJE MODALA
document.querySelectorAll(".mentor-actions button").forEach(btn => {
    btn.addEventListener("click", () => {
        napraviKalendar();
        scheduleOverlay.style.display = "flex";
    });
});

// ZATVARANJE MODALA
scheduleCloseBtn.addEventListener("click", () => {
    scheduleOverlay.style.display = "none";
});

// POTVRDA
scheduleConfirmBtn.addEventListener("click", () => {
    if (!izabraniDan) {
        alert("Izaberi slobodan dan!");
        return;
    }

    scheduleOverlay.style.display = "none";
    successOverlay.style.display = "flex";
});

// ZATVARANJE SUCCESS MODALA
successCloseBtn.addEventListener("click", () => {
    successOverlay.style.display = "none";
});

