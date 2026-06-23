# Rescue Coordinator - System Flowchart

```mermaid
flowchart TD
    Start([Incident Alert Received]) --> Dashboard[KPI Dashboard Updated]
    
    Dashboard --> Chart["Chart.js Doughnut<br/>Decision Status"]
    Dashboard --> KPIs["4 KPI Cards<br/>Total / Awaiting / Sent / Declined"]
    
    KPIs --> IncidentsList[Incidents List Rendered]
    Chart --> IncidentsList
    
    IncidentsList --> TakesAction["Coordinator<br/>Takes Action to Decide"]
    
    TakesAction --> Decision{Decision}
    
    Decision -->|Accept| AcceptFlow[Button: Accept Clicked]
    Decision -->|Decline| DeclineFlow[Button: Decline Clicked]
    Decision -->|No Action| OpenIncident["Status: Open Incident<br/>Awaiting Decision"]
    
    AcceptFlow --> UpdateState1["State: decision = 'accepted'"]
    DeclineFlow --> UpdateState2["State: decision = 'declined'"]
    
    UpdateState1 --> UpdateUI1["UI: Show ✓ Rescue Team Sent<br/>Button Disabled"]
    UpdateState2 --> UpdateUI2["UI: Show ✗ Request Declined<br/>Card Opacity = 0.5"]
    
    UpdateUI1 --> UpdateChart["Chart.js Update<br/>Awaiting - 1<br/>Sent + 1"]
    UpdateUI2 --> UpdateChart
    
    UpdateChart --> UpdateKPIs["KPI Cards Refresh<br/>All counters updated"]
    UpdateKPIs --> RefreshIncidents[Incidents List Refresh]
    RefreshIncidents --> End([Dashboard Updated])
```

## Data Flow

**Incident Object:**
- id, name, hazard, threat, location, time, decision

**KPI Calculation:**
- Total = all incidents
- Awaiting = decision === null
- Sent = decision === 'accepted'
- Declined = decision === 'declined'

**Chart Data:**
- [Awaiting, Sent, Declined]
- Colors: Gray / Green / Red
- Type: Doughnut (Chart.js Library)

## Meaningful Extension: Chart.js Library

The Chart.js library provides:
- Real-time chart updates
- Doughnut/pie visualization
- Responsive rendering
- Dynamic data binding

Without this library, the decision status would only be text-based. With Chart.js, the coordinator gets visual feedback immediately.
