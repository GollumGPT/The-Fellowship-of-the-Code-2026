```mermaid

flowchart TD
    %% Styling Definitions
    classDef startEnd fill:#dfc47d,stroke:#333,stroke-width:2px,color:#000;
    classDef process fill:#e6f3ff,stroke:#4a90e2,stroke-width:1px,color:#000;
    classDef decision fill:#fff8dc,stroke:#d4af37,stroke-width:2px,color:#000;
    classDef accept fill:#a8dfa2,stroke:#4caf50,stroke-width:2px,color:#000;
    classDef decline fill:#f8a4a4,stroke:#ff3333,stroke-width:2px,color:#000;
    classDef update fill:#e8e8e8,stroke:#666,stroke-width:1px,color:#000;
    classDef notify fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000;

    Start([Incident Alert Received]):::startEnd --> Dashboard[KPI Dashboard Updated]:::process
    
    Dashboard --> Chart["Chart.js Doughnut<br/>Decision Status"]:::process
    Dashboard --> KPIs["4 KPI Cards<br/>Total / Awaiting / Sent / Declined"]:::process
    
    KPIs --> IncidentsList[Incidents List Rendered]:::process
    Chart --> IncidentsList
    
    IncidentsList --> TakesAction["Coordinator Takes Action"]:::process
    
    TakesAction --> Decision{Decision}:::decision
    
    Decision -->|Accept| AcceptFlow[Button: Accept Clicked]:::accept
    Decision -->|Decline| DeclineFlow[Button: Decline Clicked]:::decline
    Decision -->|No Action| OpenIncident["Status: Open Incident<br/>Awaiting Decision"]:::update
    
    AcceptFlow --> UpdateState1["State: decision = 'accepted'"]:::accept
    DeclineFlow --> UpdateState2["State: decision = 'declined'"]:::decline
    
    UpdateState1 --> UpdateUI1["UI: Show ✓ Rescue Sent<br/>Button Disabled"]:::accept
    UpdateState2 --> UpdateUI2["UI: Show ✗ Request Declined<br/>Card Opacity = 0.5"]:::decline
    
    %% Notification to the sender (Closing the loop)
    UpdateUI1 --> NotifySender1["Send Notification to Member<br/>'Rescue En Route!'"]:::notify
    UpdateUI2 --> NotifySender2["Send Notification to Member<br/>'Request Declined'"]:::notify
    
    NotifySender1 --> UpdateChart["Chart.js Update<br/>Awaiting -1 | Sent +1"]:::update
    NotifySender2 --> UpdateChart["Chart.js Update<br/>Awaiting -1 | Declined +1"]:::update
    
    UpdateChart --> UpdateKPIs["KPI Cards Refresh"]:::update
    UpdateKPIs --> RefreshIncidents[Incidents List Refresh]:::process
    RefreshIncidents --> End([Dashboard Fully Updated]):::startEnd
