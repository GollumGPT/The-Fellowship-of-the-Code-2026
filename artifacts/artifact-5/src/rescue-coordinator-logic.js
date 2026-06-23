document.addEventListener('DOMContentLoaded', function() {

const incidents = [
  { id: 1, name: "Frodo Baggins", hazard: "BALROG", threat: "CRITICAL", location: "Mines of Moria", time: "14:32", decision: null },
  { id: 2, name: "Gandalf",       hazard: "NAZGUL", threat: "HIGH",     location: "Khazad-dûm",    time: "14:35", decision: null },
  { id: 3, name: "Aragorn",       hazard: "ORCS",   threat: "MEDIUM",   location: "Rivendell",     time: "14:40", decision: null },
  { id: 4, name: "Legolas",       hazard: "TRAPS",  threat: "LOW",      location: "Mirkwood",      time: "14:45", decision: null }
];

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
    <div class="kpi-card">
      <div class="kpi-label">Total Incidents</div>
      <div class="kpi-value">${total}</div>
    </div>
    <div class="kpi-card awaiting">
      <div class="kpi-label">Awaiting Decision</div>
      <div class="kpi-value">${awaiting}</div>
    </div>
    <div class="kpi-card sent">
      <div class="kpi-label">Rescue Teams Sent</div>
      <div class="kpi-value">${sent}</div>
    </div>
    <div class="kpi-card declined">
      <div class="kpi-label">Requests Declined</div>
      <div class="kpi-value">${declined}</div>
    </div>
  `;
}

function createChart() {
  const { awaiting, sent, declined } = getKPIs();
  const ctx = document.getElementById('statusChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Awaiting Decision', 'Rescue Teams Sent', 'Requests Declined'],
      datasets: [{
        data: [awaiting, sent, declined],
        backgroundColor: ['#8c8576', '#4caf50', '#ff3333'],
        borderColor: ['#f4eae1', '#f4eae1', '#f4eae1'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { family: "'Cinzel', Georgia, serif", size: 11 }, color: '#161512', padding: 12 }
        }
      }
    }
  });
}

function renderIncidents() {
  document.getElementById("incidentsGrid").innerHTML = incidents.map(inc => `
    <div class="incident-card ${inc.decision === 'declined' ? 'declined' : inc.hazard.toLowerCase()}">
      <div class="incident-header">
        <div class="header-left">
          <div class="incident-name">${inc.name}</div>
          <div class="threat-display">
            <span class="threat-label">Threat</span>
            <span class="threat-value threat-${inc.threat.toLowerCase()}">${inc.threat}</span>
          </div>
        </div>
        <div class="header-right">
          <div class="hazard-badge ${inc.hazard.toLowerCase()}">${inc.hazard}</div>
        </div>
      </div>
      <div class="incident-details">
        <div class="detail-row"><span class="detail-label">Location</span><span class="detail-value">${inc.location}</span></div>
        <div class="detail-row"><span class="detail-label">Time</span><span class="detail-value">${inc.time}</span></div>
      </div>
      ${inc.decision === null
        ? `<div class="incident-actions">
             <button class="action-btn accept" onclick="decide(${inc.id}, 'accepted')">Accept</button>
             <button class="action-btn decline" onclick="decide(${inc.id}, 'declined')">Decline</button>
           </div>`
        : `<div class="decision-status ${inc.decision === 'accepted' ? 'status-accepted' : 'status-declined'}">
             ${inc.decision === 'accepted' ? '✓ Accepted' : '✗ Declined'}
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
    // Simulation der Rückmeldung:
    console.log(`Notification sent to ${inc.name}: Rescue status updated to ${decision}.`);
    refresh();
  }
}

// Init
renderKPIs();
createChart();
renderIncidents();
// Mobile Accordion Toggle Trigger
document.querySelector('.incidents-section .chart-label').addEventListener('click', function() {
  if (window.innerWidth <= 480) {
    document.querySelector('.incidents-section').classList.toggle('open');
  }
});
});
