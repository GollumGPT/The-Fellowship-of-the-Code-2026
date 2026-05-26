// ==========================
// STATE
// ==========================

const state = {
    currentLocation: "Mines of Moria",
    isLocationDetected: true,

    selectedHazard: null,

    isSending: false,
    isSent: false
};

// ==========================
// CONSTANTS
// ==========================

const hazardNames = {
    orks: "Orc Ambush (Combat Support)",
    umwelt: "Trap / Hazard (Physical Danger)",
    verlust: "Member Lost (Search Party)",
    ring: "Nazgûl (Stealth Mode)"
};

// ==========================
// DOM REFERENCES
// ==========================

const locationDisplay = document.getElementById('locationDisplay');

const hazardTiles = document.querySelectorAll('.tile');

const btnEmergency = document.getElementById('btnEmergency');

const statusMessage = document.getElementById('statusMessage');

const btnBack = document.getElementById('btnBack');

const setupArea = document.getElementById('setupArea');

const summaryArea = document.getElementById('summaryArea');

const summaryLocation = document.getElementById('summaryLocation');

const summaryHazard = document.getElementById('summaryHazard');

// ==========================
// HELPERS
// ==========================

function updateState(newState) {
    Object.assign(state, newState);

    renderUI();
}

function setEmergencyButton({
    text,
    disabled,
    className
}) {
    btnEmergency.textContent = text;

    btnEmergency.disabled = disabled;

    btnEmergency.className = `btn-emergency ${className}`;
}

// ==========================
// RENDER FUNCTIONS
// ==========================

function renderLocation() {

    if (state.isLocationDetected) {

        locationDisplay.textContent =
            `${state.currentLocation} (Detected)`;

        locationDisplay.style.color = "#111111";

    } else {

        locationDisplay.textContent =
            "Searching Signal...";

        locationDisplay.style.color = "#888888";
    }
}

function renderTiles() {

    hazardTiles.forEach(tile => {

        const isSelected =
            tile.dataset.hazard === state.selectedHazard;

        tile.classList.toggle('selected', isSelected);

        tile.setAttribute(
            'aria-pressed',
            isSelected
        );
    });
}

function renderSummary() {

    if (state.isSent) {

        setupArea.classList.add('hidden');

        summaryArea.classList.remove('hidden');

        summaryLocation.textContent =
            state.currentLocation;

        summaryHazard.textContent =
            hazardNames[state.selectedHazard];

    } else {

        setupArea.classList.remove('hidden');

        summaryArea.classList.add('hidden');
    }
}

function renderButton() {

    if (state.isSent) {

        setEmergencyButton({
            text: "ALERT TRANSMITTED",
            disabled: true,
            className: "success"
        });

        statusMessage.textContent =
            "The Fellowship has been notified. Tactical support has been dispatched.";

        return;
    }

    if (state.isSending) {

        setEmergencyButton({
            text: "SENDING ALERT...",
            disabled: true,
            className: "loading"
        });

        statusMessage.textContent =
            "Encrypting signal frequencies across Palantíri networks...";

        return;
    }

    if (state.selectedHazard) {

        setEmergencyButton({
            text: "SEND ALERT NOW",
            disabled: !state.isLocationDetected,
            className: "default"
        });

        statusMessage.textContent =
            "Warning: Pressing this button broadcasts your coordinates instantly.";

        return;
    }

    setEmergencyButton({
        text: "SEND ALERT NOW",
        disabled: true,
        className: ""
    });

    statusMessage.textContent =
        "Please select a hazard level above to unlock the transmission.";
}

function renderUI() {

    renderLocation();

    renderTiles();

    renderSummary();

    renderButton();
}

// ==========================
// EVENTS
// ==========================

hazardTiles.forEach(tile => {

    tile.addEventListener('click', () => {

        if (state.isSending || state.isSent) {
            return;
        }

        const hazardId =
            tile.dataset.hazard;

        updateState({
            selectedHazard:
                state.selectedHazard === hazardId
                    ? null
                    : hazardId
        });
    });
});

btnEmergency.addEventListener('click', () => {

    if (
        !state.selectedHazard ||
        state.isSending ||
        state.isSent ||
        !state.isLocationDetected
    ) {
        return;
    }

    updateState({
        isSending: true
    });

    setTimeout(() => {

        updateState({
            isSending: false,
            isSent: true
        });

    }, 1500);
});

btnBack.addEventListener('click', () => {

    updateState({
        selectedHazard: null,
        isSending: false,
        isSent: false
    });
});

// ==========================
// INIT
// ==========================

renderUI();
