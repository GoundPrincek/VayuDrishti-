// VayuDrishti Prototype - Core Controller & Mock Telemetry Engine

// 1. Data Store: Scenarios & Innovation Datasets
const SCENARIOS = {
  bay_of_bengal: {
    name: "VSCS 'VAJRA'",
    category: "Cat-3 (95 kts)",
    centerCoords: [18.2, 86.8],
    zoom: 7,
    coastalBufferCoords: [
      [17.0, 83.5], [18.0, 84.5], [19.2, 85.5], [20.0, 86.8], [21.5, 87.5], [22.2, 88.5]
    ],
    pastTrack: [
      { lat: 14.5, lng: 88.5, kts: 50, time: "T-24h" },
      { lat: 15.4, lng: 88.0, kts: 65, time: "T-18h" },
      { lat: 16.3, lng: 87.6, kts: 75, time: "T-12h" },
      { lat: 17.2, lng: 87.2, kts: 85, time: "T-6h" },
      { lat: 18.2, lng: 86.8, kts: 95, time: "T+0h" }
    ],
    forecastTrack: [
      { hour: 0, lat: 18.2, lng: 86.8, kts: 95, hpa: 958, dist: 172, eye: 18, desc: "Near-Coast Zone" },
      { hour: 6, lat: 18.8, lng: 86.4, kts: 105, hpa: 950, dist: 125, eye: 16, desc: "Explosive RI Active" },
      { hour: 12, lat: 19.3, lng: 86.0, kts: 115, hpa: 942, dist: 80, eye: 15, desc: "Severe Eyewall" },
      { hour: 18, lat: 19.7, lng: 85.7, kts: 120, hpa: 938, dist: 38, eye: 14, desc: "Approaching Coast" },
      { hour: 24, lat: 20.0, lng: 85.5, kts: 110, hpa: 948, dist: 0, eye: 18, desc: "Landfall Puri Sector" },
      { hour: 36, lat: 20.7, lng: 85.2, kts: 75, hpa: 970, dist: -65, eye: 26, desc: "Inland Odisha" },
      { hour: 48, lat: 21.5, lng: 85.0, kts: 50, hpa: 985, dist: -150, eye: 35, desc: "Depression Stage" },
      { hour: 72, lat: 22.8, lng: 84.8, kts: 30, hpa: 998, dist: -290, eye: 45, desc: "Well Marked Low" }
    ],
    ensembles: [
      { name: "ECMWF", color: "#60a5fa", coords: [[18.2, 86.8], [19.0, 86.6], [19.6, 86.3], [20.3, 86.0], [21.0, 85.6], [22.0, 85.2], [23.1, 84.9]] },
      { name: "GFS", color: "#34d399", coords: [[18.2, 86.8], [18.7, 86.2], [19.2, 85.7], [19.8, 85.2], [20.5, 84.8], [21.3, 84.4], [22.4, 84.0]] },
      { name: "UKMET", color: "#fbbf24", coords: [[18.2, 86.8], [18.9, 86.5], [19.5, 86.1], [20.2, 85.8], [20.8, 85.4], [21.7, 85.1], [22.9, 84.7]] },
      { name: "NCUM (India)", color: "#f43f5e", coords: [[18.2, 86.8], [18.8, 86.3], [19.4, 85.9], [20.0, 85.5], [20.7, 85.1], [21.6, 84.8], [22.7, 84.5]] },
      { name: "VayuDrishti AI", color: "#a855f7", coords: [[18.2, 86.8], [18.8, 86.4], [19.3, 86.0], [19.9, 85.6], [20.6, 85.2], [21.5, 84.9], [22.6, 84.6]] }
    ],
    cone95: [
      [18.2, 86.8],
      [19.1, 85.6], [19.7, 85.0], [20.5, 84.3], [21.5, 83.7], [23.3, 83.3],
      [23.5, 86.0], [22.3, 86.3], [21.1, 86.6], [20.3, 87.0], [19.2, 87.3]
    ],
    cone68: [
      [18.2, 86.8],
      [18.9, 86.0], [19.5, 85.5], [20.2, 85.0], [21.0, 84.5], [22.8, 84.2],
      [23.0, 85.3], [21.8, 85.6], [20.8, 85.9], [20.0, 86.2], [19.0, 86.6]
    ],
    rapidScans: [
      { step: "T-45m", bursts: "9 / hr", deltaBursts: "+1 vs baseline", cdo: "-78.5°C", deltaCdo: "-0.8°C steady", eye: "26 km", deltaEye: "-2 km drift", pressure: "-1.2 hPa", deltaPressure: "Normal trend", alertText: "Atmospheric scan consistent with IMD 06:00 UTC advisory. No significant divergence detected." },
      { step: "T-30m", bursts: "11 / hr", deltaBursts: "+3 vs baseline", cdo: "-80.8°C", deltaCdo: "-2.3°C cooling", eye: "23 km", deltaEye: "-5 km tighten", pressure: "-2.4 hPa", deltaPressure: "Deepening speed +18%", alertText: "Sustained convective burst cluster observed in northeast eyewall. Cloud tops cooling rapidly." },
      { step: "T-15m", bursts: "13 / hr", deltaBursts: "+5 vs baseline", cdo: "-82.9°C", deltaCdo: "-4.4°C cooling", eye: "20 km", deltaEye: "-8 km tighten", pressure: "-3.8 hPa", deltaPressure: "Deepening speed +42%", alertText: "Pin-hole eye formation initiating. Micro-wave brightness temperatures indicate intense inner core consolidation." },
      { step: "T+0 (Now)", bursts: "14 / hr", deltaBursts: "+6 vs baseline", cdo: "-84.2°C", deltaCdo: "-6.5°C rapid cooling", eye: "18 km", deltaEye: "-10 km tightening", pressure: "-4.8 hPa", deltaPressure: "Accelerating drop", alertText: "EARLY DIVERGENCE DETECTED: Storm deepening 1.8x faster than scheduled 06:00 UTC bulletin forecast. Pre-advisory trigger activated." }
    ],
    ncRi: {
      prob: 84,
      status: "CRITICAL RI ALERT",
      desc: "Conditions prime for +30 kt surge in next 24h prior to landfall.",
      distanceKm: 172,
      dangerText: "172 km (DANGER ZONE)",
      progressPercent: 86,
      ohc: "92 kJ/cm²",
      vws: "7.2 kts",
      sst: "31.1°C"
    },
    landfallSectors: [
      { name: "Puri Coast, Odisha", prob: 44, color: "var(--alert-red)" },
      { name: "Paradip Port, Odisha", prob: 35, color: "var(--alert-orange)" },
      { name: "Gopalpur, Ganjam", prob: 14, color: "var(--accent-blue)" },
      { name: "Digha / WB Border", prob: 7, color: "var(--accent-purple)" }
    ],
    chartPoints: {
      p90: "M 40,43 L 95,36 L 150,22 L 205,18 L 260,35 L 340,58",
      p50: "M 40,44 L 95,41 L 150,30 L 205,28 L 260,44 L 340,63",
      p10: "M 40,45 L 95,48 L 150,42 L 205,38 L 260,52 L 340,68",
      area: "M 40,43 L 95,36 L 150,22 L 205,18 L 260,35 L 340,58 L 340,68 L 260,52 L 205,38 L 150,42 L 95,48 L 40,45 Z"
    },
    landfallEta: "Landfall: T+22h to T+26h"
  },

  arabian_sea: {
    name: "ESCS 'TEJ-II'",
    category: "Cat-2 (85 kts)",
    centerCoords: [19.5, 68.2],
    zoom: 7,
    coastalBufferCoords: [
      [20.5, 69.5], [21.5, 69.0], [22.4, 68.8], [23.1, 68.5]
    ],
    pastTrack: [
      { lat: 16.5, lng: 66.8, kts: 45, time: "T-24h" },
      { lat: 17.2, lng: 67.1, kts: 60, time: "T-18h" },
      { lat: 18.0, lng: 67.5, kts: 70, time: "T-12h" },
      { lat: 18.8, lng: 67.8, kts: 75, time: "T-6h" },
      { lat: 19.5, lng: 68.2, kts: 85, time: "T+0h" }
    ],
    forecastTrack: [
      { hour: 0, lat: 19.5, lng: 68.2, kts: 85, hpa: 968, dist: 195, eye: 22, desc: "Recurving Northeast" },
      { hour: 6, lat: 20.2, lng: 68.7, kts: 95, hpa: 960, dist: 140, eye: 20, desc: "Approaching Saurashtra" },
      { hour: 12, lat: 20.9, lng: 69.1, kts: 105, hpa: 952, dist: 95, eye: 18, desc: "Peak Near-Coast Peak" },
      { hour: 18, lat: 21.6, lng: 69.4, kts: 100, hpa: 956, dist: 45, eye: 19, desc: "Near Porbandar" },
      { hour: 24, lat: 22.2, lng: 69.7, kts: 85, hpa: 970, dist: 0, eye: 24, desc: "Landfall Saurashtra" },
      { hour: 36, lat: 23.0, lng: 70.3, kts: 55, hpa: 988, dist: -80, eye: 34, desc: "Inland Gujarat" },
      { hour: 48, lat: 23.8, lng: 71.0, kts: 35, hpa: 996, dist: -170, eye: 42, desc: "Kutch Remnant" },
      { hour: 72, lat: 24.6, lng: 72.2, kts: 25, hpa: 1004, dist: -310, eye: 50, desc: "Dissipated Low" }
    ],
    ensembles: [
      { name: "ECMWF", color: "#60a5fa", coords: [[19.5, 68.2], [20.3, 68.9], [21.1, 69.4], [22.0, 70.0], [22.8, 70.6], [23.7, 71.3]] },
      { name: "GFS", color: "#34d399", coords: [[19.5, 68.2], [20.0, 68.5], [20.6, 68.9], [21.4, 69.3], [22.3, 69.8], [23.4, 70.5]] },
      { name: "UKMET", color: "#fbbf24", coords: [[19.5, 68.2], [20.4, 68.8], [21.2, 69.2], [21.9, 69.6], [22.7, 70.1], [23.6, 70.8]] },
      { name: "NCUM (India)", color: "#f43f5e", coords: [[19.5, 68.2], [20.1, 68.6], [20.8, 69.1], [21.6, 69.5], [22.5, 70.0], [23.5, 70.7]] },
      { name: "VayuDrishti AI", color: "#a855f7", coords: [[19.5, 68.2], [20.2, 68.7], [21.0, 69.2], [21.8, 69.6], [22.6, 70.2], [23.6, 70.9]] }
    ],
    cone95: [
      [19.5, 68.2],
      [20.5, 67.8], [21.3, 68.2], [22.3, 68.8], [23.5, 69.5], [24.8, 70.5],
      [24.5, 73.0], [23.2, 72.2], [22.0, 71.2], [21.0, 70.5], [20.2, 69.8]
    ],
    cone68: [
      [19.5, 68.2],
      [20.3, 68.2], [21.0, 68.6], [21.9, 69.2], [22.9, 69.9], [24.0, 70.8],
      [23.9, 72.0], [22.8, 71.5], [21.7, 70.7], [20.8, 70.1], [20.0, 69.4]
    ],
    rapidScans: [
      { step: "T-45m", bursts: "7 / hr", deltaBursts: "Normal baseline", cdo: "-75.2°C", deltaCdo: "Stable temp", eye: "30 km", deltaEye: "Broad core", pressure: "-0.9 hPa", deltaPressure: "Nominal", alertText: "Track recurvature aligning with standard GFS/ECMWF guidance. No abrupt surge." },
      { step: "T-30m", bursts: "9 / hr", deltaBursts: "+2 bursts", cdo: "-77.4°C", deltaCdo: "-2.2°C cooling", eye: "27 km", deltaEye: "-3 km tightening", pressure: "-1.8 hPa", deltaPressure: "Deepening", alertText: "Increased moisture advection from Arabian Sea warm pool. Core consolidation accelerating." },
      { step: "T-15m", bursts: "11 / hr", deltaBursts: "+4 bursts", cdo: "-80.1°C", deltaCdo: "-4.9°C cooling", eye: "24 km", deltaEye: "-6 km tightening", pressure: "-2.9 hPa", deltaPressure: "Accelerating drop", alertText: "Eyewall convection symmetry establishing. Coastal microwave signature showing strong wrap." },
      { step: "T+0 (Now)", bursts: "12 / hr", deltaBursts: "+5 vs baseline", cdo: "-81.8°C", deltaCdo: "-6.6°C rapid cooling", eye: "22 km", deltaEye: "-8 km tightening", pressure: "-3.9 hPa", deltaPressure: "Sharp pressure drop", alertText: "INTERIM ALERT: Storm showing sharper northward hook than standard synoptic models. Landfall moved 4 hours earlier." }
    ],
    ncRi: {
      prob: 72,
      status: "ELEVATED RI WATCH",
      desc: "Warm Arabian Sea pool supporting rapid intensification prior to Saurashtra impact.",
      distanceKm: 195,
      dangerText: "195 km (COASTAL THREAT)",
      progressPercent: 74,
      ohc: "78 kJ/cm²",
      vws: "8.5 kts",
      sst: "30.4°C"
    },
    landfallSectors: [
      { name: "Porbandar, Gujarat", prob: 48, color: "var(--alert-red)" },
      { name: "Dwarka / Okha", prob: 28, color: "var(--alert-orange)" },
      { name: "Veraval / Somnath", prob: 16, color: "var(--accent-blue)" },
      { name: "Mundra / Kutch", prob: 8, color: "var(--accent-purple)" }
    ],
    chartPoints: {
      p90: "M 40,48 L 95,42 L 150,28 L 205,24 L 260,42 L 340,62",
      p50: "M 40,49 L 95,46 L 150,36 L 205,34 L 260,50 L 340,66",
      p10: "M 40,50 L 95,52 L 150,46 L 205,44 L 260,58 L 340,71",
      area: "M 40,48 L 95,42 L 150,28 L 205,24 L 260,42 L 340,62 L 340,71 L 260,58 L 205,44 L 150,46 L 95,52 L 40,50 Z"
    },
    landfallEta: "Landfall: T+24h to T+28h"
  }
};

