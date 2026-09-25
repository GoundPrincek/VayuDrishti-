const fs = require('fs');
const path = require('path');

const indexFile = 'index.html';
const styleFile = 'styles.css';
const appFile = 'app.js';

let html = fs.readFileSync(indexFile, 'utf8');

// 1. Add Sidebar to HTML
const sidebarHTML = `
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo-icon-wrapper">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
      </div>
      <div>
        <div class="sb-title">VayuDrishti</div>
        <div class="sb-subtitle">AI-Powered Cyclone Intelligence</div>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <a href="#dashboard" class="nav-item active" data-page="dashboard">
        <span class="nav-icon">⊞</span> Dashboard
      </a>
      <a href="#tracking" class="nav-item" data-page="tracking">
        <span class="nav-icon">⌖</span> Tracking
      </a>
      <a href="#satellite" class="nav-item" data-page="satellite">
        <span class="nav-icon">🛰</span> Satellite Intelligence
      </a>
      <a href="#ri" class="nav-item" data-page="ri">
        <span class="nav-icon">⚡</span> Rapid Intensification
      </a>
      <a href="#forecast" class="nav-item" data-page="forecast">
        <span class="nav-icon">📈</span> Forecast
      </a>
      <a href="#risk" class="nav-item" data-page="risk">
        <span class="nav-icon">🛡</span> Impact & Risk
      </a>
      <a href="#simulation" class="nav-item" data-page="simulation">
        <span class="nav-icon">⚙</span> Simulation
      </a>
      <a href="#advisory" class="nav-item" data-page="advisory">
        <span class="nav-icon">📄</span> Advisory
      </a>
    </nav>

    <div class="sidebar-bottom">
      <div class="sb-sys-status">
        <div class="sb-sys-title">System Status</div>
        <div class="sb-sys-row"><span>Satellite</span> <span class="dot green"></span></div>
        <div class="sb-sys-row"><span>Meteorological</span> <span class="dot green"></span></div>
        <div class="sb-sys-row"><span>Ocean</span> <span class="dot green"></span></div>
        <div class="sb-sys-row"><span>AI Model</span> <span class="dot green"></span></div>
        <div class="sb-sys-row"><span>Forecast</span> <span class="dot green"></span></div>
      </div>
      <div class="sb-sim-badge">SIMULATION MODE</div>
    </div>
  </aside>
  <div class="main-content">
`;

// Insert after <body>
html = html.replace('<body>', '<body>\n<div class="app-container">\n' + sidebarHTML);

// Close wrappers at the end
html = html.replace('</body>', '</div>\n</div>\n</body>');

