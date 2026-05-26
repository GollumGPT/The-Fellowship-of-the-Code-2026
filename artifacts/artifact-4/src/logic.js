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
// HAZARD LABELS
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

const locationDisplay =
    document.getElementById('locationDisplay');

const hazardTiles =
    [...document.querySelectorAll('.tile')];

const btnEmergency =
    document.getElementById('btnEmergency');

const statusMessage =
    document.getElementById('statusMessage');

const btnBack =
    document.getElementById('btnBack');

const setupArea =
    document.getElementById('setupArea');

const summaryArea =
    document.getElementById('summaryArea');

const summaryLocation =
    document.getElementById('summaryLocation');

const summaryHazard =
    document.getElementById('summaryHazard');

// ==========================
// SAFETY CHECKS
// ==========================

const requiredElements = {
    locationDisplay,
    btnEmergency,
    btnBack,
    setupArea,
    summaryArea,
    summaryLocation,
    summaryHazard,
    statusMessage
};

for (const [name, el] of Object.entries(requiredElements)) {

    if (!el) {

        throw new Error(
            `Required DOM element missing: #${name}`
        );
    }
}

if (hazardTiles.length === 0) {

    throw new Error(
        'No hazard tiles found in DOM'
    );
}

// ==========================
// SEND TIMER
// ==========================

let sendTimer = null;

// ==========================
// STATE UPDATE HELPER
// ==========================

function updateState(newState) {

    Object.assign(state, newState);

    renderUI();
}

// ==========================
// ALERT EFFECTS
// ==========================

function triggerAlertEffects() {

    // Smartphone vibration
    if (navigator.vibrate) {

        navigator.vibrate([
            300,
            100,
            300
        ]);
    }
}

// ==========================
// RENDER LOCATION
// ==========================

function renderLocation() {

    if (state.isLocationDetected) {

        locationDisplay.textContent =
            `${state.currentLocation} (Detected)`;

    } else {

        locationDisplay.textContent =
            "Searching Signal...";
    }
}

// ==========================
// RENDER TILES
// ==========================

function renderTiles() {

    const isLocked =
        state.isSending || state.isSent;

    hazardTiles.forEach(tile => {

        const isSelected =
            tile.dataset.hazard === state.selectedHazard;

        tile.classList.toggle(
            'selected',
            isSelected
        );

        tile.setAttribute(
            'aria-pressed',
            String(isSelected)
        );

        tile.disabled = isLocked;
    });
}

// ==========================
// RENDER SUMMARY
// ==========================

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

// ==========================
// RENDER BUTTON
// ==========================

function renderButton() {

    btnEmergency.classList.remove('success');

    if (state.isSent) {

        btnEmergency.disabled = true;

        btnEmergency.textContent =
            "ALERT TRANSMITTED";

        btnEmergency.classList.add('success');

        statusMessage.textContent =
            "The Fellowship has been notified. Tactical support has been dispatched.";

        return;
    }

    if (state.isSending) {

        btnEmergency.disabled = true;

        btnEmergency.textContent =
            "SENDING ALERT...";

        statusMessage.textContent =
            "Encrypting signal frequencies across Palantíri networks...";

        return;
    }

    if (state.selectedHazard) {

        btnEmergency.disabled =
            !state.isLocationDetected;

        btnEmergency.textContent =
            "SEND ALERT NOW";

        statusMessage.textContent =
            "Warning: Pressing this button broadcasts your coordinates instantly.";

        return;
    }

    btnEmergency.disabled = true;

    btnEmergency.textContent =
        "SEND ALERT NOW";

    statusMessage.textContent =
        "Please select a hazard level above to unlock the transmission.";
}

// ==========================
// MAIN RENDER
// ==========================

function renderUI() {

    renderLocation();

    renderTiles();

    renderSummary();

    renderButton();
}

// ==========================
// TILE EVENTS
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

// ==========================
// EMERGENCY BUTTON EVENT
// ==========================

btnEmergency.addEventListener('click', () => {

    if (
        !state.selectedHazard ||
        state.isSending ||
        state.isSent ||
        !state.isLocationDetected
    ) {
        return;
    }

    if (sendTimer !== null) {

        clearTimeout(sendTimer);

        sendTimer = null;
    }

    updateState({
        isSending: true
    });

    sendTimer = setTimeout(() => {

        sendTimer = null;

        // Trigger vibration
        triggerAlertEffects();

        updateState({
            isSending: false,
            isSent: true
        });

    }, 1500);
});

// ==========================
// BACK BUTTON EVENT
// ==========================

btnBack.addEventListener('click', () => {

    if (sendTimer !== null) {

        clearTimeout(sendTimer);

        sendTimer = null;
    }

    updateState({
        selectedHazard: null,
        isSending: false,
        isSent: false
    });
});

// ==========================
// INITIAL RENDER
// ==========================

renderUI();
