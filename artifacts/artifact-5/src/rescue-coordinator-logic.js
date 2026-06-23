document.addEventListener('DOMContentLoaded', function() {

const incidents = [
  { id: 1, name: "Frodo Baggins", hazard: "BALROG", threat: "CRITICAL", location: "Mines of Moria", time: "14:32", decision: null },
  { id: 2, name: "Gandalf",       hazard: "NAZGUL", threat: "HIGH",     location: "Khazad-dûm",    time: "14:35", decision: null },
  { id: 3, name: "Aragorn",       hazard: "ORCS",   threat: "MEDIUM",   location: "Rivendell",     time: "14:40", decision: null },
  { id: 4, name: "Legolas",       hazard: "TRAPS",  threat: "LOW",      location: "Mirkwood",      time: "14:45", decision: null }\n];

// Chart-Instanz direkt beim Erstellen speichern
let chart = null;

function getKPIs() {
  return {
    total:    incidents.length,
    awaiting: incidents.filter(i => i.decision === null).length,
    sent:     incidents.filter(i => i.decision === 'accepted').length,
    declined: incidents.filter(i => i.decision === 'declined').length
  };
}

function renderKPIs() {
  const { total, awaiting, sent, declined } = getKPIs();
  document.getElementById('kpiSection').innerHTML = `
    <div class=\"kpi-card\">
      <div class=\"kpi-label\">Total Incidents</div>
      <div class=\"kpi-value\">${total}</div>
    </div>
    <div class=\"kpi-card\">
      <div class=\"kpi-label\">Awaiting Decision</div>
      <div class=\"kpi-value\">${awaiting}</div>
    </div>
    <div class=\"kpi-card\">
      <div class=\"kpi-label\">Rescue Teams Sent</div>
      <div class=\"kpi-value var-sent\">${sent}</div>
    </div>
    <div class=\"kpi-card\">
      <div class=\"kpi-label\">Requests Declined</div>
      <div class=\"kpi-value var-declined\">${declined}</div>
    </div>
  `;
}

function renderIncidents() {
  const grid = document.getElementById('incidentsGrid');
  grid.innerHTML = incidents.map(inc => `
    <div class="incident-card ${inc.decision !== null ? 'resolved' : ''}">
      <div class="incident-header">
        <div class="header-left">
          <div class="incident-name">${inc.name}</div>
          <div class="threat-badge">
            Threat: <span class="threat-value threat-${inc.threat.toLowerCase()}">${inc.threat}</span>
          </div>
        </div>
        <div class="header-right">
          <div class="hazard-badge ${inc.hazard.toLowerCase()}">${inc.hazard}</div>
        </div>
      </div>
      <div class="incident-details">
        <div class="detail-row"><span class="detail-label">Location</span><span class="detail-value\">${inc.location}</span></div>
        <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value\">${inc.time}</span></div>
      </div>
      ${inc.decision === null
        ? `<div class="incident-actions">
             <button class="action-btn accept" onclick="decide(${inc.id}, 'accepted')">Accept</button>
             <button class="action-btn decline" onclick="decide(${inc.id}, 'declined')">Decline</button>
           </div>`
        : `<div class="decision-status ${inc.decision === 'accepted' ? 'status-accepted' : 'status-declined'}">
             ${inc.decision === 'accepted' ? '✓ Sent' : '✗ Declined'}
           </div>`
      }
    </div>
  `).join('');
}

function refresh() {
  renderIncidents();
  renderKPIs();
  const { awaiting, sent, declined } = getKPIs();
  chart.data.datasets[0].data = [awaiting, sent, declined];
  chart.update();
}

window.decide = function(id, decision) {
  const inc = incidents.find(i => i.id === id);
  if (inc) {
    inc.decision = decision;
    
    // Simulation der Benachrichtigung an das Fellowship-Mitglied (System-Rückmeldung)
    console.log(`[System Notification] Nachricht an ${inc.name} gesendet: Rettungsstatus aktualisiert auf '${decision === 'accepted' ? 'Rescue En Route' : 'Request Declined'}'.`);
    
    refresh();
  }
}

// Chart Initialisierung
const ctx = document.getElementById('statusChart').getContext('2d');
const { awaiting, sent, declined } = getKPIs();

chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Awaiting', 'Sent', 'Declined'],
    datasets: [{
      data: [awaiting, sent, declined],
      backgroundColor: ['#8c8576', '#4caf50', '#ff3333'],
      borderColor: '#4a3f2c',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#161512', font: { family: 'Cinzel' } }
      }
    }
  }
});

// Erstes Rendern der UI
refresh();

});