// We need to wrap the existing dashboard inside <div id="page-dashboard" class="page-view active">
// The existing dashboard is basically the `<header>`, `<main>`, `<footer>` tags.
// Let's create pages.
const newPagesHTML = `
    <!-- Tracking Page -->
    <section id="page-tracking" class="page-view">
      <div class="page-header">
        <h2>CYCLONE TRACKING WORKSPACE</h2>
        <p>Real-time location, movement, and hazard extent.</p>
      </div>
      <div class="tracking-grid">
        <div class="tracking-col" id="tracking-map-container" style="min-height: 600px;">
           <!-- Map will be moved here when tracking page is active -->
        </div>
        <div class="tracking-col intel-panel">
           <div class="tracking-section">
             <h3>CURRENT POSITION</h3>
             <div class="t-grid">
                <div><label>Latitude</label><div id="trk-lat">--</div></div>
                <div><label>Longitude</label><div id="trk-lng">--</div></div>
                <div><label>Intensity</label><div id="trk-int" class="text-red">--</div></div>
                <div><label>Pressure</label><div id="trk-pres">--</div></div>
                <div><label>Direction</label><div id="trk-dir">--</div></div>
                <div><label>Speed</label><div id="trk-spd">--</div></div>
                <div style="grid-column: span 2"><label>Timestamp</label><div id="trk-time">--</div></div>
             </div>
           </div>
           
           <div class="tracking-section" style="margin-top:20px;">
             <h3>WIND HAZARD EXTENT</h3>
             <div class="t-grid">
                <div><label>34 kt Radius</label><div id="trk-r34">--</div></div>
                <div><label>50 kt Radius</label><div id="trk-r50">--</div></div>
                <div><label>64 kt Radius</label><div id="trk-r64">--</div></div>
             </div>
           </div>
           
           <div class="tracking-section" style="margin-top:20px;">
             <h3>LAND / COAST INTERACTION</h3>
             <div class="t-grid">
                <div style="grid-column: span 2"><label>Distance to Coast</label><div id="trk-coast-dist" class="text-red">--</div></div>
                <div style="grid-column: span 2"><label>Estimated Landfall</label><div id="trk-landfall">--</div></div>
             </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Satellite Intelligence Page -->
    <section id="page-satellite" class="page-view">
      <div class="page-header">
        <h2>MULTI-SOURCE SATELLITE INTELLIGENCE</h2>
        <p>Representative Satellite Data - SIMULATION MODE</p>
      </div>
      <!-- We will move the existing sat-obs-panel here -->
      <div class="sat-obs-grid" style="padding: 2rem;">
        <div id="sat-obs-container" style="max-width: 800px; margin-bottom: 2rem;"></div>
        
        <h3>ADDITIONAL OBSERVATIONS</h3>
        <div class="t-grid">
           <div class="pa-item">
             <div><strong>Ocean Heat Indicators</strong><div class="pa-desc">SST currently highly favorable (29.4°C)</div></div>
           </div>
           <div class="pa-item">
             <div><strong>Historical Track Information</strong><div class="pa-desc">Matched closely with historical cyclone Amphan track</div></div>
           </div>
        </div>
      </div>
    </section>

    <!-- Rapid Intensification Page -->
    <section id="page-ri" class="page-view">
      <div class="page-header">
        <h2>RAPID INTENSIFICATION INTELLIGENCE</h2>
        <p>Decision support for inner-core structural changes.</p>
      </div>
      <div class="ri-grid">
         <div id="ri-left-col">
            <!-- RI panels moved here -->
         </div>
         <div id="ri-right-col" class="tracking-col intel-panel">
            <div class="intel-section-title">WHY DID RI RISK CHANGE?</div>
            <div class="ri-why-box">
               <div id="ri-why-reasons"></div>
            </div>
            
            <div class="intel-section-title" style="margin-top: 20px;">RAPID-CHANGE INTELLIGENCE</div>
            <div class="ri-why-box">
               <div class="ri-why-item"><strong>Structural Change:</strong> Significant</div>
               <div class="ri-why-item"><strong>Cloud-top evolution:</strong> Increasing organization</div>
               <div class="ri-why-item"><strong>Intensity Trend:</strong> Rapidly Increasing</div>
               <div class="ri-why-item"><strong>Last Observation:</strong> 15 min ago</div>
               <div class="ri-why-item text-red" style="margin-top:10px;"><strong>Alert:</strong> Significant inner-core evolution detected.</div>
            </div>
         </div>
      </div>
    </section>

    <!-- Forecast Page -->
    <section id="page-forecast" class="page-view">
      <div class="page-header">
        <h2>PROBABILISTIC CYCLONE FORECAST</h2>
        <p>Forecast uncertainty increases with projection time. Not an official forecast.</p>
      </div>
      <div class="fc-grid">
         <div id="fc-map-container" class="tracking-col" style="min-height: 600px;"></div>
         <div class="tracking-col intel-panel">
            <table class="fc-table">
               <thead><tr><th>TIME</th><th>LOCATION</th><th>INTENSITY</th><th>PRESSURE</th><th>CONFIDENCE</th></tr></thead>
               <tbody id="fc-table-body"></tbody>
            </table>
            
            <div style="margin-top: 2rem;">
               <div class="intel-section-title">FORECAST PROJECTION</div>
               <p style="color: var(--text-muted); font-size: 0.8rem;">Forecast uncertainty increases with projection time.</p>
               <!-- Move existing fcBarChart container here -->
               <div id="fc-chart-container"></div>
            </div>
         </div>
      </div>
    </section>

    <!-- Impact & Risk Page -->
    <section id="page-risk" class="page-view">
      <div class="page-header">
        <h2>IMPACT & RISK ASSESSMENT</h2>
        <p>Converting meteorological information into decision-support intelligence.</p>
      </div>
      <div class="risk-grid">
         <div class="tracking-col intel-panel" style="padding: 1.5rem;">
            <h3>DISTRICT-LEVEL RISK</h3>
            <table class="fc-table" style="width:100%">
               <thead><tr><th>DISTRICT</th><th>WIND</th><th>RAIN</th><th>EXPOSURE</th><th>RISK</th></tr></thead>
               <tbody id="risk-table-body">
                  <tr><td>Puri</td><td class="text-red">Critical</td><td class="text-red">High</td><td>High</td><td class="text-red">Critical</td></tr>
                  <tr><td>Ganjam</td><td class="text-yellow">High</td><td class="text-yellow">High</td><td>Moderate</td><td class="text-yellow">High</td></tr>
                  <tr><td>Jagatsinghpur</td><td class="text-yellow">High</td><td class="text-red">High</td><td>High</td><td class="text-yellow">High</td></tr>
                  <tr><td>Khurda</td><td class="text-yellow">Moderate</td><td class="text-yellow">Moderate</td><td>High</td><td class="text-yellow">Moderate</td></tr>
               </tbody>
            </table>
         </div>
         <div class="tracking-col intel-panel" style="padding: 1.5rem;">
            <h3>PRIORITY ACTION AREAS</h3>
            <div class="pa-list">
               <div class="pa-item">
                  <span class="pa-pri high">P1</span>
                  <div>
                     <strong>Coastal evacuation</strong>
                     <div class="pa-desc">Evacuate low-lying zones within 5km</div>
                  </div>
                  <span class="pa-status text-red">ACTIVE</span>
               </div>
               <div class="pa-item">
                  <span class="pa-pri high">P1</span>
                  <div>
                     <strong>Fisheries</strong>
                     <div class="pa-desc">Total suspension of operations</div>
                  </div>
                  <span class="pa-status text-red">ACTIVE</span>
               </div>
               <div class="pa-item">
                  <span class="pa-pri med">P2</span>
                  <div>
                     <strong>Ports</strong>
                     <div class="pa-desc">Hoist warning signals, halt loading</div>
                  </div>
                  <span class="pa-status text-yellow">STANDBY</span>
               </div>
               <div class="pa-item">
                  <span class="pa-pri med">P2</span>
                  <div>
                     <strong>Power infrastructure</strong>
                     <div class="pa-desc">Pre-position repair teams</div>
                  </div>
                  <span class="pa-status text-yellow">STANDBY</span>
               </div>
               <div class="pa-item">
                  <span class="pa-pri med">P2</span>
                  <div>
                     <strong>Hospitals</strong>
                     <div class="pa-desc">Ensure backup generators fueled</div>
                  </div>
                  <span class="pa-status text-yellow">STANDBY</span>
               </div>
            </div>
         </div>
      </div>
    </section>

    <!-- Simulation Page -->
    <section id="page-simulation" class="page-view">
      <div class="page-header">
        <h2>SCENARIO SIMULATION</h2>
        <p>Scenario changes propagate across the intelligence pipeline.</p>
      </div>
      <div class="sim-page-content tracking-col intel-panel" style="margin: 2rem;" id="sim-page-container">
         <div class="sb-sim-badge" style="width: fit-content; margin-bottom: 20px;">SIMULATION MODE</div>
         <p style="color: var(--text-muted);">Select a scenario below to populate representative data across the platform.</p>
         <!-- The header controls (scenario selector, start demo) will be moved here -->
      </div>
    </section>

    <!-- Advisory Page -->
    <section id="page-advisory" class="page-view">
      <div class="page-header">
        <h2>ADVISORY REPORT</h2>
        <p>Generate professional SDMA / NDMA advisory preview PDF.</p>
      </div>
      <div class="adv-page-content tracking-col intel-panel" style="margin: 2rem;" id="adv-page-container">
         <!-- The SDMA panel will be moved here -->
      </div>
    </section>
`;

