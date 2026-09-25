const fs = require('fs');
const path = require('path');

// PATCH 1: Patch index.html to add missing element IDs back

let html = fs.readFileSync('index.html', 'utf8');

// Add map layer toggle buttons inside dash-map-wrapper (before the wind radii legend)
const toggleButtonsHtml = `
              <!-- Map Layer Toggles -->
              <div class="map-layer-controls">
                <button id="toggleConeBtn" class="toggle-chip active" title="Toggle 68% & 95% Uncertainty Cones">Cone</button>
                <button id="togglePastTrackBtn" class="toggle-chip active" title="Toggle Observed Past Track">Past Track</button>
                <button id="togglePointsBtn" class="toggle-chip active" title="Toggle Forecast Waypoints">Waypoints</button>
                <button id="toggleRadiiBtn" class="toggle-chip active" title="Toggle 34/50/64kt Wind Radii">Wind Radii</button>
                <button id="toggleEnsembleBtn" class="toggle-chip active" title="Toggle Ensemble Lines">Ensembles</button>
                <button id="toggleCoastBtn" class="toggle-chip active" title="Toggle Coastal Buffer">Coastal Buffer</button>
                <button id="toggleRiWatchBtn" class="toggle-chip active" title="Toggle RI Watch">RI Watch</button>
              </div>
`;

// Insert before the Wind Radii Legend div in the map wrapper
html = html.replace(
  '              <!-- Map Wind Radii Legend -->',
  toggleButtonsHtml + '\n              <!-- Map Wind Radii Legend -->'
);