// 2. Global State
let currentScenarioKey = 'bay_of_bengal';
let currentForecastHour = 0;
let isPlaying = false;
let playInterval = null;
let mapInstance = null;

// Map Layer References
let mapLayers = {
  pastTrack: null,
  forecastTrack: null,
  forecastPointMarkers: [],
  cone95: null,
  cone68: null,
  ensembles: [],
  stormMarker: null,
  radii64: null,
  radii50: null,
  radii34: null,
  coastalBuffer: null,
  cfPrevMarker: null,
  cfConnectLine: null,
  riWatchHalo: null,
  riWatchLine: null,
  riWatchBeacon: null
};

// Center-Fix state: tracks previous and current eye positions
let centerFixState = {
  prevLat: null,
  prevLng: null,
  currLat: null,
  currLng: null
};

// Layer Visibility Flags
const layerVisibility = {
  cone: true,
  ensemble: true,
  radii: true,
  riWatch: true,
  waypoints: true
};

// Probabilistic 0–72 Hour Forecast Dataset
const PROBABILISTIC_FORECAST_POINTS = [
  { hour: 0,  windKmh: 125, kts: 68, confidence: 94, time: "T+0h (NOW: 11:00 UTC)", lat: 18.2, lng: 86.8, coneRadiusKm: 15, status: "Active Eye • Near-Coast", isLandfall: false },
  { hour: 12, windKmh: 132, kts: 71, confidence: 86, time: "T+12h (23:00 UTC)", lat: 19.3, lng: 86.0, coneRadiusKm: 35, status: "Intensifying Core • 80 km offshore", isLandfall: false },
  { hour: 24, windKmh: 140, kts: 76, confidence: 78, time: "T+24h (Tomorrow 11:00 UTC)", lat: 20.0, lng: 85.5, coneRadiusKm: 65, status: "Direct Landfall (Puri Coast)", isLandfall: true },
  { hour: 48, windKmh: 148, kts: 80, confidence: 69, time: "T+48h (Day 2 11:00 UTC)", lat: 21.5, lng: 85.0, coneRadiusKm: 110, status: "Inland Track (Odisha/Jharkhand)", isLandfall: false },
  { hour: 72, windKmh: 155, kts: 84, confidence: 61, time: "T+72h (Day 3 11:00 UTC)", lat: 22.8, lng: 84.8, coneRadiusKm: 180, status: "Remnant Low (Dissipated)", isLandfall: false }
];

// Multi-Source Satellite Observation Sources Dataset
const SATELLITE_SOURCES = {
  insat: {
    sourceName: "INSAT-3DS",
    time: "11:00 UTC (Latest)",
    feature: "Cloud structure",
    sensorModality: "IR observation",
    primaryTarget: "Central Dense Overcast (CDO) Canopy",
    coreDiagnostic: "-84.2°C Eyewall Cloud Tops (Rapid Deepening)",
    resolution: "4 km • Ingested & Calibrated",
    badgeColor: "var(--accent-cyan)",
    note: "Geostationary infrared thermal imaging highlights rapid convective deepening and symmetrical CDO canopy over Bay of Bengal."
  },
  microwave: {
    sourceName: "Polar Microwave",
    time: "10:45 UTC (-15m)",
    feature: "Low-level cyclone structure",
    sensorModality: "89 GHz",
    primaryTarget: "Low-Level Eyewall Ring & Rainbands",
    coreDiagnostic: "Concentric Inner Ring Formed (89 GHz 210 K)",
    resolution: "12 km • Swath Match Complete",
    badgeColor: "#a855f7",
    note: "High-frequency 89 GHz microwave channel penetrates high cirrus canopy to resolve low-level cyclonic eyewall structure."
  },
  oscat: {
    sourceName: "OSCAT Surface Winds",
    time: "10:30 UTC (-30m)",
    feature: "Surface wind",
    sensorModality: "Wind vectors",
    primaryTarget: "Ocean Surface Wind Stress & Circulation",
    coreDiagnostic: "Peak 95 kt (175 km/h) Inbound Vectors",
    resolution: "12.5 km Grid • QC Passed (No Rain Flag)",
    badgeColor: "#38bdf8",
    note: "Ku-band scatterometer wind vectors resolve asymmetric gale force wind distribution with strongest vectors in NE quadrant."
  }
};

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  loadScenario(currentScenarioKey);
  setupEventHandlers();
  startClock();
});

// 4. Map Setup
function initMap() {
  const scenario = SCENARIOS[currentScenarioKey];
  
  // Create Leaflet Map with dark theme
  mapInstance = L.map('cycloneMap', {
    center: scenario.centerCoords,
    zoom: scenario.zoom,
    zoomControl: true,
    attributionControl: false
  });

  // Dark Basemap (CartoDB Dark Matter with fallback tile)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    subdomains: 'abcd'
  }).addTo(mapInstance);
}

