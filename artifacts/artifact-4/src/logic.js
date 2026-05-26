const tiles = document.querySelectorAll(".tile");
const alertButton = document.querySelector(".btn-emergency");
const statusPill = document.querySelector(".status-pill");
const consequenceText = document.querySelector(".consequence-text");
const alertSound = document.querySelector("#alertSound");

let selectedHazard = "Orc Ambush";
let alertSent = false;

// Hazard auswählen
tiles.forEach((tile) => {

    tile.addEventListener("click", () => {

        if (alertSent) return;

        // Alte Auswahl entfernen
        tiles.forEach((item) => {
            item.classList.remove("selected");
        });

        // Neue Auswahl markieren
        tile.classList.add("selected");

        // Ausgewählten Hazard speichern
        selectedHazard =
            tile.querySelector(".tile-title").textContent;
    });

});

// Emergency Alert senden
alertButton.addEventListener("click", () => {

    // Verhindert mehrfaches Senden
    if (alertSent) return;

    alertSent = true;

    // Smartphone Vibration
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }

    // Sound abspielen
    if (alertSound) {
        alertSound.play();
    }

    // Button ändern
    alertButton.textContent =
        "HELP IS ON THE WAY";

    alertButton.style.background =
        "linear-gradient(180deg, #2d6a4f, #1b4332)";

    // Status unten ändern
    statusPill.textContent =
        "Rescue team dispatched";

    // Nachricht ändern
    consequenceText.textContent =
        `Your ${selectedHazard} alert has been received. Fellowship support units are now heading to your location.`;

    // Hazard Buttons deaktivieren
    tiles.forEach((tile) => {

        tile.style.opacity = "0.6";
        tile.style.pointerEvents = "none";

    });

    // Kleiner Klick-Effekt
    alertButton.style.transform =
        "scale(1.03)";

    setTimeout(() => {

        alertButton.style.transform =
            "scale(1)";

    }, 200);

});