// Insert the pages into a pages-container
html = html.replace('<header class="header">', '<div class="pages-container">\n<div id="page-dashboard" class="page-view active">\n<header class="header">');
html = html.replace('</footer>', '</footer>\n</div>\n' + newPagesHTML + '\n</div>');

// Add "WHY DID THE RISK CHANGE?" in the dashboard
// Find the `</aside>` in dashboard-shell
html = html.replace('</aside>', `
          <div class="intel-section-title" style="margin-top: 0.65rem;">WHY DID THE RISK CHANGE?</div>
          <div class="ri-why-box">
             <div class="ri-why-item"><span class="text-red">↑</span> Cloud structure organization increasing</div>
             <div class="ri-why-item"><span class="text-green">↓</span> Vertical wind shear is low</div>
             <div class="ri-why-item"><span class="text-red">↑</span> Ocean heat availability remains high</div>
             <div class="ri-why-item"><span class="text-yellow">→</span> Cyclone moving closer to coast</div>
          </div>
</aside>`);

fs.writeFileSync(indexFile, html);

// 2. CSS Updates
const newCSS = `
/* Application Layout */
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #020617;
}

.sidebar {
  width: 260px;
  background-color: #0f172a;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 1000;
}

.sidebar-brand {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #1e293b;
}

.logo-icon-wrapper {
  width: 32px;
  height: 32px;
  color: var(--accent-cyan);
}

.sb-title {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
}
.sb-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 2px;
}

.sidebar-nav {
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: rgba(255,255,255,0.05);
  color: #fff;
}

.nav-item.active {
  background-color: rgba(0, 242, 254, 0.1);
  color: var(--accent-cyan);
  border-left-color: var(--accent-cyan);
}

.nav-icon {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.sidebar-bottom {
  padding: 1.5rem;
  border-top: 1px solid #1e293b;
}

.sb-sys-title {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.sb-sys-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot.green { background-color: var(--alert-green); box-shadow: 0 0 5px var(--alert-green); }

.sb-sim-badge {
  margin-top: 1rem;
  background-color: rgba(244, 63, 94, 0.15);
  color: var(--alert-red);
  border: 1px solid rgba(244, 63, 94, 0.3);
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.pages-container {
  flex: 1;
  overflow-y: auto;
  position: relative;
  background: #020617;
}

.page-view {
  display: none;
  height: 100%;
  padding: 0;
}

.page-view.active {
  display: flex;
  flex-direction: column;
}

/* Page specific layouts */
.page-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #1e293b;
  background: #0f172a;
}
.page-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0 0 0.25rem 0;
}
.page-header p {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0;
}

.tracking-grid, .fc-grid, .ri-grid, .risk-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.5rem;
  padding: 1.5rem;
  flex: 1;
  min-height: 0;
}
@media(max-width: 1024px) {
  .tracking-grid, .fc-grid, .ri-grid, .risk-grid { grid-template-columns: 1fr; }
}

.tracking-col {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.intel-panel {
  padding: 1.5rem;
}

.tracking-section h3 {
  font-size: 0.8rem;
  color: var(--accent-cyan);
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.t-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.t-grid label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
}
.t-grid div {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.fc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.fc-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.05);
  color: var(--text-muted);
  font-weight: 600;
  border-bottom: 1px solid #1e293b;
}
.fc-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #1e293b;
}

/* Fix header layout now that it's inside main-content */
.header {
  border-bottom: 1px solid #1e293b;
  border-radius: 0;
  margin-bottom: 0;
}

.ri-why-box {
  background: rgba(244, 63, 94, 0.05);
  border: 1px solid rgba(244, 63, 94, 0.2);
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
}
.ri-why-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

/* Action Items */
.pa-list {
  display: flex;
  flex-direction: column;
}
.pa-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}
.pa-pri {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  height: fit-content;
}
.pa-pri.high { background: rgba(244,63,94,0.2); color: #f43f5e; }
.pa-pri.med { background: rgba(251,191,36,0.2); color: #fbbf24; }
.pa-desc { color: var(--text-muted); font-size: 0.8rem; margin-top: 4px; font-weight: normal; }
.pa-status { margin-left: auto; font-size: 0.75rem; font-weight: 600; }

`;
fs.appendFileSync(styleFile, newCSS);