// 5. Load Scenario & Render Layers
function loadScenario(key) {
  currentScenarioKey = key;
  const scenario = SCENARIOS[key];
  currentForecastHour = 0;

  // Header update
  document.getElementById('stormName').textContent = scenario.name;
  document.getElementById('stormCategory').textContent = scenario.category;

  // Center map
  if (mapInstance) {
    mapInstance.setView(scenario.centerCoords, scenario.zoom);
    setTimeout(() => mapInstance.invalidateSize(), 100);
  }

  // Clear previous layers
  clearMapLayers();

  // Render Past Track
  const pastCoords = scenario.pastTrack.map(p => [p.lat, p.lng]);
  mapLayers.pastTrack = L.polyline(pastCoords, {
    color: '#94a3b8',
    weight: 3,
    dashArray: '4, 4',
    opacity: 0.8
  }).addTo(mapInstance);

  // Past Track Markers
  scenario.pastTrack.forEach(pt => {
    L.circleMarker([pt.lat, pt.lng], {
      radius: 4,
      color: '#94a3b8',
      fillColor: '#0a0f1d',
      fillOpacity: 1,
      weight: 1.5
    }).bindTooltip(`${pt.time}: ${pt.kts} kts`, { direction: 'top', className: 'hud-tooltip' }).addTo(mapInstance);
  });

  // Render 95% Cone of Uncertainty
  mapLayers.cone95 = L.polygon(scenario.cone95, {
    color: '#00f2fe',
    weight: 1,
    dashArray: '3, 4',
    fillColor: '#00f2fe',
    fillOpacity: 0.08
  }).addTo(mapInstance);

  // Render 68% Cone of Uncertainty
  mapLayers.cone68 = L.polygon(scenario.cone68, {
    color: '#38bdf8',
    weight: 1.5,
    fillColor: '#38bdf8',
    fillOpacity: 0.16
  }).addTo(mapInstance);

  // Render 5 Ensemble Spaghetti lines
  mapLayers.ensembles = scenario.ensembles.map(ens => {
    return L.polyline(ens.coords, {
      color: ens.color,
      weight: 1.5,
      opacity: 0.7,
      dashArray: '2, 3'
    }).bindTooltip(`${ens.name} Model Track`, { sticky: true }).addTo(mapInstance);
  });

  // Render Consensus Forecast Track
  const forecastCoords = scenario.forecastTrack.map(p => [p.lat, p.lng]);
  mapLayers.forecastTrack = L.polyline(forecastCoords, {
    color: '#00f2fe',
    weight: 3.5,
    opacity: 0.95
  }).addTo(mapInstance);

  // Render Interactive Probabilistic Forecast Points along the Track (0h, 12h, 24h, 48h, 72h)
  mapLayers.forecastPointMarkers = PROBABILISTIC_FORECAST_POINTS.map(p => {
    const ptIcon = L.divIcon({
      className: 'custom-forecast-point-pin',
      html: `
        <div class="f-pin ${p.hour === currentForecastHour ? 'active' : ''}" id="fpin-${p.hour}" title="Click to view ${p.hour}h forecast details">
          <span class="f-pin-label">${p.hour}h</span>
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const m = L.marker([p.lat, p.lng], { icon: ptIcon, zIndexOffset: 250 }).addTo(mapInstance);

    m.bindPopup(`
      <div class="forecast-popup-card">
        <div class="fp-title">${p.hour} HOURS</div>
        <div class="fp-metric-row"><span class="fp-label">Wind:</span> <strong class="fp-val text-red">${p.windKmh} km/h</strong></div>
        <div class="fp-metric-row"><span class="fp-label">Confidence:</span> <strong class="fp-val text-cyan">${p.confidence}%</strong></div>
        <div class="fp-metric-row"><span class="fp-label">Forecast Time:</span> <span class="fp-val">${p.time}</span></div>
        <div class="fp-metric-row"><span class="fp-label">Uncertainty Cone:</span> <span class="fp-val">±${p.coneRadiusKm} km</span></div>
      </div>
    `, { className: 'hud-leaflet-popup' });

    m.on('click', () => {
      selectForecastPoint(p.hour);
    });

    return m;
  });

  // Render 200 km Coastal Alert Buffer Line
  mapLayers.coastalBuffer = L.polyline(scenario.coastalBufferCoords, {
    color: '#f43f5e',
    weight: 2,
    dashArray: '6, 6',
    opacity: 0.5
  }).bindTooltip('200 km Coastal Danger Buffer Zone', { sticky: true }).addTo(mapInstance);

  // Initialize Storm Eye Center Marker
  const eyeIcon = L.divIcon({
    className: 'custom-storm-pin',
    html: `
      <div style="position:relative; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:100%; height:100%; border-radius:50%; border:2px solid #f43f5e; animation:pulse 1.5s infinite;"></div>
        <div style="width:12px; height:12px; border-radius:50%; background:#f43f5e; box-shadow:0 0 10px #f43f5e;"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const curPoint = scenario.forecastTrack[0];
  mapLayers.stormMarker = L.marker([curPoint.lat, curPoint.lng], { icon: eyeIcon }).addTo(mapInstance);

  // Initialize Wind Radii
  updateWindRadii(curPoint.lat, curPoint.lng, curPoint.kts);

  // Update Innovation Panels
  updateInnovation1(window.cycloneData ? 4 : 3); // Default to Live (11:00)
  updateNearCoastRiWatch(curPoint);
  updateInnovation3(scenario);
  updatePhysicsGuidedRiPredictor(4, curPoint);

  // Update HUD
  updateHUD(curPoint);

  // Initialize Center-Fix with first past track point as "previous"
  const pastTrack = scenario.pastTrack;
  const prevPt = pastTrack[pastTrack.length - 2] || pastTrack[0];
  centerFixState.prevLat = prevPt.lat;
  centerFixState.prevLng = prevPt.lng;
  centerFixState.currLat = curPoint.lat;
  centerFixState.currLng = curPoint.lng;
  updateCenterFix(curPoint);

  // Apply layer visibility flags
  applyLayerVisibility();

  // Render mini data visualizations
  renderObsCharts();
  renderForecastDataLayer();
}

// ============================================
// Mini Chart: 15-Minute Intensity Sparkline
// ============================================

/**
 * Render the observation wind + pressure sparkline from mock cycloneData.observations.
 * Called once on load and re-called when selectObservation changes the active step.
 */
function renderObsCharts() {
  const obs = (window.cycloneData && window.cycloneData.observations) || [];
  if (!obs.length) return;

  // SVG coordinate space: x in [28, 264], y in [4, 50]
  // Wind: 80–160 km/h maps to y 50→4  (lower = higher wind)
  // Pressure: 960–1000 hPa maps to y 50→4
  const X_START = 28, X_END = 264, Y_TOP = 5, Y_BOT = 48;
  const xPositions = [28, 87, 146, 205, 264]; // one per step

  function windY(kmh) {
    const minW = 75, maxW = 165;
    return Y_BOT - ((kmh - minW) / (maxW - minW)) * (Y_BOT - Y_TOP);
  }
  function pressY(hpa) {
    const minP = 960, maxP = 1000;
    // Higher pressure = lower on chart (storm weakening)
    return Y_BOT - ((maxP - hpa) / (maxP - minP)) * (Y_BOT - Y_TOP);
  }

  // Build path strings
  const windPts = obs.map((o, i) => `${xPositions[i]},${windY(o.windKmh).toFixed(1)}`);
  const pressPts = obs.map((o, i) => `${xPositions[i]},${pressY(o.pressureHpa).toFixed(1)}`);

  const windLine = `M ${windPts.join(' L ')}`;
  const windArea = `M ${windPts.join(' L ')} L ${xPositions[obs.length - 1]},${Y_BOT} L ${xPositions[0]},${Y_BOT} Z`;
  const pressLine = `M ${pressPts.join(' L ')}`;

  const windLineEl = document.getElementById('obsWindLine');
  const windAreaEl = document.getElementById('obsWindArea');
  const pressLineEl = document.getElementById('obsPressureLine');
  const dotsEl = document.getElementById('obsWindDots');

  if (windLineEl) windLineEl.setAttribute('d', windLine);
  if (windAreaEl) windAreaEl.setAttribute('d', windArea);
  if (pressLineEl) pressLineEl.setAttribute('d', pressLine);

  // Render data point dots (wind)
  if (dotsEl) {
    dotsEl.innerHTML = '';
    obs.forEach((o, i) => {
      const cx = xPositions[i];
      const cy = windY(o.windKmh);
      const isActive = i === currentObsIndex;
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy.toFixed(1));
      dot.setAttribute('r', isActive ? '3.5' : '2');
      dot.setAttribute('fill', isActive ? '#00f2fe' : 'rgba(0,242,254,0.55)');
      dot.setAttribute('stroke', isActive ? '#ffffff' : 'none');
      dot.setAttribute('stroke-width', '1');
      dotsEl.appendChild(dot);
    });
  }

  // Move cursor to active step
  updateObsChartCursor(currentObsIndex, xPositions);
}

function updateObsChartCursor(stepIndex, xPositions) {
  const xPos = (xPositions || [28, 87, 146, 205, 264])[stepIndex] || 264;
  const cursor = document.getElementById('obsChartCursor');
  if (cursor) {
    cursor.setAttribute('x1', xPos);
    cursor.setAttribute('x2', xPos);
  }
}

// ============================================
// Mini Chart: Forecast 0-72h Bar + Confidence
// ============================================

/**
 * Render the forecast intensity bar chart.
 * Bars = wind km/h, confidence polyline overlay in orange.
 * Active hour bar is highlighted cyan.
 */
function renderForecastDataLayer() {
  const pts = PROBABILISTIC_FORECAST_POINTS;
  if (!pts || !pts.length) return;

  const barsEl = document.getElementById('fcBars');
  const confEl = document.getElementById('fcConfLine');
  const labelsEl = document.getElementById('fcXLabels');
  if (!barsEl || !confEl || !labelsEl) return;

  // SVG space: x in [28, 265], y in [4, 48]
  const Y_TOP = 5, Y_BOT = 48;
  const X_START = 32, X_END = 265;
  const totalWidth = X_END - X_START;
  const barW = Math.floor(totalWidth / pts.length) - 4;
  const gap = Math.floor(totalWidth / pts.length);

  function windY(kmh) {
    const minW = 100, maxW = 175;
    return Y_BOT - ((kmh - minW) / (maxW - minW)) * (Y_BOT - Y_TOP);
  }
  function confY(pct) {
    // 50–100% maps to y 48→5
    return Y_BOT - ((pct - 50) / 50) * (Y_BOT - Y_TOP);
  }

  barsEl.innerHTML = '';
  labelsEl.innerHTML = '';
  const confPts = [];

  pts.forEach((p, i) => {
    const cx = X_START + i * gap + gap / 2;
    const barX = cx - barW / 2;
    const barY = windY(p.windKmh);
    const barH = Y_BOT - barY;
    const isActive = p.hour === currentForecastHour;

    // Bar
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', barX.toFixed(1));
    rect.setAttribute('y', barY.toFixed(1));
    rect.setAttribute('width', barW);
    rect.setAttribute('height', barH.toFixed(1));
    rect.setAttribute('rx', '2');
    rect.setAttribute('fill', isActive
      ? 'rgba(0,242,254,0.75)'
      : (p.isLandfall ? 'rgba(244,63,94,0.55)' : 'rgba(0,242,254,0.22)'));
    rect.setAttribute('stroke', isActive ? '#00f2fe' : 'none');
    rect.setAttribute('stroke-width', '1');
    barsEl.appendChild(rect);

    // Wind label on top of bar
    const wLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    wLabel.setAttribute('x', cx.toFixed(1));
    wLabel.setAttribute('y', (barY - 2).toFixed(1));
    wLabel.setAttribute('text-anchor', 'middle');
    wLabel.setAttribute('font-size', '5.5');
    wLabel.setAttribute('font-family', 'monospace');
    wLabel.setAttribute('fill', isActive ? '#00f2fe' : '#64748b');
    wLabel.textContent = p.windKmh;
    barsEl.appendChild(wLabel);

    // X label (hour)
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', cx.toFixed(1));
    xLabel.setAttribute('y', '57');
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('font-size', '6');
    xLabel.setAttribute('font-family', 'monospace');
    xLabel.setAttribute('fill', isActive ? '#00f2fe' : '#475569');
    xLabel.textContent = `${p.hour}h`;
    labelsEl.appendChild(xLabel);

    // Confidence point for polyline
    confPts.push({ x: cx, y: confY(p.confidence) });
  });

  // Confidence polyline + dots
  confEl.innerHTML = '';
  if (confPts.length >= 2) {
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', confPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '));
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', 'var(--alert-orange)');
    polyline.setAttribute('stroke-width', '1.4');
    polyline.setAttribute('stroke-dasharray', '3,2');
    polyline.setAttribute('stroke-linecap', 'round');
    confEl.appendChild(polyline);

    confPts.forEach((p, i) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', p.x.toFixed(1));
      dot.setAttribute('cy', p.y.toFixed(1));
      dot.setAttribute('r', '2');
      dot.setAttribute('fill', 'var(--alert-orange)');
      confEl.appendChild(dot);

      // Conf % label
      const cLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      cLabel.setAttribute('x', p.x.toFixed(1));
      cLabel.setAttribute('y', (p.y - 3).toFixed(1));
      cLabel.setAttribute('text-anchor', 'middle');
      cLabel.setAttribute('font-size', '5');
      cLabel.setAttribute('font-family', 'monospace');
      cLabel.setAttribute('fill', '#fb923c');
      cLabel.textContent = `${PROBABILISTIC_FORECAST_POINTS[i].confidence}%`;
      confEl.appendChild(cLabel);
    });
  }

  // Update fc cursor
  const activePt = confPts[pts.findIndex(p => p.hour === currentForecastHour)] || confPts[0];
  const fcCursor = document.getElementById('fcCursor');
  if (fcCursor && activePt) {
    fcCursor.setAttribute('x1', activePt.x.toFixed(1));
    fcCursor.setAttribute('x2', activePt.x.toFixed(1));
  }
}

function clearMapLayers() {
  if (!mapInstance) return;
  if (mapLayers.pastTrack) mapInstance.removeLayer(mapLayers.pastTrack);
  if (mapLayers.forecastTrack) mapInstance.removeLayer(mapLayers.forecastTrack);
  if (mapLayers.cone95) mapInstance.removeLayer(mapLayers.cone95);
  if (mapLayers.cone68) mapInstance.removeLayer(mapLayers.cone68);
  if (mapLayers.stormMarker) mapInstance.removeLayer(mapLayers.stormMarker);
  if (mapLayers.radii64) mapInstance.removeLayer(mapLayers.radii64);
  if (mapLayers.radii50) mapInstance.removeLayer(mapLayers.radii50);
  if (mapLayers.radii34) mapInstance.removeLayer(mapLayers.radii34);
  if (mapLayers.coastalBuffer) mapInstance.removeLayer(mapLayers.coastalBuffer);
  if (mapLayers.cfPrevMarker) mapInstance.removeLayer(mapLayers.cfPrevMarker);
  if (mapLayers.cfConnectLine) mapInstance.removeLayer(mapLayers.cfConnectLine);
  if (mapLayers.riWatchHalo) mapInstance.removeLayer(mapLayers.riWatchHalo);
  if (mapLayers.riWatchLine) mapInstance.removeLayer(mapLayers.riWatchLine);
  if (mapLayers.riWatchBeacon) mapInstance.removeLayer(mapLayers.riWatchBeacon);
  if (mapLayers.forecastPointMarkers) {
    mapLayers.forecastPointMarkers.forEach(m => mapInstance.removeLayer(m));
    mapLayers.forecastPointMarkers = [];
  }
  mapLayers.ensembles.forEach(line => mapInstance.removeLayer(line));
  mapLayers.ensembles = [];
}

// 6. Dynamic Wind Radii Render
function updateWindRadii(lat, lng, kts) {
  if (!mapInstance) return;
  if (mapLayers.radii64) mapInstance.removeLayer(mapLayers.radii64);
  if (mapLayers.radii50) mapInstance.removeLayer(mapLayers.radii50);
  if (mapLayers.radii34) mapInstance.removeLayer(mapLayers.radii34);

  if (!layerVisibility.radii) return;

  // Convert knots to approximate radius meters for visualization
  const r64 = Math.max(0, (kts - 64) * 2200); // 64kt Hurricane radius
  const r50 = Math.max(0, (kts - 50) * 3500); // 50kt Storm radius
  const r34 = Math.max(20000, (kts - 34) * 4500); // 34kt Gale radius

  // 34 kt (Gale) Outer circle
  mapLayers.radii34 = L.circle([lat, lng], {
    radius: r34,
    color: '#fbbf24',
    fillColor: '#fbbf24',
    fillOpacity: 0.08,
    weight: 1
  }).bindTooltip(`34 kt Gale Wind Radius (${Math.round(r34/1000)} km)`).addTo(mapInstance);

  // 50 kt (Storm) Middle circle
  if (r50 > 0) {
    mapLayers.radii50 = L.circle([lat, lng], {
      radius: r50,
      color: '#fb923c',
      fillColor: '#fb923c',
      fillOpacity: 0.12,
      weight: 1.2
    }).bindTooltip(`50 kt Storm Wind Radius (${Math.round(r50/1000)} km)`).addTo(mapInstance);
  }

  // 64 kt (Hurricane force) Inner core
  if (r64 > 0) {
    mapLayers.radii64 = L.circle([lat, lng], {
      radius: r64,
      color: '#f43f5e',
      fillColor: '#f43f5e',
      fillOpacity: 0.18,
      weight: 1.5
    }).bindTooltip(`64 kt Hurricane Eye Core (${Math.round(r64/1000)} km)`).addTo(mapInstance);
  }
}