// Add hidden elements that app.js depends on - put them in a hidden container at end of body
const hiddenElements = `
  <!-- Hidden compatibility elements for app.js selectors -->
  <div style="display:none;" aria-hidden="true">
    <span id="landfallEta"></span>
    <span id="stormStatusPill"></span>
    <span id="statusPulseDot"></span>
    <span id="cycloneStatusText"></span>
    <span id="stormName"></span>
    <span id="stormCategory"></span>
    <span id="compassNeedle"></span>
    <span id="compassLabel"></span>
    <!-- obs chart elements (used in simulation page) -->
    <svg style="position:absolute;width:0;height:0;overflow:hidden">
      <path id="obsWindLine" />
      <path id="obsWindArea" />
      <path id="obsPressureLine" />
      <g id="obsWindDots"></g>
      <line id="obsChartCursor" />
      <line id="fcCursor" />
      <g id="fcBars"></g>
      <g id="fcConfLine"></g>
      <g id="fcXLabels"></g>
    </svg>
    <span id="nearCoastRiCard"></span>
    <span id="coastDistance"></span>
    <span id="coastProgressBar"></span>
    <span id="riProminentBanner"></span>
    <span id="riBannerTitle"></span>
    <span id="riBannerSub"></span>
    <span id="riBannerIcon"></span>
    <span id="riCardTag"></span>
    <span id="riIntensityChange"></span>
    <span id="riIntensityTime"></span>
    <span id="riProbabilityVal"></span>
    <span id="riRiskBadge"></span>
    <span id="riRiskStatusText"></span>
    <span id="riCalcVerdict"></span>
    <span id="calcBadgeText"></span>
    <span id="calcNodeResult"></span>
    <span id="calcResultLabel"></span>
    <span id="calcValCoast"></span>
    <span id="calcValOhc"></span>
    <span id="calcValShear"></span>
    <span id="barCoast"></span>
    <span id="barOhc"></span>
    <span id="barShear"></span>
    <span id="tensorCoast"></span>
    <span id="tensorOhc"></span>
    <span id="tensorVws"></span>
    <span id="currentObsChange"></span>
    <span id="currentObsNote"></span>
    <span id="currentObsPressure"></span>
    <span id="currentObsTime"></span>
    <span id="currentObsWind"></span>
    <!-- flow pipeline nodes used in app.js -->
    <span id="flowNodeSat"></span>
    <span id="flowNodeFusion"></span>
    <span id="flowNodeCF"></span>
    <span id="flowNodeInnerCore"></span>
    <span id="flowNodePhysicsRI"></span>
    <span id="flowNodeRI"></span>
    <span id="flowNodeRIW"></span>
    <span id="flowNodeFC"></span>
    <span id="flowNodeRadii"></span>
    <span id="flowNodeClass"></span>
    <span id="flowNodeSubMin"></span>
    <span id="flowNodeSDMA"></span>
    <span id="flowStatusLabel"></span>
    <!-- advisory elements -->
    <span id="advCycloneStatus"></span>
    <span id="advIntensity"></span>
    <span id="advRiProb"></span>
    <span id="advCoastRisk"></span>
    <span id="advForecastWindow"></span>
    <span id="advCenterConf"></span>
    <span id="advLatestObs"></span>
    <span id="advLandfall"></span>
    <span id="advMonitoring"></span>
    <span id="hudWindSpeed"></span>
    <span id="hudCoords"></span>
    <span id="hudPressure"></span>
    <span id="cfPrevCoords"></span>
    <span id="cfCurrCoords"></span>
    <span id="cfConfBadge"></span>
    <span id="cfConfFill"></span>
    <span id="cfConfVal"></span>
    <span id="cfMoveDir"></span>
    <span id="cfDisplacement"></span>
    <span id="cfFixTime"></span>
    <span id="icState0"></span>
    <span id="icState1"></span>
    <span id="icState2"></span>
    <span id="icState3"></span>
    <span id="icState4"></span>
    <span id="innercoreChangeTag"></span>
    <span id="predOhc"></span>
    <span id="predOhcStatus"></span>
    <span id="predSst"></span>
    <span id="predSstStatus"></span>
    <span id="predShear"></span>
    <span id="predShearStatus"></span>
    <span id="predPress"></span>
    <span id="predPressStatus"></span>
    <span id="predCoast"></span>
    <span id="predCoastStatus"></span>
    <span id="predCombinedBox"></span>
    <span id="predCombinedVal"></span>
    <span id="classCatCurrent"></span>
    <span id="classWindCurrent"></span>
    <span id="classItem24"></span>
    <span id="classItem48"></span>
    <span id="classItem72"></span>
    <span id="classCat24"></span>
    <span id="classCat48"></span>
    <span id="classCat72"></span>
    <span id="classWind24"></span>
    <span id="classWind48"></span>
    <span id="classWind72"></span>
    <span id="fusionStatusTag"></span>
    <span id="fusionSrcInsat"></span>
    <span id="fusionSrcMicrowave"></span>
    <span id="fusionSrcOscat"></span>
    <span id="rapidAlertText" class="hidden-compat"></span>
    <span id="subminAlert"></span>
    <span id="subminCoastRisk"></span>
    <span id="subminNextObs"></span>
    <span id="subminHorizon"></span>
    <span id="landfallSectors"></span>
    <span id="landfallEta-2" style="display:none"></span>
    <span id="sdmaAlert" class="hidden-compat"></span>
    <span id="sdmaRisk" class="hidden-compat"></span>
    <span id="sdmaIntensification" class="hidden-compat"></span>
    <span id="sdmaCoastDist" class="hidden-compat"></span>
    <span id="sdmaWindow" class="hidden-compat"></span>
    <span id="sdmaMonitoring" class="hidden-compat"></span>
    <span id="chartHeaderText"></span>
  </div>
`;

html = html.replace('<!-- Leaflet JS -->', hiddenElements + '\n  <!-- Leaflet JS -->');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully patched index.html with missing element IDs');

// PATCH 2: Add styles for map layer controls positioning
const mapLayerCss = `
/* Map Layer Controls (toggle chips) in new dashboard */
.map-layer-controls {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  z-index: 1001;
}

.toggle-chip {
  background: rgba(6, 10, 20, 0.88);
  border: 1px solid #1e293b;
  color: var(--text-muted);
  font-size: 0.65rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
  backdrop-filter: blur(4px);
}

.toggle-chip.active {
  color: var(--accent-cyan);
  border-color: rgba(0, 242, 254, 0.4);
  background: rgba(0, 242, 254, 0.1);
}

.toggle-chip:hover {
  background: rgba(255,255,255,0.08);
}

/* Hidden compat elements */
.hidden-compat {
  display: none !important;
}
`;

const stylesPath = 'styles.css';
let css = fs.readFileSync(stylesPath, 'utf8');
css = css + '\n' + mapLayerCss;
fs.writeFileSync(stylesPath, css, 'utf8');
console.log('Successfully added map layer control styles');