// 3. JS Updates for Routing and Component Moving
const newJS = `
// ==========================================================================
// SPA ROUTING & LAYOUT REFACTOR
// ==========================================================================

let activePage = 'dashboard';

function setupRouting() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = item.getAttribute('data-page');
      switchPage(pageId);
    });
  });
  
  // Initial page layout moves
  moveComponentsForInitialSetup();
}

function switchPage(pageId) {
  activePage = pageId;
  
  // Update Nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(\`.nav-item[data-page="\${pageId}"]\`)?.classList.add('active');
  
  // Update Pages
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + pageId)?.classList.add('active');
  
  // Handle Map Reparenting
  const mapContainer = document.getElementById('cycloneMap');
  const mapViewport = document.querySelector('.map-viewport'); // Original dashboard location
  const trackingMapContainer = document.getElementById('tracking-map-container');
  const forecastMapContainer = document.getElementById('fc-map-container');
  
  if (pageId === 'tracking') {
    if(trackingMapContainer && mapContainer) trackingMapContainer.appendChild(mapContainer);
  } else if (pageId === 'forecast') {
    if(forecastMapContainer && mapContainer) forecastMapContainer.appendChild(mapContainer);
  } else if (pageId === 'dashboard') {
    if(mapViewport && mapContainer) mapViewport.prepend(mapContainer);
  }
  
  if (mapInstance && (pageId === 'dashboard' || pageId === 'tracking' || pageId === 'forecast')) {
    setTimeout(() => mapInstance.invalidateSize(), 50);
  }
  
  // Populate specific page data
  if(pageId === 'tracking') populateTrackingPage();
  if(pageId === 'forecast') populateForecastPage();
  if(pageId === 'ri') populateRIPage();
}

function moveComponentsForInitialSetup() {
  // Move Simulation controls
  const controls = document.querySelector('.header-controls');
  const simContainer = document.getElementById('sim-page-container');
  if(controls && simContainer) {
    controls.style.position = 'relative';
    controls.style.background = 'transparent';
    controls.style.border = 'none';
    simContainer.appendChild(controls);
  }
  
  // Move Advisory Panel
  const sdmaPanel = document.getElementById('sdmaPanel');
  const advContainer = document.getElementById('adv-page-container');
  if(sdmaPanel && advContainer) advContainer.appendChild(sdmaPanel);
  
  // Move Satellite Panel
  const satPanel = document.querySelector('.sat-obs-panel');
  const satContainer = document.getElementById('sat-obs-container');
  if(satPanel && satContainer) satContainer.appendChild(satPanel);
  
  // Move RI Panels
  const pgPredictor = document.getElementById('pgPredictorPanel');
  const innerCore = document.getElementById('innercorePanel');
  const rapidAlert = document.querySelector('.rapid-alert-box');
  const riLeft = document.getElementById('ri-left-col');
  if(riLeft) {
     if(rapidAlert) { rapidAlert.style.marginBottom = '20px'; riLeft.appendChild(rapidAlert); }
     if(pgPredictor) { pgPredictor.style.marginBottom = '20px'; riLeft.appendChild(pgPredictor); }
     if(innerCore) riLeft.appendChild(innerCore);
  }
  
  // Move forecast chart
  const fcChartWrap = document.querySelector('.mini-chart-wrap');
  const fcChartContainer = document.getElementById('fc-chart-container');
  if(fcChartWrap && fcChartContainer) fcChartContainer.appendChild(fcChartWrap);
}

function populateTrackingPage() {
  const scenario = SCENARIOS[currentScenarioKey];
  const obs = window.cycloneData?.observations?.[currentObsIndex] || { windKmh: 121, pressureHpa: 972 };
  const pt = scenario.forecastTrack[0] || {};
  
  document.getElementById('trk-lat').textContent = pt.lat + '°N';
  document.getElementById('trk-lng').textContent = pt.lng + '°E';
  document.getElementById('trk-int').textContent = obs.windKmh + ' km/h';
  document.getElementById('trk-pres').textContent = obs.pressureHpa + ' hPa';
  document.getElementById('trk-dir').textContent = document.getElementById('compassLabel')?.textContent || 'NNW';
  document.getElementById('trk-spd').textContent = '15 km/h';
  
  const timeLabels = ['T-60', 'T-45', 'T-30', 'T-15', 'T+0 (Now)'];
  document.getElementById('trk-time').textContent = timeLabels[currentObsIndex] || 'Now';
  
  const kts = Math.round(obs.windKmh / 1.852);
  const factor = Math.max(0.65, Math.min(1.35, kts / 65));
  document.getElementById('trk-r34').textContent = Math.round(180 * factor) + ' km';
  document.getElementById('trk-r50').textContent = Math.round(95 * factor) + ' km';
  document.getElementById('trk-r64').textContent = Math.round(55 * factor) + ' km';
  
  const dist = pt.dist || 85;
  document.getElementById('trk-coast-dist').textContent = dist + ' km';
  document.getElementById('trk-landfall').textContent = scenario.landfallEta || 'N/A';
}

function populateForecastPage() {
  const scenario = SCENARIOS[currentScenarioKey];
  const tbody = document.getElementById('fc-table-body');
  if(tbody) {
     tbody.innerHTML = '';
     PROBABILISTIC_FORECAST_POINTS.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td>T+\${p.hour}h</td>
          <td>\${p.lat}°N, \${p.lng}°E</td>
          <td>\${p.windKmh} km/h</td>
          <td>\${p.hour === 0 ? 958 : (958 + p.hour/2)} hPa</td>
          <td class="text-\${p.confidence > 80 ? 'green' : (p.confidence > 60 ? 'yellow' : 'red')}">\${p.confidence}%</td>
        \`;
        tbody.appendChild(tr);
     });
  }
}

function populateRIPage() {
   const reasons = document.getElementById('ri-why-reasons');
   if(!reasons) return;
   
   const envData = window.cycloneData?.environment || { oceanHeatContent: 82, windShear: 9 };
   reasons.innerHTML = \`
      <div class="ri-why-item">
         <span class="text-red">↑</span> <strong>Cloud structure:</strong> Increasing symmetry and CDO cooling (-84.2°C)
      </div>
      <div class="ri-why-item">
         <span class="text-red">↓</span> <strong>Vertical wind shear:</strong> Very low (\${envData.windShear} kt) allowing vertical stacking
      </div>
      <div class="ri-why-item">
         <span class="text-red">↑</span> <strong>Ocean heat availability:</strong> High (\${envData.oceanHeatContent} kJ/cm²) fueling convection
      </div>
      <div class="ri-why-item">
         <span class="text-yellow">→</span> <strong>Coastal proximity:</strong> Approaching shallow coastal waters
      </div>
   \`;
}

// Hook into existing functions to update page data when state changes
const _origLoadScenario = loadScenario;
loadScenario = function(key) {
   _origLoadScenario(key);
   if(activePage === 'tracking') populateTrackingPage();
   if(activePage === 'forecast') populateForecastPage();
   if(activePage === 'ri') populateRIPage();
};

const _origSelectObs = selectObservation;
selectObservation = function(stepIndex) {
   _origSelectObs(stepIndex);
   if(activePage === 'tracking') populateTrackingPage();
   if(activePage === 'ri') populateRIPage();
};

// Call setupRouting slightly after init
setTimeout(setupRouting, 500);
`;

fs.appendFileSync(appFile, newJS);

console.log('Successfully refactored layout!');