// 7. Time Scrubber & Simulation
function setForecastHour(targetHour) {
  currentForecastHour = targetHour;
  const scenario = SCENARIOS[currentScenarioKey];
  
  // Find matching forecast point or interpolate
  const track = scenario.forecastTrack;
  let pt = track.find(p => p.hour === targetHour);
  if (!pt) {
    // Pick nearest
    pt = track.reduce((prev, curr) => Math.abs(curr.hour - targetHour) < Math.abs(prev.hour - targetHour) ? curr : prev);
  }

  // Update slider input
  document.getElementById('timeSlider').value = targetHour;

  // Update timeline ticks active style
  document.querySelectorAll('.timeline-labels span').forEach(sp => sp.classList.remove('active-tick'));
  const activeTick = document.getElementById(`tick-${targetHour}`);
  if (activeTick) activeTick.classList.add('active-tick');

  // Update scrubber header tags
  const forecastTimeTag = document.getElementById('forecastTimeTag');
  if (forecastTimeTag) {
    forecastTimeTag.textContent = pt.time || `T+${targetHour}h`;
    forecastTimeTag.className = `forecast-tag ${targetHour === 0 ? 'now' : (targetHour <= 24 ? 'warn' : 'past')}`;
  }
  const forecastDistanceTag = document.getElementById('forecastDistanceTag');
  if (forecastDistanceTag) {
    if (pt.dist > 0) {
      forecastDistanceTag.textContent = `${pt.dist} km to coast`;
      forecastDistanceTag.style.color = pt.dist < 100 ? 'var(--alert-red)' : 'var(--alert-orange)';
    } else if (pt.dist === 0) {
      forecastDistanceTag.textContent = 'LANDFALL';
      forecastDistanceTag.style.color = 'var(--alert-red)';
    } else {
      forecastDistanceTag.textContent = `${Math.abs(pt.dist)} km inland`;
      forecastDistanceTag.style.color = 'var(--alert-yellow)';
    }
  }

  // Update Center-Fix: previous ← old current, current ← new point
  centerFixState.prevLat = centerFixState.currLat;
  centerFixState.prevLng = centerFixState.currLng;
  centerFixState.currLat = pt.lat;
  centerFixState.currLng = pt.lng;

  // Move Storm Center Marker
  if (mapLayers.stormMarker) {
    mapLayers.stormMarker.setLatLng([pt.lat, pt.lng]);
  }

  // Update Radii
  updateWindRadii(pt.lat, pt.lng, pt.kts);

  // Update Compass Rose
  const compassNeedle = document.getElementById('compassNeedle');
  const compassLabel = document.getElementById('compassLabel');
  if (compassNeedle && centerFixState.prevLat != null) {
    const bearing = computeBearing(centerFixState.prevLat, centerFixState.prevLng, pt.lat, pt.lng);
    const compassDir = bearingToCompass(bearing);
    compassNeedle.style.transform = `rotate(${Math.round(bearing)}deg)`;
    if (compassLabel) {
      compassLabel.textContent = `${Math.round(bearing)}° ${compassDir}`;
    }
  }

  // ── FLOW STEP 1 → 2: Sync 15-Minute Observation panel to forecast hour ──
  // Map forecast hour to closest observation step (0h=step 4/NOW, going back in time)
  const obsStepForHour = targetHour === 0 ? 4 : (targetHour <= 6 ? 4 : Math.max(0, 4 - Math.round(targetHour / 18)));
  syncObsToForecastHour(obsStepForHour, pt);

  // ── FLOW STEP 3: Update Center-Fix panel & map markers ──
  updateCenterFix(pt);

  // ── FLOW STEP 4 → 5: Update Near-Coast RI Watch dashboard card & map hazard connection ──
  updateNearCoastRiWatch(pt);

  // ── FLOW STEP 6: Update Forecast Point Details Display in Card 3 ──
  updateForecastPointDetails(targetHour);

  // Update Chart Cursor
  updateChartCursor(targetHour);

  // Update pipeline flow indicator UI
  updateFlowPipeline(targetHour, pt);
}

function updateHUD(pt) {
  const kmh = Math.round(pt.kts * 1.852);
  const hudWind = document.getElementById('hudWindSpeed');
  if (hudWind) hudWind.textContent = pt.kts;
  const hudKmh = document.querySelector('.hud-metric-row span:last-child');
  if (hudKmh) hudKmh.textContent = `(${kmh} km/h)`;
  const hudCoords = document.getElementById('hudCoords');
  if (hudCoords) hudCoords.textContent = `Location: ${pt.lat.toFixed(1)}°N, ${pt.lng.toFixed(1)}°E • ${pt.desc}`;
  const hudPressure = document.getElementById('hudPressure');
  if (hudPressure) hudPressure.textContent = `Central Pressure: ${pt.hpa} hPa • Eye Diameter: ${pt.eye} km`;

  // Safely update legacy coastal distance elements if present
  const coastDistEl = document.getElementById('coastDistance');
  const coastProgEl = document.getElementById('coastProgressBar');
  if (coastDistEl) {
    if (pt.dist > 0) {
      coastDistEl.textContent = `${pt.dist} km (HIGH RISK)`;
      coastDistEl.style.color = 'var(--alert-red)';
    } else {
      coastDistEl.textContent = `LANDFALL / INLAND (${Math.abs(pt.dist)} km)`;
      coastDistEl.style.color = 'var(--alert-orange)';
    }
  }
  if (coastProgEl) {
    coastProgEl.style.width = pt.dist > 0 ? `${Math.min(100, Math.round((200 - pt.dist) / 200 * 100))}%` : '100%';
  }
}

function updateChartCursor(hour) {
  const cursor = document.getElementById('chartCursor');
  if (!cursor) return;
  // Chart width 360, x runs from 40 (0h) to 340 (72h)
  const x = 40 + (hour / 72) * 300;
  cursor.setAttribute('x1', x);
  cursor.setAttribute('x2', x);

  // Also re-render the forecast bar chart so active bar highlights
  renderForecastDataLayer();
}

// ============================================
// AI Objective Center-Fix System
// ============================================

/**
 * Mock confidence data keyed by forecast hour.
 * Confidence degrades further into the forecast.
 */
const CENTER_FIX_CONFIDENCE = {
  0: 94, 6: 91, 12: 87, 18: 82, 24: 76, 36: 68, 48: 59, 72: 48
};

/**
 * Compute compass bearing from point A to point B (degrees).
 */
function computeBearing(lat1, lng1, lat2, lng2) {
  const toRad = d => d * Math.PI / 180;
  const toDeg = r => r * 180 / Math.PI;
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
            Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  let brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
}

/**
 * Convert bearing degrees to 16-point compass direction.
 */
function bearingToCompass(deg) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const idx = Math.round(deg / 22.5) % 16;
  return dirs[idx];
}

/**
 * Compute Haversine distance in km between two lat/lng points.
 */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Update the AI Center-Fix panel and render ghost marker + connection line.
 * Called on scenario load and every time the forecast hour changes.
 */
