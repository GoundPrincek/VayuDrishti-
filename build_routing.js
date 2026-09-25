const fs = require('fs');
const path = require('path');

const routingCode = `
// ==========================================================================
// SPA ROUTING — NEW TOP-NAV TAB SYSTEM + DASHBOARD POPULATION
// ==========================================================================

let activePage = 'dashboard';

function setupRouting() {
  // Wire up new top-bar nav-tab buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.getAttribute('data-page');
      if (pageId) switchPage(pageId);
    });
  });

  // Wire up in-dashboard "View → " link buttons
  document.querySelectorAll('.dash-view-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.getAttribute('data-page');
      if (pageId) switchPage(pageId);
    });
  });

  // Also keep old nav-item support if any stray elements remain
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const pageId = item.getAttribute('data-page');
      if (pageId) switchPage(pageId);
    });
  });

  // Populate dashboard at startup
  populateDashboard();
}

function switchPage(pageId) {
  activePage = pageId;

  // Update nav-tab highlights
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  document.querySelector(\`.nav-tab[data-page="\${pageId}"]\`)?.classList.add('active');

  // Update nav-item highlights (legacy sidebar, if any)
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(\`.nav-item[data-page="\${pageId}"]\`)?.classList.add('active');

  // Show correct page
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');

  // Handle Map Reparenting (Leaflet can only render in one container at a time)
  const mapEl = document.getElementById('cycloneMap');
  const dashMapWrapper = document.querySelector('.dash-map-wrapper');
  const trackingMapContainer = document.getElementById('tracking-map-container');
  const forecastMapContainer = document.getElementById('fc-map-container');

  if (pageId === 'dashboard' && dashMapWrapper && mapEl) {
    dashMapWrapper.insertBefore(mapEl, dashMapWrapper.firstChild);
  } else if (pageId === 'tracking' && trackingMapContainer && mapEl) {
    trackingMapContainer.appendChild(mapEl);
  } else if (pageId === 'forecast' && forecastMapContainer && mapEl) {
    forecastMapContainer.appendChild(mapEl);
  }

  if (mapInstance && (pageId === 'dashboard' || pageId === 'tracking' || pageId === 'forecast')) {
    setTimeout(() => mapInstance.invalidateSize(), 60);
  }

  // Populate data for the target page
  if (pageId === 'dashboard') populateDashboard();
  if (pageId === 'tracking') populateTrackingPage();
  if (pageId === 'forecast') populateForecastPage();
  if (pageId === 'ri') populateRIPage();
}

// ----- DASHBOARD POPULATION -----

function populateDashboard() {
  const scenarioData = (typeof CYCLONE_SCENARIOS !== 'undefined') ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const scenario = SCENARIOS[currentScenarioKey];
  if (!scenario) return;

  const obs = (scenarioData?.observations) ? scenarioData.observations[4] : { windKmh: 121, pressureHpa: 972 };
  const pt = scenario.forecastTrack[0] || {};
  const rc = scenarioData?.rapidChange || {};
  const riWatch = scenarioData?.riWatch || {};
  const exRisk = scenarioData?.explainableRisk || {};
  const fc = scenarioData?.forecastCheckpoints || [];
  const actions = scenarioData?.priorityActions || [];

  // --- Section 1: Status Strip ---
  const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  
  const cycloneName = scenarioData ? \`\${scenarioData.category.split(' ').slice(0,2).join(' ')} '\${scenarioData.name}'\` : scenario.name;
  setT('dashCycloneName', cycloneName);
  setT('dashPosition', \`\${pt.lat}°N, \${pt.lng}°E\`);
  setT('dashIntensity', scenarioData?.category || scenario.category);
  
  const windKts = obs.windKmh ? Math.round(obs.windKmh / 1.852) : (pt.kts || 95);
  const windKmh = obs.windKmh || Math.round(windKts * 1.852);
  const windEl = document.getElementById('dashMaxWind');
  if (windEl) windEl.innerHTML = \`\${windKts} kt <span class="status-cell-sub">(\${windKmh} km/h)</span>\`;
  
  setT('dashPressure', (obs.pressureHpa || pt.hpa || 958) + ' hPa');
  
  const motion = scenarioData?.currentIntensity;
  setT('dashMovement', motion ? \`\${motion.motionHeading.split('(')[1]?.replace(')','')} • \${motion.motionSpeed}\` : 'NNW • 15 km/h');
  
  const riskLevel = scenarioData?.riskLevel || 'HIGH';
  const riskEl = document.getElementById('dashRiskBadge');
  if (riskEl) { riskEl.textContent = riskLevel; riskEl.className = 'status-risk-pill ' + (riskLevel === 'HIGH' ? 'high' : 'mod'); }

  // --- Section 3: Rapid Change ---
  setT('dashRcStructural', (rc.changeSeverity || 'SIGNIFICANT').toUpperCase());
  setT('dashRcTrend', (rc.intensityTrend || 'RAPIDLY INCREASING').split('(')[0].trim().toUpperCase());
  setT('dashRcObs', scenarioData ? (scenarioData.observations[4]?.label || 'NOW') + ' Observation' : '15 min ago');
  
  const riProb = typeof CYCLONE_SCENARIOS !== 'undefined' ? (CYCLONE_SCENARIOS[currentScenarioKey]?.riWatch?.status || 'HIGH') : 'HIGH';
  setT('dashRcWatchState', riWatch.verdictText ? riWatch.verdictText.split('(')[0].trim() : '82% — HIGH');
  
  const riPill = document.getElementById('dashRiWatchPill');
  if (riPill) riPill.textContent = 'RI WATCH: ' + (riWatch.status || 'HIGH');

  // --- Section 4: 72H Summary table ---
  const tbody = document.getElementById('dashFcCheckpoints');
  if (tbody && fc.length > 0) {
    tbody.innerHTML = '';
    const steps = [fc[0], fc[1], fc[2], fc[3], fc[4]].filter(Boolean);
    steps.forEach(step => {
      const isLandfall = step.isLandfall;
      const conf = step.confidence || 'High';
      const confClass = conf === 'High' ? 'text-green' : (conf === 'Moderate' ? 'text-yellow' : 'text-muted');
      const tr = document.createElement('tr');
      tr.innerHTML = \`
        <td><strong>\${step.hour}</strong>\${isLandfall ? ' <span class="tag-lf">LF</span>' : ''}</td>
        <td>\${step.location}</td>
        <td class="text-red">\${step.intensityKts} kt (\${step.intensityKmh} km/h)</td>
        <td class="\${confClass}">\${conf}</td>
      \`;
      tbody.appendChild(tr);
    });
  }

  // --- Section 5: Current Risk factors ---
  const motion2 = scenarioData?.currentIntensity || {};
  const setRfState = (id, val, cls) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = val; el.className = 'rf-state ' + cls; }
  };
  setRfState('dashRfWind', windKts >= 64 ? 'HIGH' : 'MODERATE', windKts >= 64 ? 'text-red' : 'text-yellow');
  setRfState('dashRfRain', 'HIGH', 'text-red');
  setRfState('dashRfCoastal', riskLevel, riskLevel === 'HIGH' ? 'text-red' : 'text-yellow');
  setRfState('dashRfProximity', (motion2.distanceToCoastKm || 85) <= 100 ? 'CRITICAL' : 'HIGH', 'text-red');
  
  const coastKm = motion2.distanceToCoastKm || 85;
  setT('dashRfWindSub', windKts + ' kt Inner Core');
  setT('dashRfRainSub', '> 200 mm Squalls');
  setT('dashRfCoastalSub', fc.find(f => f.isLandfall)?.location?.split(',')[1]?.trim() || 'Puri / Paradip Coast');
  setT('dashRfProximitySub', coastKm + ' km to Coast');

  const riskLevelEl = document.getElementById('dashRiskLevelPill');
  if (riskLevelEl) { riskLevelEl.textContent = 'OVERALL: ' + riskLevel; riskLevelEl.className = 'status-risk-pill ' + (riskLevel === 'HIGH' ? 'high' : 'mod'); }

  // --- WHY DID THE RISK CHANGE ---
  const whyContainer = document.getElementById('dashWhyRiskItems');
  if (whyContainer && exRisk.factors) {
    whyContainer.innerHTML = exRisk.factors.map(f => \`
      <div class="why-box-row">
        <span class="why-icon \${f.startsWith('↑') ? 'text-red' : (f.startsWith('↓') ? 'text-green' : 'text-yellow')}">\${f[0]}</span>
        \${f.slice(2)}
      </div>
    \`).join('');
  }

  // --- Section 6: Priority Attention ---
  const priList = document.getElementById('dashPriorityList');
  if (priList && actions.length > 0) {
    const topItems = actions.slice(0, 4);
    priList.innerHTML = topItems.map(a => {
      const isCritical = a.priority === 'CRITICAL';
      const isHigh = a.priority === 'HIGH';
      const pillClass = isCritical || isHigh ? 'high' : 'mod';
      const markerClass = isCritical || isHigh ? 'high' : 'mod';
      return \`
        <div class="dash-pri-row">
          <div class="pri-left">
            <span class="pri-marker \${markerClass}"></span>
            <div>
              <strong>\${a.category}</strong>
              <div class="pri-sub">\${a.action.substring(0, 60)}\${a.action.length > 60 ? '…' : ''}</div>
            </div>
          </div>
          <span class="status-risk-pill \${pillClass}">\${a.priority}</span>
        </div>
      \`;
    }).join('');
  }
}

// ----- TRACKING PAGE -----
function populateTrackingPage() {
  const scenario = SCENARIOS[currentScenarioKey];
  const scenarioData = (typeof CYCLONE_SCENARIOS !== 'undefined') ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const obs = scenarioData?.observations?.[currentObsIndex] || { windKmh: 121, pressureHpa: 972 };
  const pt = scenario.forecastTrack[0] || {};
  const motion = scenarioData?.currentIntensity || {};

  const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setT('trk-lat', (pt.lat || motion.distanceToCoastKm) + '°N');
  setT('trk-lng', pt.lng + '°E');
  setT('trk-int', (obs.windKmh || 121) + ' km/h');
  setT('trk-pres', (obs.pressureHpa || pt.hpa || 972) + ' hPa');
  setT('trk-dir', motion.motionHeading || document.getElementById('compassLabel')?.textContent || 'NNW');
  setT('trk-spd', motion.motionSpeed || '15 km/h');
  const timeLabels = ['T-60', 'T-45', 'T-30', 'T-15', 'T+0 (Now)'];
  setT('trk-time', timeLabels[currentObsIndex] || 'Now');

  const kts = Math.round((obs.windKmh || 121) / 1.852);
  const wr = scenarioData?.windRadii || {};
  setT('trk-r34', (wr.r34_km || 180) + ' km');
  setT('trk-r50', (wr.r50_km || 95) + ' km');
  setT('trk-r64', (wr.r64_km || 55) + ' km');
  setT('trk-coast-dist', (motion.distanceToCoastKm || pt.dist || 85) + ' km');
  setT('trk-landfall', scenario.landfallEta || 'N/A');
}

// ----- FORECAST PAGE -----
function populateForecastPage() {
  const scenarioData = (typeof CYCLONE_SCENARIOS !== 'undefined') ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const tbody = document.getElementById('fc-table-body');
  if (tbody) {
    tbody.innerHTML = '';
    const pts = scenarioData?.forecastCheckpoints || PROBABILISTIC_FORECAST_POINTS;
    pts.forEach(p => {
      const tr = document.createElement('tr');
      if (p.hour !== undefined) {
        // PROBABILISTIC_FORECAST_POINTS style
        tr.innerHTML = \`
          <td>T+\${p.hour}h</td>
          <td>\${p.lat}°N, \${p.lng}°E</td>
          <td>\${p.windKmh} km/h</td>
          <td>\${p.hour === 0 ? 958 : (958 + p.hour / 2)} hPa</td>
          <td class="text-\${p.confidence > 80 ? 'green' : (p.confidence > 60 ? 'yellow' : 'red')}">\${p.confidence}%</td>
        \`;
      } else {
        // CYCLONE_SCENARIOS forecastCheckpoints style
        const confClass = p.confidence === 'High' ? 'text-green' : (p.confidence === 'Moderate' ? 'text-yellow' : 'text-red');
        tr.innerHTML = \`
          <td>T+\${p.hour}</td>
          <td>\${p.location}</td>
          <td>\${p.intensityKmh} km/h</td>
          <td>-</td>
          <td class="\${confClass}">\${p.confidence}</td>
        \`;
      }
      tbody.appendChild(tr);
    });
  }
  // Refresh landfall sectors
  const lsEl = document.getElementById('landfallSectors');
  if (lsEl) {
    const scenario = SCENARIOS[currentScenarioKey];
    lsEl.innerHTML = (scenario.landfallSectors || []).map(s => \`
      <div class="landfall-row">
        <span style="color:\${s.color}; font-weight:700;">\${s.name}</span>
        <div class="sector-bar-track"><div class="sector-bar-fill" style="width:\${s.prob}%; background:\${s.color};"></div></div>
        <span class="sector-val">\${s.prob}%</span>
      </div>
    \`).join('');
  }
}

// ----- RI PAGE -----
function populateRIPage() {
  const scenarioData = (typeof CYCLONE_SCENARIOS !== 'undefined') ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const exRisk = scenarioData?.explainableRisk || {};

  const reasons = document.getElementById('ri-why-reasons');
  if (reasons && exRisk.factors) {
    reasons.innerHTML = exRisk.factors.map(f => \`
      <div class="ri-why-item">
        <span class="\${f.startsWith('↑') ? 'text-red' : (f.startsWith('↓') ? 'text-green' : 'text-yellow')}">\${f[0]}</span>
        \${f.slice(2)}
      </div>
    \`).join('');
  }

  // Update RI predictor values
  const rc = scenarioData?.rapidChange || {};
  const riw = scenarioData?.riWatch || {};
  const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setT('pgValTrend', rc.intensityTrend ? rc.intensityTrend.match(/[+-]?\d+ km\/h/)?.[0] || rc.intensityTrend : '+39 km/h');
  setT('pgValOhc', riw.ohc || '82 kJ/cm²');
  setT('pgValShear', riw.windShear || '9 kt');
  setT('pgValCoast', riw.distanceToCoast || '85 km');
  setT('pgValWind', (scenarioData?.currentIntensity?.kmh || 121) + ' km/h');
}

// ----- HOOK INTO SCENARIO SELECTOR & LOAD -----
const _origLoadScenario = loadScenario;
loadScenario = function(key) {
  _origLoadScenario(key);
  // Also sync window.cycloneData for cross-page consistency
  if (typeof CYCLONE_SCENARIOS !== 'undefined' && CYCLONE_SCENARIOS[key]) {
    window.cycloneData = CYCLONE_SCENARIOS[key];
  }
  // Update all active page data
  if (activePage === 'dashboard') populateDashboard();
  if (activePage === 'tracking') populateTrackingPage();
  if (activePage === 'forecast') populateForecastPage();
  if (activePage === 'ri') populateRIPage();
};

const _origSelectObs = selectObservation;
selectObservation = function(stepIndex) {
  _origSelectObs(stepIndex);
  if (activePage === 'dashboard') populateDashboard();
  if (activePage === 'tracking') populateTrackingPage();
  if (activePage === 'ri') populateRIPage();
};

// Ensure cycloneData is wired up at startup
document.addEventListener('DOMContentLoaded', () => {
  if (typeof CYCLONE_SCENARIOS !== 'undefined' && CYCLONE_SCENARIOS[currentScenarioKey]) {
    window.cycloneData = CYCLONE_SCENARIOS[currentScenarioKey];
  }
});

// Start the routing system after a short delay to allow all DOM to settle
setTimeout(setupRouting, 500);
`;

const appJsPath = 'app.js';
let content = require('fs').readFileSync(appJsPath, 'utf8');
// Append the routing code at the very end
content = content.trimEnd() + '\n' + routingCode;
require('fs').writeFileSync(appJsPath, content, 'utf8');
console.log('Successfully appended routing code to app.js');