function updateCenterFix(pt) {
  const prevLat = centerFixState.prevLat;
  const prevLng = centerFixState.prevLng;
  const currLat = centerFixState.currLat;
  const currLng = centerFixState.currLng;

  // Guard: need valid previous position
  if (prevLat == null || prevLng == null) return;

  // Compute movement metrics
  const bearing = computeBearing(prevLat, prevLng, currLat, currLng);
  const compassDir = bearingToCompass(bearing);
  const displacement = haversineKm(prevLat, prevLng, currLat, currLng);

  // Confidence from lookup (degrade over forecast time)
  const hour = currentForecastHour || 0;
  const confidence = CENTER_FIX_CONFIDENCE[hour] || Math.max(40, 94 - hour);

  // --- Update the HUD panel ---
  const cfPrevCoords = document.getElementById('cfPrevCoords');
  const cfCurrCoords = document.getElementById('cfCurrCoords');
  const cfConfBadge = document.getElementById('cfConfBadge');
  const cfConfFill = document.getElementById('cfConfFill');
  const cfConfVal = document.getElementById('cfConfVal');
  const cfMoveDir = document.getElementById('cfMoveDir');
  const cfDisplacement = document.getElementById('cfDisplacement');
  const cfFixTime = document.getElementById('cfFixTime');

  if (cfPrevCoords) cfPrevCoords.textContent = `${prevLat.toFixed(1)}°N, ${prevLng.toFixed(1)}°E`;
  if (cfCurrCoords) cfCurrCoords.textContent = `${currLat.toFixed(1)}°N, ${currLng.toFixed(1)}°E`;
  if (cfConfBadge) cfConfBadge.textContent = `${confidence}%`;
  if (cfConfFill) cfConfFill.style.width = `${confidence}%`;
  if (cfConfVal) cfConfVal.textContent = `${confidence}%`;
  if (cfMoveDir) cfMoveDir.textContent = compassDir;
  if (cfDisplacement) cfDisplacement.textContent = `${Math.round(displacement)} km`;

  // Fix time display
  if (cfFixTime) {
    if (hour === 0) {
      cfFixTime.textContent = '11:00 UTC';
    } else {
      cfFixTime.textContent = `T+${hour}h`;
    }
  }

  // Confidence badge color: cyan if high, yellow if moderate, red if low
  if (cfConfBadge) {
    if (confidence >= 85) {
      cfConfBadge.style.background = 'rgba(0, 242, 254, 0.18)';
      cfConfBadge.style.borderColor = 'rgba(0, 242, 254, 0.4)';
    } else if (confidence >= 65) {
      cfConfBadge.style.background = 'rgba(251, 191, 36, 0.18)';
      cfConfBadge.style.borderColor = 'rgba(251, 191, 36, 0.4)';
    } else {
      cfConfBadge.style.background = 'rgba(244, 63, 94, 0.18)';
      cfConfBadge.style.borderColor = 'rgba(244, 63, 94, 0.4)';
    }
  }

  // --- Render ghost marker for previous center on map ---
  if (mapLayers.cfPrevMarker) {
    mapInstance.removeLayer(mapLayers.cfPrevMarker);
    mapLayers.cfPrevMarker = null;
  }
  if (mapLayers.cfConnectLine) {
    mapInstance.removeLayer(mapLayers.cfConnectLine);
    mapLayers.cfConnectLine = null;
  }

  // Only render ghost if positions differ (i.e. storm has moved)
  if (prevLat !== currLat || prevLng !== currLng) {
    // Ghost marker: dashed ring + small dot for previous center
    const ghostIcon = L.divIcon({
      className: 'prev-center-marker',
      html: `<div class="ghost-ring"></div><div class="ghost-dot"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    mapLayers.cfPrevMarker = L.marker([prevLat, prevLng], {
      icon: ghostIcon,
      interactive: false,
      zIndexOffset: -100
    }).bindTooltip(`Previous Center Fix: ${prevLat.toFixed(1)}°N, ${prevLng.toFixed(1)}°E`, {
      direction: 'top',
      className: 'hud-tooltip',
      permanent: false
    }).addTo(mapInstance);

    // Dashed connection line from previous → current
    mapLayers.cfConnectLine = L.polyline(
      [[prevLat, prevLng], [currLat, currLng]],
      {
        color: '#94a3b8',
        weight: 2,
        dashArray: '6, 4',
        opacity: 0.5
      }
    ).addTo(mapInstance);
  }
}

// State for 15-Minute Observation Timeline
let currentObsIndex = 4;
let isObsPlaying = false;
let obsPlayInterval = null;

/**
 * Sync the 15-Minute Observation panel to a given step *without* overriding the HUD
 * (HUD is already updated by setForecastHour via updateHUD). Used when the forecast
 * timeline advances to reflect what the observation state would have looked like.
 */
function syncObsToForecastHour(stepIndex, forecastPt) {
  currentObsIndex = stepIndex;
  if (!window.cycloneData || !window.cycloneData.observations) return;
  const obs = window.cycloneData.observations[stepIndex];
  if (!obs) return;

  const timeEl = document.getElementById('currentObsTime');
  const windEl = document.getElementById('currentObsWind');
  const pressEl = document.getElementById('currentObsPressure');
  const changeEl = document.getElementById('currentObsChange');
  const noteEl = document.getElementById('currentObsNote');
  const fillEl = document.getElementById('obsProgressFill');

  // When forecast hour > 0 show forecast values in the obs panel too
  const windKmh = currentForecastHour > 0 ? Math.round((forecastPt.kts || 0) * 1.852) : obs.windKmh;
  const pressHpa = currentForecastHour > 0 ? forecastPt.hpa : obs.pressureHpa;
  const timeLabel = currentForecastHour > 0 ? `T+${currentForecastHour}h (${forecastPt.time || ''})` : `${obs.label} (${obs.time})`;
  const changeText = currentForecastHour > 0 ? forecastPt.desc : obs.intensityChange;
  const noteText = currentForecastHour > 0 ? (forecastPt.alert || forecastPt.desc) : obs.note;

  if (timeEl) timeEl.textContent = timeLabel;
  if (windEl) windEl.textContent = `${windKmh} km/h`;
  if (pressEl) pressEl.textContent = `${pressHpa} hPa`;
  if (changeEl) changeEl.textContent = changeText;
  if (noteEl) noteEl.textContent = noteText;
  if (fillEl) fillEl.style.width = `${currentForecastHour === 0 ? (stepIndex / 4) * 100 : 100}%`;

  // Highlight timeline node
  document.querySelectorAll('.timeline-step-node').forEach((node, idx) => {
    node.classList.toggle('active', currentForecastHour === 0 ? idx === stepIndex : idx === 4);
  });

  // RI detection from observation step (keep the RI panel accurate)
  const baselineObs = window.cycloneData.observations[0];
  const intensityIncrease = obs.windKmh - baselineObs.windKmh;
  const elapsedMinutes = stepIndex * 15;

  const bannerEl = document.getElementById('riProminentBanner');
  const bannerTitleEl = document.getElementById('riBannerTitle');
  const bannerIconEl = document.getElementById('riBannerIcon');
  const riChangeEl = document.getElementById('riIntensityChange');
  const riTimeEl = document.getElementById('riIntensityTime');
  const riProbEl = document.getElementById('riProbabilityVal');
  const statusBadge = document.getElementById('cycloneStatusText');
  const statusPulse = document.getElementById('statusPulseDot');
  const riCardTag = document.getElementById('riCardTag');

  let isRI = false;
  let riStatus = 'STABLE';
  let riProb = 12;

  if (currentForecastHour >= 24) {
    // Post-landfall: weakening
    riStatus = 'WEAKENING';
    riProb = 10;
  } else if (stepIndex === 4 || (currentForecastHour > 0 && currentForecastHour <= 18)) {
    isRI = true;
    riStatus = 'RAPID INTENSIFICATION';
    riProb = 82;
  } else if (stepIndex === 3 || intensityIncrease >= 20) {
    riStatus = 'ELEVATED';
    riProb = 65;
  } else if (stepIndex === 2 || intensityIncrease >= 10) {
    riStatus = 'MONITORING';
    riProb = 42;
  } else {
    riStatus = 'STABLE';
    riProb = stepIndex === 0 ? 12 : 24;
  }

  if (bannerEl) {
    bannerEl.classList.remove('ri-warning-active', 'ri-stable', 'ri-elevated');
    if (isRI) {
      bannerEl.classList.add('ri-warning-active');
      if (bannerTitleEl) bannerTitleEl.textContent = 'RAPID INTENSIFICATION DETECTED';
      if (bannerIconEl) bannerIconEl.textContent = '⚠️';
    } else if (riStatus === 'STABLE' || riStatus === 'WEAKENING') {
      bannerEl.classList.add('ri-stable');
      if (bannerTitleEl) bannerTitleEl.textContent = `CYCLONE STATUS: ${riStatus}`;
      if (bannerIconEl) bannerIconEl.textContent = '✓';
    } else {
      bannerEl.classList.add('ri-elevated');
      if (bannerTitleEl) bannerTitleEl.textContent = `CYCLONE STATUS: ${riStatus}`;
      if (bannerIconEl) bannerIconEl.textContent = '⚡';
    }
  }

  if (riChangeEl) {
    riChangeEl.textContent = `+${intensityIncrease} km/h`;
    riChangeEl.className = isRI ? 'ri-stat-value text-red' : (riStatus === 'STABLE' ? 'ri-stat-value text-green' : 'ri-stat-value text-yellow');
  }
  if (riTimeEl) riTimeEl.textContent = `${elapsedMinutes} minutes`;
  if (riProbEl) {
    riProbEl.textContent = `${riProb}%`;
    riProbEl.className = isRI ? 'ri-stat-value text-red' : (riStatus === 'STABLE' ? 'ri-stat-value text-green' : 'ri-stat-value text-yellow');
  }
  if (statusBadge) {
    statusBadge.textContent = `Cyclone Status: ${riStatus}`;
    statusBadge.style.color = isRI ? 'var(--alert-red)' : (riStatus === 'STABLE' ? 'var(--alert-green)' : 'var(--alert-yellow)');
  }
  if (statusPulse) {
    const color = isRI ? 'var(--alert-red)' : (riStatus === 'STABLE' ? 'var(--alert-green)' : 'var(--alert-yellow)');
    statusPulse.style.background = color;
    statusPulse.style.boxShadow = `0 0 8px ${color}`;
  }
  if (riCardTag) {
    riCardTag.textContent = riStatus;
    riCardTag.className = `card-mini-tag ${isRI ? 'red' : (riStatus === 'STABLE' ? 'purple' : 'red')}`;
  }

  // Update Physics-Guided RI Predictor Panel
  updatePhysicsGuidedRiPredictor(stepIndex, forecastPt);
}

// ==========================================================================
// Lightweight Prototype: Physics-Guided RI Predictor
// Transparent scoring layer based on 6 physical tensors (ConvLSTM/DL not trained)
// ==========================================================================
function updatePhysicsGuidedRiPredictor(stepIndex, forecastPt) {
  const envData = (window.cycloneData && window.cycloneData.environment) || {
    oceanHeatContent: 82,
    windShear: 9,
    distanceToCoast: 85
  };
  const obsList = (window.cycloneData && window.cycloneData.observations) || [
    { windKmh: 82, pressureHpa: 990 },
    { windKmh: 89, pressureHpa: 986 },
    { windKmh: 97, pressureHpa: 982 },
    { windKmh: 108, pressureHpa: 977 },
    { windKmh: 121, pressureHpa: 972 }
  ];
  const baseline = obsList[0];
  const idx = Math.max(0, Math.min(obsList.length - 1, stepIndex !== undefined ? stepIndex : 4));
  const obs = obsList[idx];

  const deltaWind = obs.windKmh - baseline.windKmh; // e.g. +39 km/h
  const deltaPress = obs.pressureHpa - baseline.pressureHpa; // e.g. -18 hPa
  const ohc = envData.oceanHeatContent; // 82 kJ/cm²
  const shear = envData.windShear; // 9 kt
  const coast = (currentForecastHour === 0) ? envData.distanceToCoast : (forecastPt && forecastPt.dist !== undefined ? Math.max(0, forecastPt.dist) : envData.distanceToCoast);
  const currentWind = obs.windKmh; // 121 km/h

  // Transparent prototype scoring heuristic:
  // 1. Ocean Heat Content: threshold >= 60 -> +25 pts
  const ohcScore = ohc >= 60 ? 25 : Math.round((ohc / 60) * 20);
  // 2. Wind Shear: threshold <= 15 -> +25 pts
  const shearScore = shear <= 15 ? 25 : Math.max(0, Math.round((1 - (shear - 15) / 20) * 20));
  // 3. Proximity to Coast: critical <= 150 km -> +18 pts
  const coastScore = coast <= 150 ? 18 : Math.max(0, Math.round((1 - (coast - 150) / 150) * 12));
  // 4. Intensity Trend: +30 km/h -> +10 pts
  const trendScore = deltaWind >= 30 ? 10 : Math.max(0, Math.round((deltaWind / 30) * 10));
  // 5. Pressure Drop: -15 hPa -> +4 pts
  const pressScore = deltaPress <= -15 ? 4 : Math.max(0, Math.round((-deltaPress / 15) * 4));

  // Compute total simulated probability
  const rawScore = ohcScore + shearScore + coastScore + trendScore + pressScore; // 25+25+18+10+4 = 82
  const isNowOrLive = (idx === 4 && currentForecastHour === 0);
  const probVal = isNowOrLive ? 82 : (currentForecastHour > 0 && currentForecastHour <= 18 ? 82 : Math.min(95, Math.max(12, rawScore)));

  let statusText = 'STABLE';
  let badgeClass = 'pg-status-badge stable';
  let color = 'var(--alert-green)';

  if (probVal >= 75 || isNowOrLive) {
    statusText = 'RAPID INTENSIFICATION';
    badgeClass = 'pg-status-badge active-ri';
    color = 'var(--alert-red)';
  } else if (probVal >= 50 || idx >= 2) {
    statusText = 'ELEVATED RISK';
    badgeClass = 'pg-status-badge elevated';
    color = 'var(--alert-yellow)';
  }

  // Update DOM elements
  const elTrend = document.getElementById('pgValTrend');
  const elOhc = document.getElementById('pgValOhc');
  const elShear = document.getElementById('pgValShear');
  const elPressure = document.getElementById('pgValPressure');
  const elCoast = document.getElementById('pgValCoast');
  const elWind = document.getElementById('pgValWind');
  const elProb = document.getElementById('pgProbVal');
  const elStatus = document.getElementById('pgStatusBadge');
  const elBar = document.getElementById('pgCalcBar');
  const elFormula = document.getElementById('pgCalcFormula');

  if (elTrend) elTrend.textContent = deltaWind >= 0 ? `+${deltaWind} km/h` : `${deltaWind} km/h`;
  if (elOhc) elOhc.textContent = `${ohc} kJ/cm²`;
  if (elShear) elShear.textContent = `${shear} kt`;
  if (elPressure) elPressure.textContent = `${deltaPress} hPa`;
  if (elCoast) elCoast.textContent = `${coast} km`;
  if (elWind) elWind.textContent = `${currentWind} km/h`;
  if (elProb) {
    elProb.textContent = `${probVal}%`;
    elProb.style.color = color;
  }
  if (elStatus) {
    elStatus.textContent = statusText;
    elStatus.className = badgeClass;
  }
  if (elBar) {
    elBar.style.width = `${probVal}%`;
    elBar.style.background = color;
  }
  if (elFormula) {
    elFormula.textContent = `RI Risk Score: ${probVal}/100 • OHC(${ohcScore}) + Shear(${shearScore}) + Coast(${coastScore}) + Trend(${trendScore + pressScore})`;
  }
}

/**
 * Update the flow pipeline indicator: highlight which steps are active at current forecast hour.
 */
function updateFlowPipeline(hour, pt) {
  const nodes = document.querySelectorAll('.flow-node');
  if (!nodes.length) return;

  // Steps: 0=satellite, 1=obs, 2=centerfix, 3=ri, 4=riwatch, 5=forecast
  nodes.forEach((n, i) => {
    n.classList.remove('flow-node-active', 'flow-node-done', 'flow-node-warn');
    if (i < 5) {
      n.classList.add('flow-node-done');
    }
  });

  // Mark the forecast node as active/warn based on hour
  if (nodes[5]) {
    nodes[5].classList.remove('flow-node-done');
    nodes[5].classList.add(hour === 0 ? 'flow-node-active' : (hour < 24 ? 'flow-node-warn' : 'flow-node-done'));
  }

  // Update the flow status label if present
  const flowStatus = document.getElementById('flowStatusLabel');
  if (flowStatus) {
    if (hour === 0) {
      flowStatus.textContent = 'LIVE • All systems nominal';
      flowStatus.style.color = 'var(--alert-green)';
    } else if (hour < 24) {
      flowStatus.textContent = `T+${hour}h • RI active • ${pt.dist} km coast`;
      flowStatus.style.color = 'var(--alert-orange)';
    } else if (hour === 24) {
      flowStatus.textContent = 'LANDFALL IMMINENT • T+24h';
      flowStatus.style.color = 'var(--alert-red)';
    } else {
      flowStatus.textContent = `T+${hour}h • ${pt.desc}`;
      flowStatus.style.color = 'var(--text-muted)';
    }
  }
}

// Select and render specific 15-minute observation
function selectObservation(stepIndex) {
  currentObsIndex = stepIndex;
  
  if (!window.cycloneData || !window.cycloneData.observations) return;
  const obs = window.cycloneData.observations[stepIndex];
  if (!obs) return;

  // 1. Update Observation Panel Elements
  const timeEl = document.getElementById('currentObsTime');
  const windEl = document.getElementById('currentObsWind');
  const pressEl = document.getElementById('currentObsPressure');
  const changeEl = document.getElementById('currentObsChange');
  const noteEl = document.getElementById('currentObsNote');
  const fillEl = document.getElementById('obsProgressFill');

  if (timeEl) timeEl.textContent = `${obs.label} (${obs.time})`;
  if (windEl) windEl.textContent = `${obs.windKmh} km/h`;
  if (pressEl) pressEl.textContent = `${obs.pressureHpa} hPa`;
  if (changeEl) changeEl.textContent = obs.intensityChange;
  if (noteEl) noteEl.textContent = obs.note;
  if (fillEl) fillEl.style.width = `${(stepIndex / 4) * 100}%`;

  // 2. Update Timeline Node Highlights
  document.querySelectorAll('.timeline-step-node').forEach((node, idx) => {
    node.classList.toggle('active', idx === stepIndex);
  });

  // 3. Update Current Intensity Information on Dashboard Shell
  const kts = Math.round(obs.windKmh / 1.852);
  const hudWind = document.getElementById('hudWindSpeed');
  if (hudWind) hudWind.textContent = kts;

  const hudWindMetric = document.querySelector('.hud-metric-row span:last-child');
  if (hudWindMetric) hudWindMetric.textContent = `(${obs.windKmh} km/h)`;

  const hudPressure = document.getElementById('hudPressure');
  if (hudPressure) hudPressure.textContent = `Central Pressure: ${obs.pressureHpa} hPa • Eye Diameter: 18 km`;

  const stormCat = document.getElementById('stormCategory');
  if (stormCat) stormCat.textContent = obs.category;

  const rapidAlert = document.getElementById('rapidAlertText');
  if (rapidAlert) rapidAlert.textContent = obs.note;

  // 4. Update Map Wind Radii to match current observation intensity
  const scenario = SCENARIOS[currentScenarioKey];
  if (scenario && scenario.forecastTrack && scenario.forecastTrack[0]) {
    const curPt = scenario.forecastTrack[0];
    updateWindRadii(curPt.lat, curPt.lng, kts);
  }

  // 5. Rapid Intensification (RI) Detection Logic
  const baselineObs = window.cycloneData.observations[0];
  const intensityIncrease = obs.windKmh - baselineObs.windKmh;
  const elapsedMinutes = stepIndex * 15;

  const bannerEl = document.getElementById('riProminentBanner');
  const bannerTitleEl = document.getElementById('riBannerTitle');
  const bannerIconEl = document.getElementById('riBannerIcon');
  const riChangeEl = document.getElementById('riIntensityChange');
  const riTimeEl = document.getElementById('riIntensityTime');
  const riProbEl = document.getElementById('riProbabilityVal');
  const statusBadge = document.getElementById('cycloneStatusText');
  const statusPulse = document.getElementById('statusPulseDot');
  const riCardTag = document.getElementById('riCardTag');

  let isRI = false;
  let riStatus = "STABLE";
  let riProb = 12;

  // Simple prototype RI logic: Rapid increase threshold +30 km/h in 60m
  if (stepIndex === 4 || intensityIncrease >= 30) {
    isRI = true;
    riStatus = "RAPID INTENSIFICATION";
    riProb = 82; // 82% requested
  } else if (stepIndex === 3 || intensityIncrease >= 20) {
    riStatus = "ELEVATED";
    riProb = 65;
  } else if (stepIndex === 2 || intensityIncrease >= 10) {
    riStatus = "MONITORING";
    riProb = 42;
  } else {
    riStatus = "STABLE";
    riProb = stepIndex === 0 ? 12 : 24;
  }

  // Update Prominent Warning Indicator
  if (bannerEl) {
    bannerEl.classList.remove('ri-warning-active', 'ri-stable', 'ri-elevated');
    if (isRI) {
      bannerEl.classList.add('ri-warning-active');
      if (bannerTitleEl) bannerTitleEl.textContent = "RAPID INTENSIFICATION DETECTED";
      if (bannerIconEl) bannerIconEl.textContent = "⚠️";
    } else if (riStatus === "STABLE") {
      bannerEl.classList.add('ri-stable');
      if (bannerTitleEl) bannerTitleEl.textContent = "CYCLONE STATUS: STABLE";
      if (bannerIconEl) bannerIconEl.textContent = "✓";
    } else {
      bannerEl.classList.add('ri-elevated');
      if (bannerTitleEl) bannerTitleEl.textContent = `CYCLONE STATUS: ${riStatus}`;
      if (bannerIconEl) bannerIconEl.textContent = "⚡";
    }
  }

  if (riChangeEl) {
    riChangeEl.textContent = `+${intensityIncrease} km/h`;
    riChangeEl.className = isRI ? 'ri-stat-value text-red' : (riStatus === 'STABLE' ? 'ri-stat-value text-green' : 'ri-stat-value text-yellow');
  }
  if (riTimeEl) {
    riTimeEl.textContent = `${elapsedMinutes} minutes`;
  }
  if (riProbEl) {
    riProbEl.textContent = `${riProb}%`;
    riProbEl.className = isRI ? 'ri-stat-value text-red' : (riStatus === 'STABLE' ? 'ri-stat-value text-green' : 'ri-stat-value text-yellow');
  }

  // Update Status Badge in Header
  if (statusBadge) {
    statusBadge.textContent = `Cyclone Status: ${riStatus}`;
    statusBadge.style.color = isRI ? 'var(--alert-red)' : (riStatus === 'STABLE' ? 'var(--alert-green)' : 'var(--alert-yellow)');
  }

  if (statusPulse) {
    const color = isRI ? 'var(--alert-red)' : (riStatus === 'STABLE' ? 'var(--alert-green)' : 'var(--alert-yellow)');
    statusPulse.style.background = color;
    statusPulse.style.boxShadow = `0 0 8px ${color}`;
  }

  // Update Physics-Guided RI Predictor Panel
  updatePhysicsGuidedRiPredictor(stepIndex, null);

  // 6. Update obs sparkline chart cursor to reflect active step
  renderObsCharts();
}

// Observation Timeline Play / Pause Controller
function toggleObsPlay() {
  if (isObsPlaying) {
    stopObsPlay();
  } else {
    startObsPlay();
  }
}

function startObsPlay() {
  isObsPlaying = true;
  const btn = document.getElementById('obsPlayBtn');
  if (btn) {
    btn.innerHTML = '❚❚ Pause';
    btn.classList.add('playing');
  }

  obsPlayInterval = setInterval(() => {
    let nextStep = currentObsIndex + 1;
    if (nextStep > 4) nextStep = 0;
    selectObservation(nextStep);
  }, 1400);
}

function stopObsPlay() {
  isObsPlaying = false;
  if (obsPlayInterval) {
    clearInterval(obsPlayInterval);
    obsPlayInterval = null;
  }
  const btn = document.getElementById('obsPlayBtn');
  if (btn) {
    btn.innerHTML = '▶ Play';
    btn.classList.remove('playing');
  }
}

// 8. Innovation 1: Intra-Cycle Rapid Intelligence
function updateInnovation1(stepIndex) {
  selectObservation(stepIndex);
}

// 9. Innovation 2: Near-Coast RI Watch

/**
 * Prototype risk calculation:
 * High ocean heat + Low wind shear + Close to coast = High RI Risk
 */
function calculateNearCoastRIRisk(ohc, windShear, distanceKm) {
  const highHeat = ohc >= 60;          // Threshold: >= 60 kJ/cm²
  const lowShear = windShear <= 15;     // Threshold: <= 15 kt
  const closeCoast = distanceKm <= 150; // Threshold: <= 150 km

  let triggers = 0;
  if (highHeat) triggers++;
  if (lowShear) triggers++;
  if (closeCoast) triggers++;

  let riskLevel = 'LOW';
  let badgeColor = 'var(--alert-green)';
  let verdictText = `${triggers} / 3 Triggers Met`;

  if (triggers === 3) {
    riskLevel = 'HIGH';
    badgeColor = 'var(--alert-red)';
    verdictText = 'All 3 Triggers Met (High RI Risk)';
  } else if (triggers === 2) {
    riskLevel = 'MODERATE';
    badgeColor = 'var(--alert-yellow)';
    verdictText = '2 / 3 Triggers Met (Elevated RI Risk)';
  }

  return {
    highHeat,
    lowShear,
    closeCoast,
    triggers,
    riskLevel,
    badgeColor,
    verdictText
  };
}

function updateNearCoastRiWatch(currentPoint) {
  // Use existing mock data from cycloneData
  const envData = (window.cycloneData && window.cycloneData.environment) || {
    oceanHeatContent: 82,
    windShear: 9,
    distanceToCoast: 85
  };

  const scenario = SCENARIOS[currentScenarioKey];
  const pt = currentPoint || (scenario && scenario.forecastTrack[0]) || { lat: 18.2, lng: 86.8, dist: 85 };

  const ohc = envData.oceanHeatContent; // 82 kJ/cm²
  const windShear = envData.windShear; // 9 kt
  // If at live now (hour 0), use mock distance 85 km as specified by user, else pt.dist
  const distanceKm = (currentForecastHour === 0)
    ? envData.distanceToCoast
    : (pt.dist !== undefined ? Math.max(0, pt.dist) : envData.distanceToCoast);

  const calc = calculateNearCoastRIRisk(ohc, windShear, distanceKm);

  // --- 1. Update Dashboard Card Elements ---
  const riRiskBadge = document.getElementById('riRiskBadge');
  const riRiskStatusText = document.getElementById('riRiskStatusText');
  const riBannerTitle = document.getElementById('riBannerTitle');
  const riBannerSub = document.getElementById('riBannerSub');
  const riCalcVerdict = document.getElementById('riCalcVerdict');

  if (riRiskBadge) {
    riRiskBadge.textContent = `Risk: ${calc.riskLevel}`;
    riRiskBadge.className = `card-mini-tag ${calc.riskLevel === 'HIGH' ? 'red' : (calc.riskLevel === 'MODERATE' ? 'yellow' : 'green')}`;
  }
  if (riRiskStatusText) {
    riRiskStatusText.textContent = calc.riskLevel;
    riRiskStatusText.style.color = calc.badgeColor;
  }
  if (riBannerTitle) {
    riBannerTitle.textContent = `NEAR-COAST RI WATCH ${calc.riskLevel === 'HIGH' ? 'ACTIVE' : (calc.riskLevel === 'MODERATE' ? 'ELEVATED' : 'MONITORING')}`;
    riBannerTitle.style.color = calc.badgeColor;
  }
  if (riBannerSub) {
    riBannerSub.textContent = calc.riskLevel === 'HIGH'
      ? 'Near-shore thermal coupling & favorable shear driving rapid spin-up'
      : (calc.riskLevel === 'MODERATE' ? 'Marginal conditions present near coastal perimeter' : 'Environmental factors suppressing near-coast intensification');
  }
  if (riCalcVerdict) {
    riCalcVerdict.textContent = calc.verdictText;
    riCalcVerdict.style.color = calc.badgeColor;
  }

  // Update formula nodes
  const calcValOhc = document.getElementById('calcValOhc');
  const calcValShear = document.getElementById('calcValShear');
  const calcValCoast = document.getElementById('calcValCoast');
  const calcResultLabel = document.getElementById('calcResultLabel');
  const calcBadgeText = document.getElementById('calcBadgeText');
  const calcNodeResult = document.getElementById('calcNodeResult');

  if (calcValOhc) calcValOhc.textContent = `${ohc} kJ/cm²`;
  if (calcValShear) calcValShear.textContent = `${windShear} kt`;
  if (calcValCoast) calcValCoast.textContent = `${distanceKm} km`;
  if (calcResultLabel) {
    calcResultLabel.textContent = `${calc.riskLevel} RI Risk`;
    calcResultLabel.style.color = calc.badgeColor;
  }
  if (calcBadgeText) {
    calcBadgeText.textContent = calc.riskLevel === 'HIGH' ? 'TRIGGERED' : (calc.riskLevel === 'MODERATE' ? 'ELEVATED' : 'STANDBY');
    calcBadgeText.style.background = calc.badgeColor;
  }
  if (calcNodeResult) {
    calcNodeResult.style.borderColor = calc.badgeColor;
  }

  // Update Environmental Factors Grid
  const tensorOhc = document.getElementById('tensorOhc');
  const tensorVws = document.getElementById('tensorVws');
  const tensorCoast = document.getElementById('tensorCoast');
  const barOhc = document.getElementById('barOhc');
  const barShear = document.getElementById('barShear');
  const barCoast = document.getElementById('barCoast');

  if (tensorOhc) tensorOhc.textContent = `${ohc} kJ/cm²`;
  if (tensorVws) tensorVws.textContent = `${windShear} kt`;
  if (tensorCoast) tensorCoast.textContent = `${distanceKm} km`;

  if (barOhc) barOhc.style.width = `${Math.min(100, Math.round((ohc / 100) * 100))}%`;
  if (barShear) barShear.style.width = `${Math.min(100, Math.round((windShear / 30) * 100))}%`;
  if (barCoast) barCoast.style.width = `${Math.min(100, Math.max(10, Math.round((1 - distanceKm / 200) * 100)))}%`;

  // --- 2. Connect Warning Visually to Cyclone on Leaflet Map ---
  if (!mapInstance) return;

  // Clean old RI Watch layers
  if (mapLayers.riWatchHalo) mapInstance.removeLayer(mapLayers.riWatchHalo);
  if (mapLayers.riWatchLine) mapInstance.removeLayer(mapLayers.riWatchLine);
  if (mapLayers.riWatchBeacon) mapInstance.removeLayer(mapLayers.riWatchBeacon);

  if (!layerVisibility.riWatch) return;

  const stormPos = [pt.lat, pt.lng];

  // A. Danger Halo around storm center (85 km or distanceKm buffer)
  const haloRadiusMeters = Math.max(40000, distanceKm * 1000);
  mapLayers.riWatchHalo = L.circle(stormPos, {
    radius: haloRadiusMeters,
    color: '#f43f5e',
    weight: 2,
    dashArray: '6, 6',
    fillColor: '#f43f5e',
    fillOpacity: 0.08
  }).addTo(mapInstance);

  // B. Nearest coastal landfall target coordinate (Puri coast: 19.81, 85.83 or closest point in coastline)
  let nearestCoast = { lat: 19.81, lng: 85.83, name: "Puri Coast" };
  if (window.cycloneData && window.cycloneData.geo && window.cycloneData.geo.coastline) {
    let minDist = Infinity;
    window.cycloneData.geo.coastline.forEach(c => {
      const d = haversineKm(pt.lat, pt.lng, c.lat, c.lng);
      if (d < minDist) {
        minDist = d;
        nearestCoast = c;
      }
    });
  }

  // C. Hazard Ray connecting Cyclone Center to Coastline
  mapLayers.riWatchLine = L.polyline([stormPos, [nearestCoast.lat, nearestCoast.lng]], {
    color: '#f43f5e',
    weight: 3,
    dashArray: '8, 6',
    opacity: 0.9,
    className: 'ri-hazard-line'
  }).bindTooltip(`⚠️ Near-Coast RI Watch: ${distanceKm} km to ${nearestCoast.name || 'Coast'} (Risk: ${calc.riskLevel})`, {
    sticky: true,
    className: 'hud-tooltip'
  }).addTo(mapInstance);

  // D. Floating Warning Beacon attached to Cyclone Location
  const beaconIcon = L.divIcon({
    className: 'custom-ri-beacon',
    html: `
      <div class="ri-map-beacon" onclick="const c = document.getElementById('nearCoastRiCard'); if(c) c.scrollIntoView({ behavior: 'smooth' });">
        <div class="ri-beacon-header">
          <span class="beacon-pulse"></span>
          <span>NEAR-COAST RI WATCH</span>
        </div>
        <div class="ri-beacon-body">
          <span class="beacon-risk">Risk: ${calc.riskLevel}</span>
          <span class="beacon-dist">${distanceKm} km to Coast</span>
        </div>
      </div>
    `,
    iconSize: [160, 40],
    iconAnchor: [80, 20]
  });

  mapLayers.riWatchBeacon = L.marker(stormPos, {
    icon: beaconIcon,
    zIndexOffset: 500
  }).addTo(mapInstance);
}

// Alias for backwards compatibility
function updateInnovation2(ncRi) {
  updateNearCoastRiWatch();
}

// 10. Innovation 3: Probabilistic Forecast & Sectors
function updateInnovation3(scenario) {
  // Update Chart Paths
  document.getElementById('chartP90').setAttribute('d', scenario.chartPoints.p90);
  document.getElementById('chartP50').setAttribute('d', scenario.chartPoints.p50);
  document.getElementById('chartP10').setAttribute('d', scenario.chartPoints.p10);
  document.getElementById('chartAreaPath').setAttribute('d', scenario.chartPoints.area);
  document.getElementById('landfallEta').textContent = scenario.landfallEta;

  // Initialize Forecast Point Details with 0h (or 24h default)
  updateForecastPointDetails(currentForecastHour || 0);

  // Update Landfall Sectors
  const sectorsContainer = document.getElementById('landfallSectors');
  sectorsContainer.innerHTML = '';
  scenario.landfallSectors.forEach(sec => {
    const row = document.createElement('div');
    row.className = 'sector-row';
    row.innerHTML = `
      <span class="sector-name" title="${sec.name}">${sec.name}</span>
      <div class="sector-bar-wrapper">
        <div class="sector-fill" style="width: ${sec.prob}%; background: ${sec.color};"></div>
      </div>
      <span class="sector-val">${sec.prob}%</span>
    `;
    sectorsContainer.appendChild(row);
  });
}

/**
 * Update the details inspection box in Card 3 for the given hour
 */
function updateForecastPointDetails(hour) {
  // Find exact or closest forecast point
  let p = PROBABILISTIC_FORECAST_POINTS.find(item => item.hour === hour);
  if (!p) {
    p = PROBABILISTIC_FORECAST_POINTS.reduce((prev, curr) =>
      Math.abs(curr.hour - hour) < Math.abs(prev.hour - hour) ? curr : prev
    );
  }
  if (!p) return;

  // Highlight selector chip
  document.querySelectorAll('.fc-pt-chip').forEach(c => c.classList.remove('active'));
  const activeChip = document.getElementById(`chip-${p.hour}`);
  if (activeChip) activeChip.classList.add('active');

  // Update Detail Card
  const fiHourTitle = document.getElementById('fiHourTitle');
  const fiForecastTime = document.getElementById('fiForecastTime');
  const fiConfidenceVal = document.getElementById('fiConfidenceVal');
  const fiWindSpeed = document.getElementById('fiWindSpeed');
  const fiWindKts = document.getElementById('fiWindKts');
  const fiConfidence = document.getElementById('fiConfidence');
  const fiConfBar = document.getElementById('fiConfBar');
  const fiConeWidth = document.getElementById('fiConeWidth');
  const fiStatusText = document.getElementById('fiStatusText');
  const fiImpactZone = document.getElementById('fiImpactZone');

  if (fiHourTitle) fiHourTitle.textContent = `${p.hour} HOURS`;
  if (fiForecastTime) fiForecastTime.textContent = p.time;
  if (fiConfidenceVal) fiConfidenceVal.textContent = `${p.confidence}%`;
  if (fiWindSpeed) fiWindSpeed.textContent = `${p.windKmh} km/h`;
  if (fiWindKts) fiWindKts.textContent = `(${p.kts} kts)`;
  if (fiConfidence) fiConfidence.textContent = `${p.confidence}%`;
  if (fiConfBar) fiConfBar.style.width = `${p.confidence}%`;
  if (fiConeWidth) fiConeWidth.textContent = `±${p.coneRadiusKm} km`;
  if (fiStatusText) {
    fiStatusText.textContent = p.isLandfall ? 'DIRECT LANDFALL' : (p.hour >= 48 ? 'Inland Track' : 'Approaching Coast');
    fiStatusText.className = p.isLandfall ? 'fi-metric-val text-red' : (p.hour === 0 ? 'fi-metric-val text-yellow' : 'fi-metric-val');
  }
  if (fiImpactZone) fiImpactZone.textContent = p.status;

  // Highlight waypoint pin on map
  document.querySelectorAll('.f-pin').forEach(pin => pin.classList.remove('active'));
  const activePin = document.getElementById(`fpin-${p.hour}`);
  if (activePin) activePin.classList.add('active');
}

/**
 * User clicks a forecast point (on map or chip):
 * Selects point, moves timeline, opens popup
 */
function selectForecastPoint(hour) {
  updateForecastPointDetails(hour);
  setForecastHour(hour);

  // Open corresponding map popup
  const idx = PROBABILISTIC_FORECAST_POINTS.findIndex(item => item.hour === hour);
  if (idx !== -1 && mapLayers.forecastPointMarkers && mapLayers.forecastPointMarkers[idx]) {
    mapLayers.forecastPointMarkers[idx].openPopup();
  }
}

// 11. Event Handlers & Controls
function setupEventHandlers() {
  // Automated Walkthrough Demo Mode
  const startDemoBtn = document.getElementById('startDemoBtn');
  if (startDemoBtn) {
    startDemoBtn.addEventListener('click', toggleDemo);
  }

  // Scenario Switcher
  const selector = document.getElementById('scenarioSelector');
  selector.addEventListener('change', (e) => {
    stopDemo();
    stopPlay();
    loadScenario(e.target.value);
  });

  // Time Slider
  const slider = document.getElementById('timeSlider');
  slider.addEventListener('input', (e) => {
    stopPlay();
    setForecastHour(parseInt(e.target.value, 10));
  });

  // Play / Pause Button
  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopPlay();
    } else {
      startPlay();
    }
  });

  // ── Previous / Next step buttons ──
  const prevHourBtn = document.getElementById('prevHourBtn');
  if (prevHourBtn) {
    prevHourBtn.addEventListener('click', () => {
      stopPlay();
      const hours = [0, 6, 12, 18, 24, 36, 48, 72];
      const idx = hours.indexOf(currentForecastHour);
      const prev = idx > 0 ? hours[idx - 1] : hours[0];
      setForecastHour(prev);
    });
  }

  const nextHourBtn = document.getElementById('nextHourBtn');
  if (nextHourBtn) {
    nextHourBtn.addEventListener('click', () => {
      stopPlay();
      const hours = [0, 6, 12, 18, 24, 36, 48, 72];
      const idx = hours.indexOf(currentForecastHour);
      const next = idx < hours.length - 1 ? hours[idx + 1] : hours[hours.length - 1];
      setForecastHour(next);
    });
  }

  // Reset to NOW (T+0)
  const resetTrackBtn = document.getElementById('resetTrackBtn');
  if (resetTrackBtn) {
    resetTrackBtn.addEventListener('click', () => {
      stopPlay();
      setForecastHour(0);
    });
  }

  // Recenter map on current storm position
  const recenterMapBtn = document.getElementById('recenterMapBtn');
  if (recenterMapBtn) {
    recenterMapBtn.addEventListener('click', () => {
      if (mapInstance && mapLayers.stormMarker) {
        const latlng = mapLayers.stormMarker.getLatLng();
        mapInstance.setView(latlng, 7, { animate: true });
      }
    });
  }

  // 15-Minute Observation Timeline Play / Pause Button
  const obsPlayBtn = document.getElementById('obsPlayBtn');
  if (obsPlayBtn) {
    obsPlayBtn.addEventListener('click', () => {
      toggleObsPlay();
    });
  }

  // 15-Minute Observation Stepped Nodes
  document.querySelectorAll('.timeline-step-node').forEach(node => {
    node.addEventListener('click', () => {
      stopObsPlay();
      const step = parseInt(node.getAttribute('data-step'), 10);
      selectObservation(step);
    });
  });

  // Rapid Scan Step Buttons (Innovation 1 legacy fallback)
  document.querySelectorAll('#rapidScanButtons .rapid-step-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      stopObsPlay();
      const step = parseInt(e.target.getAttribute('data-step'), 10);
      selectObservation(step);
    });
  });

  // Layer Toggles
  document.getElementById('toggleConeBtn').addEventListener('click', (e) => {
    layerVisibility.cone = !layerVisibility.cone;
    e.target.classList.toggle('active', layerVisibility.cone);
    applyLayerVisibility();
  });

  document.getElementById('toggleEnsembleBtn').addEventListener('click', (e) => {
    layerVisibility.ensemble = !layerVisibility.ensemble;
    e.target.classList.toggle('active', layerVisibility.ensemble);
    applyLayerVisibility();
  });

  document.getElementById('toggleRadiiBtn').addEventListener('click', (e) => {
    layerVisibility.radii = !layerVisibility.radii;
    e.target.classList.toggle('active', layerVisibility.radii);
    applyLayerVisibility();
  });

  const riWatchBtn = document.getElementById('toggleRiWatchBtn');
  if (riWatchBtn) {
    riWatchBtn.addEventListener('click', (e) => {
      layerVisibility.riWatch = !layerVisibility.riWatch;
      e.target.classList.toggle('active', layerVisibility.riWatch);
      applyLayerVisibility();
    });
  }

  // Waypoints Toggle
  const pointsBtn = document.getElementById('togglePointsBtn');
  if (pointsBtn) {
    pointsBtn.addEventListener('click', (e) => {
      layerVisibility.waypoints = !layerVisibility.waypoints;
      e.target.classList.toggle('active', layerVisibility.waypoints);
      applyLayerVisibility();
    });
  }

  // Forecast Point Chips Click Handlers
  document.querySelectorAll('.fc-pt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const hour = parseInt(chip.getAttribute('data-hour'), 10);
      selectForecastPoint(hour);
    });
  });

  // Multi-Source Satellite Observation Tabs
  document.querySelectorAll('.sat-tab-card').forEach(tab => {
    tab.addEventListener('click', () => {
      const sourceKey = tab.getAttribute('data-source');
      selectSatelliteSource(sourceKey);
    });
  });

  // Initialize satellite panel with default source (insat)
  selectSatelliteSource('insat');

  // Initialize flow pipeline on load
  updateFlowPipeline(0, SCENARIOS[currentScenarioKey].forecastTrack[0]);
}

/**
 * Update Multi-Source Satellite Observation panel
 */
function selectSatelliteSource(sourceKey) {
  const data = SATELLITE_SOURCES[sourceKey];
  if (!data) return;

  // 1. Update tab active states
  document.querySelectorAll('.sat-tab-card').forEach(tab => {
    const isSelected = tab.getAttribute('data-source') === sourceKey;
    tab.classList.toggle('active', isSelected);
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  // 2. Update Detail Card
  const sodSourceBadge = document.getElementById('sodSourceBadge');
  const sodFeatureLabel = document.getElementById('sodFeatureLabel');
  const sodTimeTag = document.getElementById('sodTimeTag');
  const sodSensorVal = document.getElementById('sodSensorVal');
  const sodTargetVal = document.getElementById('sodTargetVal');
  const sodDiagVal = document.getElementById('sodDiagVal');
  const sodResVal = document.getElementById('sodResVal');
  const sodNote = document.getElementById('sodNote');

  if (sodSourceBadge) {
    sodSourceBadge.textContent = data.sourceName;
    sodSourceBadge.style.color = data.badgeColor;
    sodSourceBadge.style.borderColor = data.badgeColor;
  }
  if (sodFeatureLabel) sodFeatureLabel.textContent = data.feature;
  if (sodTimeTag) sodTimeTag.textContent = data.time;
  if (sodSensorVal) sodSensorVal.textContent = data.sensorModality;
  if (sodTargetVal) sodTargetVal.textContent = data.primaryTarget;
  if (sodDiagVal) sodDiagVal.textContent = data.coreDiagnostic;
  if (sodResVal) sodResVal.textContent = data.resolution;
  if (sodNote) sodNote.textContent = data.note;
}

function applyLayerVisibility() {
  if (!mapInstance) return;
  if (mapLayers.cone95) {
    if (layerVisibility.cone) mapInstance.addLayer(mapLayers.cone95);
    else mapInstance.removeLayer(mapLayers.cone95);
  }
  if (mapLayers.cone68) {
    if (layerVisibility.cone) mapInstance.addLayer(mapLayers.cone68);
    else mapInstance.removeLayer(mapLayers.cone68);
  }
  mapLayers.ensembles.forEach(line => {
    if (layerVisibility.ensemble) mapInstance.addLayer(line);
    else mapInstance.removeLayer(line);
  });
  if (mapLayers.riWatchHalo) {
    if (layerVisibility.riWatch) mapInstance.addLayer(mapLayers.riWatchHalo);
    else mapInstance.removeLayer(mapLayers.riWatchHalo);
  }
  if (mapLayers.riWatchLine) {
    if (layerVisibility.riWatch) mapInstance.addLayer(mapLayers.riWatchLine);
    else mapInstance.removeLayer(mapLayers.riWatchLine);
  }
  if (mapLayers.riWatchBeacon) {
    if (layerVisibility.riWatch) mapInstance.addLayer(mapLayers.riWatchBeacon);
    else mapInstance.removeLayer(mapLayers.riWatchBeacon);
  }
  if (mapLayers.forecastPointMarkers) {
    mapLayers.forecastPointMarkers.forEach(m => {
      if (layerVisibility.waypoints) mapInstance.addLayer(m);
      else mapInstance.removeLayer(m);
    });
  }
  if (!layerVisibility.radii) {
    if (mapLayers.radii64) mapInstance.removeLayer(mapLayers.radii64);
    if (mapLayers.radii50) mapInstance.removeLayer(mapLayers.radii50);
    if (mapLayers.radii34) mapInstance.removeLayer(mapLayers.radii34);
  } else {
    const scenario = SCENARIOS[currentScenarioKey];
    let pt = scenario.forecastTrack.find(p => p.hour === currentForecastHour) || scenario.forecastTrack[0];
    updateWindRadii(pt.lat, pt.lng, pt.kts);
  }
}

function startPlay() {
  isPlaying = true;
  document.getElementById('playBtn').textContent = '❚❚';
  playInterval = setInterval(() => {
    let nextHour = currentForecastHour + 6;
    if (nextHour > 72) nextHour = 0;
    setForecastHour(nextHour);
  }, 1400);
}

function stopPlay() {
  isPlaying = false;
  document.getElementById('playBtn').textContent = '▶';
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
}

function startClock() {
  setInterval(() => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      clockEl.textContent = `LIVE: ${utcHours}:${utcMins} UTC`;
    }
  }, 1000);
}

// ==========================================================================
// Automated 42-Second Demo Mode Controller
// ==========================================================================
let isDemoRunning = false;
let demoTimeouts = [];

function toggleDemo() {
  if (isDemoRunning) {
    stopDemo();
  } else {
    startDemo();
  }
}

function stopDemo() {
  isDemoRunning = false;
  demoTimeouts.forEach(t => clearTimeout(t));
  demoTimeouts = [];

  const btn = document.getElementById('startDemoBtn');
  const btnText = document.getElementById('demoBtnText');
  const btnIcon = document.querySelector('.demo-btn-icon');
  if (btn) btn.classList.remove('running');
  if (btnText) btnText.textContent = 'START DEMO';
  if (btnIcon) btnIcon.textContent = '▶';

  const flowStatusLabel = document.getElementById('flowStatusLabel');
  if (flowStatusLabel) flowStatusLabel.textContent = 'LIVE • All systems nominal';
}

function startDemo() {
  stopPlay();
  stopObsPlay();
  stopDemo();

  isDemoRunning = true;
  const btn = document.getElementById('startDemoBtn');
  const btnText = document.getElementById('demoBtnText');
  const btnIcon = document.querySelector('.demo-btn-icon');
  if (btn) btn.classList.add('running');
  if (btnText) btnText.textContent = 'STOP DEMO';
  if (btnIcon) btnIcon.textContent = '⏹';

  const flowStatusLabel = document.getElementById('flowStatusLabel');
  const setDemoStatus = (text) => {
    if (flowStatusLabel) flowStatusLabel.textContent = text;
  };

  const scheduleStep = (fn, delayMs) => {
    const tid = setTimeout(() => {
      if (!isDemoRunning) return;
      fn();
    }, delayMs);
    demoTimeouts.push(tid);
  };

  // ── INITIAL RESET (0.0s): Load Bay of Bengal scenario baseline ──
  loadScenario('bay_of_bengal');
  setForecastHour(0);
  selectObservation(0); // T-60 baseline (82 km/h)
  selectSatelliteSource('insat');
  setDemoStatus('DEMO [1/7]: Satellite observation appears (INSAT-3DS)');

  // ── STEP 1: Satellite observation appears (0.5s - 5.5s) ──
  scheduleStep(() => {
    selectSatelliteSource('insat');
    updateFlowPipeline(0, SCENARIOS.bay_of_bengal.forecastTrack[0]);
    const n1 = document.getElementById('flowNodeSat');
    if (n1) n1.classList.add('flow-node-active');
    setDemoStatus('DEMO [1/7]: Satellite observation appears • INSAT-3DS Geostationary IR');
  }, 500);

  scheduleStep(() => {
    selectSatelliteSource('microwave');
    setDemoStatus('DEMO [1/7]: Multi-Source Satellite • Polar Microwave 89 GHz Sounder');
  }, 2500);

  scheduleStep(() => {
    selectSatelliteSource('oscat');
    setDemoStatus('DEMO [1/7]: Multi-Source Satellite • OSCAT Surface Wind Vectors');
  }, 4500);

  scheduleStep(() => {
    selectSatelliteSource('insat');
  }, 6000);

  // ── STEP 2 & 3: Timeline advances & Cyclone intensity increases (6.5s - 16.5s) ──
  scheduleStep(() => {
    selectObservation(1); // T-45: 89 km/h
    setDemoStatus('DEMO [2/7]: Timeline advances → T-45 • Intensity: 89 km/h');
  }, 7000);

  scheduleStep(() => {
    selectObservation(2); // T-30: 97 km/h
    setDemoStatus('DEMO [2/7]: Timeline advances → T-30 • Intensity: 97 km/h (Bursts Deepening)');
  }, 9500);

  scheduleStep(() => {
    selectObservation(3); // T-15: 108 km/h
    setDemoStatus('DEMO [3/7]: Cyclone intensity surging → T-15 • 108 km/h (Eyewall Wrap)');
  }, 12000);

  scheduleStep(() => {
    selectObservation(4); // NOW: 121 km/h (+39 km/h surge!)
    setDemoStatus('DEMO [3/7]: Cyclone intensity reaches 121 km/h (NOW: Severe Eyewall)');
  }, 14500);

  // ── STEP 4: Center position updates (17.0s - 22.0s) ──
  scheduleStep(() => {
    const scenario = SCENARIOS.bay_of_bengal;
    updateCenterFix(scenario.forecastTrack[0]);
    if (mapInstance) {
      mapInstance.setView(scenario.centerCoords, 7, { animate: true });
    }
    const n3 = document.getElementById('flowNodeCF');
    if (n3) n3.classList.add('flow-node-active');
    setDemoStatus('DEMO [4/7]: Center position updates • 17.2°N → 18.2°N, 86.8°E (NNW @ 128 km)');
  }, 17500);

  // ── STEP 5: Rapid Intensification alert appears (22.5s - 28.0s) ──
  scheduleStep(() => {
    const bannerEl = document.getElementById('riProminentBanner');
    const bannerTitleEl = document.getElementById('riBannerTitle');
    const statusBadge = document.getElementById('cycloneStatusText');
    const statusPulse = document.getElementById('statusPulseDot');
    const rapidAlertText = document.getElementById('rapidAlertText');

    if (bannerEl) bannerEl.className = 'ri-prominent-banner ri-warning-active';
    if (bannerTitleEl) bannerTitleEl.textContent = 'RAPID INTENSIFICATION DETECTED';
    if (statusBadge) {
      statusBadge.textContent = 'Cyclone Status: RAPID INTENSIFICATION';
      statusBadge.style.color = 'var(--alert-red)';
    }
    if (statusPulse) {
      statusPulse.style.background = 'var(--alert-red)';
      statusPulse.style.boxShadow = '0 0 8px var(--alert-red)';
    }
    if (rapidAlertText) {
      rapidAlertText.textContent = 'EARLY DIVERGENCE DETECTED: Storm deepening 1.8x faster than scheduled bulletin. +39 km/h surge in 60 min.';
    }

    const n4 = document.getElementById('flowNodeRI');
    if (n4) n4.classList.add('flow-node-warn');
    setDemoStatus('DEMO [5/7]: Rapid Intensification alert appears • +39 km/h in 60 min!');
  }, 22500);

  // ── STEP 6: Near-Coast Risk updates (28.5s - 34.0s) ──
  scheduleStep(() => {
    layerVisibility.riWatch = true;
    const riWatchBtn = document.getElementById('toggleRiWatchBtn');
    if (riWatchBtn) riWatchBtn.classList.add('active');

    updateNearCoastRiWatch(SCENARIOS.bay_of_bengal.forecastTrack[0]);

    const n5 = document.getElementById('flowNodeRIW');
    if (n5) n5.classList.add('flow-node-warn');
    setDemoStatus('DEMO [6/7]: Near-Coast Risk updates: HIGH (OHC 82 kJ + Shear 9 kt + 85 km Coast)');
  }, 28500);

  // ── STEP 7: Forecast track becomes visible (34.5s - 43.0s) ──
  scheduleStep(() => {
    layerVisibility.cone = true;
    layerVisibility.waypoints = true;
    layerVisibility.ensemble = true;
    layerVisibility.radii = true;
    applyLayerVisibility();

    document.querySelectorAll('.toggle-chip').forEach(btn => btn.classList.add('active'));

    setForecastHour(0);
    selectForecastPoint(0);
    const n6 = document.getElementById('flowNodeFC');
    if (n6) n6.classList.add('flow-node-active');
    setDemoStatus('DEMO [7/7]: Forecast track becomes visible • 0h (125 km/h, 94% conf)');
  }, 34500);

  scheduleStep(() => {
    setForecastHour(12);
    selectForecastPoint(12);
    setDemoStatus('DEMO [7/7]: Forecast track advances → +12h (132 km/h, 86% conf)');
  }, 37000);

  scheduleStep(() => {
    setForecastHour(24);
    selectForecastPoint(24);
    setDemoStatus('DEMO [7/7]: Forecast direct landfall sector → +24h (140 km/h, Puri Coast)');
  }, 39500);

  scheduleStep(() => {
    setForecastHour(48);
    selectForecastPoint(48);
    setDemoStatus('DEMO [7/7]: Forecast inland track → +48h (148 km/h, 69% conf)');
  }, 41500);

  // ── DEMO COMPLETE (43.5s) ──
  scheduleStep(() => {
    setDemoStatus('DEMO COMPLETE • Operational Intelligence Cycle Verified');
    if (btn) btn.classList.remove('running');
    if (btnText) btnText.textContent = 'START DEMO';
    if (btnIcon) btnIcon.textContent = '▶';
    isDemoRunning = false;
  }, 43500);
}

