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
let activeSatelliteLayer = 'dark';
let activeWeatherVariable = null;
let activeWeatherModel = 'icon_seamless';
let selectedLiveStorm = null;
let liveCyclones = [];
let liveCycloneFeedState = 'loading';
let weatherGridRequest = null;
let weatherGridZoomSuppressed = false;
let liveCycloneRefreshTimer = null;
const weatherGridCache = new Map();
const weatherPointCache = new Map();
const ESRI_STORM_SERVICE = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Active_Hurricanes_v1/FeatureServer';
const WEATHER_VARIABLES = {
  precipitation: { label: 'Precipitation', unit: 'mm', min: 0, max: 40, stops: ['#102a67', '#1686c9', '#1bc2bd', '#9acb55', '#ffd34e', '#f36b38', '#d83259'] },
  wind_speed_10m: { label: 'Wind speed', unit: 'km/h', min: 0, max: 80, stops: ['#143874', '#148bbd', '#38c8aa', '#d7db61', '#ef9b49', '#e04a58'] },
  wind_gusts_10m: { label: 'Wind gusts', unit: 'km/h', min: 0, max: 100, stops: ['#143874', '#148bbd', '#38c8aa', '#d7db61', '#ef9b49', '#e04a58'] },
  temperature_2m: { label: 'Temperature', unit: '°C', min: -10, max: 45, stops: ['#6754b9', '#3989c9', '#47bda2', '#d3cf67', '#f08b45', '#cb4054'] },
  apparent_temperature: { label: 'Feels like', unit: '°C', min: -10, max: 45, stops: ['#6754b9', '#3989c9', '#47bda2', '#d3cf67', '#f08b45', '#cb4054'] },
  relative_humidity_2m: { label: 'Relative humidity', unit: '%', min: 0, max: 100, stops: ['#7f5ac7', '#3d83d0', '#2fbcc1', '#80c86b', '#edcf5d'] },
  dew_point_2m: { label: 'Dew point', unit: '°C', min: -10, max: 35, stops: ['#6754b9', '#3989c9', '#47bda2', '#d3cf67', '#f08b45', '#cb4054'] },
  wet_bulb_temperature_2m: { label: 'Wet bulb', unit: '°C', min: -10, max: 35, stops: ['#6754b9', '#3989c9', '#47bda2', '#d3cf67', '#f08b45', '#cb4054'] },
  surface_pressure: { label: 'Surface pressure', unit: 'hPa', min: 960, max: 1040, stops: ['#b93058', '#eb7949', '#e9c45a', '#71bd8b', '#3e9dbd', '#615fc0'] }
};
let weatherGridLayer = null;
let prototypeOverlayLayers = { detection: null, explainability: null, impactZone: null };
let liveCycloneMarkerLayer = null;
let selectedLiveStormLayer = null;

// Map Layer References
let mapLayers = {
  pastTrack: null,
  forecastTrack: null,
  forecastPointMarkers: [],
  pastTrackMarkers: [],
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
  riWatchBeacon: null,
  darkBasemap: null,
  satelliteImagery: null
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
  waypoints: true,
  pastTrack: true,
  coastalBuffer: true,
  detection: false,
  explainability: false,
  impactZone: false
};

// Probabilistic 0–72 Hour Forecast Dataset
const PROBABILISTIC_FORECAST_POINTS = [
  { hour: 0,  windKmh: 125, kts: 68, confidence: 94, uncertaintyRange: "±8 km/h", time: "T+0h (NOW: 11:00 UTC)", lat: 18.2, lng: 86.8, coneRadiusKm: 15, status: "Active Eye • Near-Coast", isLandfall: false },
  { hour: 12, windKmh: 132, kts: 71, confidence: 86, uncertaintyRange: "±11 km/h", time: "T+12h (23:00 UTC)", lat: 19.3, lng: 86.0, coneRadiusKm: 35, status: "Intensifying Core • 80 km offshore", isLandfall: false },
  { hour: 24, windKmh: 140, kts: 76, confidence: 78, uncertaintyRange: "±15 km/h", time: "T+24h (Tomorrow 11:00 UTC)", lat: 20.0, lng: 85.5, coneRadiusKm: 65, status: "Direct Landfall (Puri Coast)", isLandfall: true },
  { hour: 48, windKmh: 148, kts: 80, confidence: 69, uncertaintyRange: "±22 km/h", time: "T+48h (Day 2 11:00 UTC)", lat: 21.5, lng: 85.0, coneRadiusKm: 110, status: "Inland Track (Odisha/Jharkhand)", isLandfall: false },
  { hour: 72, windKmh: 155, kts: 84, confidence: 61, uncertaintyRange: "±30 km/h", time: "T+72h (Day 3 11:00 UTC)", lat: 22.8, lng: 84.8, coneRadiusKm: 180, status: "Remnant Low (Dissipated)", isLandfall: false }
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
  refreshLiveCyclones();
  liveCycloneRefreshTimer = setInterval(refreshLiveCyclones, 10 * 60 * 1000);
});

// 4. Map Setup
function initMap() {
  const scenario = SCENARIOS[currentScenarioKey];
  
  // Create Leaflet Map with dark theme
  mapInstance = L.map('cycloneMap', {
    center: scenario.centerCoords,
    zoom: scenario.zoom,
    zoomControl: true,
    attributionControl: true
  });

  mapInstance.createPane('gibsPane').style.zIndex = 250;
  mapInstance.createPane('weatherPane').style.zIndex = 340;

  mapLayers.darkBasemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'
  }).addTo(mapInstance);

  L.control.scale({ position: 'bottomright', metric: true, imperial: false }).addTo(mapInstance);
  mapInstance.on('mousemove', (event) => {
    const coordsEl = document.getElementById('mapPointerCoordinates');
    if (!coordsEl) return;
    const { lat, lng } = event.latlng;
    const latHemisphere = lat < 0 ? 'S' : 'N';
    const lngHemisphere = lng < 0 ? 'W' : 'E';
    coordsEl.textContent = `${Math.abs(lat).toFixed(2)}°${latHemisphere}, ${Math.abs(lng).toFixed(2)}°${lngHemisphere}`;
  });
  mapInstance.on('click', event => openForecastMapPopup(event.latlng));
  mapInstance.on('moveend', () => {
    if (!activeWeatherVariable) return;
    if (mapInstance.getZoom() < 5) {
      weatherGridZoomSuppressed = true;
      if (weatherGridRequest) {
        weatherGridRequest.abort();
        weatherGridRequest = null;
      }
      clearWeatherGrid();
      updateWeatherLegend(null);
      setWeatherStatus('Zoom in to view the local forecast grid');
      return;
    }
    if (weatherGridZoomSuppressed) {
      weatherGridZoomSuppressed = false;
      loadWeatherGrid();
    }
  });
}

function satelliteTimestamp(minutesAgo = 20) {
  const time = new Date(Date.now() - minutesAgo * 60000);
  time.setUTCMinutes(Math.floor(time.getUTCMinutes() / 10) * 10, 0, 0);
  return time.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function satelliteDate(daysAgo = 1) {
  const time = new Date();
  time.setUTCDate(time.getUTCDate() - daysAgo);
  return time.toISOString().slice(0, 10);
}

function setSatelliteLayer(layerKey) {
  activeSatelliteLayer = layerKey;
  if (!mapInstance) return;
  const selector = document.getElementById('satelliteLayerSelect');
  if (selector && selector.value !== layerKey) selector.value = layerKey;

  if (mapLayers.satelliteImagery) {
    mapInstance.removeLayer(mapLayers.satelliteImagery);
    mapLayers.satelliteImagery = null;
  }

  const layerConfig = {
    'himawari-visible': {
      name: 'Himawari AHI visible',
      layer: 'Himawari_AHI_Band3_Red_Visible_1km',
      time: satelliteTimestamp(),
      title: 'Himawari-9 red visible · approximately 10-minute imagery',
      opacity: 0.82
    },
    'himawari-infrared': {
      name: 'Himawari AHI infrared',
      layer: 'Himawari_AHI_Band13_Clean_Infrared',
      time: satelliteTimestamp(),
      title: 'Himawari-9 clean infrared · approximately 10-minute imagery',
      opacity: 0.82
    },
    'viirs-true-color': {
      name: 'VIIRS true color',
      layer: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
      time: satelliteDate(1),
      title: 'Suomi NPP VIIRS corrected true color · near-real-time daily composite',
      opacity: 0.92
    }
  }[layerKey];

  if (layerConfig) {
    const imageryLayer = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi', {
      layers: layerConfig.layer,
      format: 'image/png',
      transparent: true,
      version: '1.1.1',
      srs: 'EPSG:3857',
      time: layerConfig.time,
      opacity: layerConfig.opacity,
      pane: 'gibsPane',
      attribution: '<a href="https://earthdata.nasa.gov/data/tools/gibs" target="_blank" rel="noopener">NASA EOSDIS GIBS</a>'
    });
    imageryLayer.on('loading', () => setSatelliteStatus(`Loading ${layerConfig.name} · ${layerConfig.time}`, layerKey));
    imageryLayer.on('load', () => setSatelliteStatus(`${layerConfig.title} · ${layerConfig.time}`, layerKey));
    imageryLayer.on('tileerror', () => setSatelliteStatus(`${layerConfig.name} unavailable for this date or view`, layerKey));
    mapLayers.satelliteImagery = imageryLayer.addTo(mapInstance);
  }

  updateOperationalStatus();
}

function setSatelliteStatus(message, layerKey) {
  const status = document.getElementById('mapOperationalStatus');
  if (status && activeSatelliteLayer === layerKey && !selectedLiveStorm) status.textContent = message;
}

function weatherGridKey() {
  const center = selectedLiveStorm || SCENARIOS[currentScenarioKey].forecastTrack[0];
  const locationKey = selectedLiveStorm ? `${selectedLiveStorm.name}:${selectedLiveStorm.basin}` : currentScenarioKey;
  return `${locationKey}:${Math.round(center.lat)}:${Math.round(center.lng)}:${activeWeatherModel}:${activeWeatherVariable}`;
}

function setWeatherStatus(message) {
  const status = document.getElementById('weatherLayerStatus');
  if (status) status.textContent = message;
}

function forecastIndexFor(times, hourOffset) {
  if (!Array.isArray(times) || !times.length) return -1;
  const target = Date.now() + Math.max(0, Number(hourOffset) || 0) * 3600000;
  let bestIndex = 0;
  let bestDifference = Infinity;
  times.forEach((time, index) => {
    const difference = Math.abs(new Date(time).getTime() - target);
    if (Number.isFinite(difference) && difference < bestDifference) {
      bestDifference = difference;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function buildOpenMeteoUrl(coordinates, variables) {
  const params = new URLSearchParams({
    latitude: coordinates.map(point => point.lat.toFixed(2)).join(','),
    longitude: coordinates.map(point => point.lng.toFixed(2)).join(','),
    hourly: variables.join(','),
    forecast_days: '4',
    timezone: 'GMT',
    wind_speed_unit: 'kmh',
    models: activeWeatherModel
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

async function fetchOpenMeteo(coordinates, variables, signal) {
  const response = await fetch(buildOpenMeteoUrl(coordinates, variables), { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Open-Meteo returned ${response.status}`);
  const payload = await response.json();
  if (payload && payload.error) throw new Error(payload.reason || 'Open-Meteo rejected the request');
  return Array.isArray(payload) ? payload : [payload];
}

function setWeatherVariable(variable) {
  activeWeatherVariable = activeWeatherVariable === variable ? null : variable;
  document.querySelectorAll('[data-weather-variable]').forEach(button => {
    const active = button.dataset.weatherVariable === activeWeatherVariable;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (weatherGridRequest) {
    weatherGridRequest.abort();
    weatherGridRequest = null;
  }
  clearWeatherGrid();
  if (activeWeatherVariable) loadWeatherGrid();
  else {
    setWeatherStatus('Forecast grid hidden');
    updateWeatherLegend(null);
    updateOperationalStatus();
  }
}

function setWeatherModel(model) {
  activeWeatherModel = model;
  const iconButton = document.getElementById('weatherModelIcon');
  const gfsButton = document.getElementById('weatherModelGfs');
  [[iconButton, model === 'icon_seamless'], [gfsButton, model === 'ncep_gfs_seamless']].forEach(([button, active]) => {
    if (!button) return;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (activeWeatherVariable) loadWeatherGrid();
  updateOperationalStatus();
}

function clearWeatherGrid() {
  if (weatherGridLayer && mapInstance?.hasLayer(weatherGridLayer)) mapInstance.removeLayer(weatherGridLayer);
  weatherGridLayer = null;
}

function cancelWeatherGridRequest() {
  if (!weatherGridRequest) return;
  weatherGridRequest.abort();
  weatherGridRequest = null;
}

async function loadWeatherGrid() {
  if (!mapInstance || !activeWeatherVariable) return;
  if (mapInstance.getZoom() < 5) {
    weatherGridZoomSuppressed = true;
    clearWeatherGrid();
    setWeatherStatus('Zoom in to view the local forecast grid');
    updateWeatherLegend(null);
    return;
  }

  const variable = activeWeatherVariable;
  const key = weatherGridKey();
  const cached = weatherGridCache.get(key);
  if (cached && Date.now() - cached.savedAt < 20 * 60 * 1000) {
    renderWeatherGrid(cached.points, cached.data, variable);
    return;
  }

  if (weatherGridRequest) weatherGridRequest.abort();
  const requestController = new AbortController();
  weatherGridRequest = requestController;
  setWeatherStatus(`Loading ${WEATHER_VARIABLES[variable].label} grid · ${activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS'}…`);
  updateOperationalStatus();

  const center = selectedLiveStorm || SCENARIOS[currentScenarioKey].forecastTrack[0];
  const points = [];
  for (let latStep = -4; latStep <= 4; latStep += 1) {
    for (let lngStep = -4; lngStep <= 4; lngStep += 1) {
      points.push({ lat: center.lat + latStep, lng: center.lng + lngStep });
    }
  }

  try {
    const data = await fetchOpenMeteo(points, [variable], requestController.signal);
    if (weatherGridRequest !== requestController || variable !== activeWeatherVariable) return;
    const result = { points, data, savedAt: Date.now() };
    weatherGridCache.set(key, result);
    renderWeatherGrid(points, data, variable);
  } catch (error) {
    if (error.name === 'AbortError') return;
    if (weatherGridRequest !== requestController) return;
    clearWeatherGrid();
    setWeatherStatus(`Forecast grid unavailable · ${error.message}`);
    updateWeatherLegend(null);
  } finally {
    if (weatherGridRequest === requestController) {
      weatherGridRequest = null;
      updateOperationalStatus();
    }
  }
}

function variableColor(variable, value) {
  const config = WEATHER_VARIABLES[variable];
  if (!config || !Number.isFinite(value)) return 'transparent';
  const proportion = Math.max(0, Math.min(0.999, (value - config.min) / (config.max - config.min)));
  const colorIndex = Math.floor(proportion * config.stops.length);
  return config.stops[Math.min(colorIndex, config.stops.length - 1)];
}

function renderWeatherGrid(points, data, variable) {
  clearWeatherGrid();
  if (!mapInstance || !activeWeatherVariable || variable !== activeWeatherVariable) return;
  const config = WEATHER_VARIABLES[variable];
  const collection = L.layerGroup();
  const forecastTimeIndex = forecastIndexFor(data[0]?.hourly?.time, currentForecastHour);
  let valid = 0;

  points.forEach((point, index) => {
    const value = data[index]?.hourly?.[variable]?.[forecastTimeIndex];
    if (!Number.isFinite(value)) return;
    valid += 1;
    const cell = L.rectangle([
      [point.lat - 0.5, point.lng - 0.5],
      [point.lat + 0.5, point.lng + 0.5]
    ], {
      pane: 'weatherPane',
      stroke: false,
      fillColor: variableColor(variable, value),
      fillOpacity: 0.27,
      interactive: false
    });
    collection.addLayer(cell);
  });

  if (valid) collection.addTo(mapInstance);
  weatherGridLayer = collection;
  const modelLabel = activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS';
  weatherGridZoomSuppressed = false;
  const selectedTime = data[0]?.hourly?.time?.[forecastTimeIndex] || 'forecast time unavailable';
  setWeatherStatus(valid ? `${valid} forecast grid cells · ${modelLabel} · ${selectedTime} UTC` : 'No forecast values returned for this area');
  updateWeatherLegend(valid ? { variable, modelLabel } : null);
}

function updateWeatherLegend(state) {
  const legend = document.getElementById('mapWeatherLegend');
  if (!legend) return;
  if (!state) {
    legend.hidden = true;
    return;
  }
  const config = WEATHER_VARIABLES[state.variable];
  legend.hidden = false;
  document.getElementById('weatherLegendTitle').textContent = config.label.toUpperCase();
  document.getElementById('weatherLegendMin').textContent = `${config.min} ${config.unit}`;
  document.getElementById('weatherLegendMax').textContent = `${config.max} ${config.unit}`;
  const scale = legend.querySelector('.weather-legend-scale i');
  if (scale) scale.style.background = `linear-gradient(90deg, ${config.stops.join(', ')})`;
  document.getElementById('weatherLegendSource').textContent = `Open-Meteo · ${state.modelLabel}`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function formatWeatherValue(variable, value) {
  const config = WEATHER_VARIABLES[variable];
  if (!config || !Number.isFinite(value)) return 'No value';
  const digits = variable === 'precipitation' ? 1 : (variable === 'relative_humidity_2m' || variable === 'surface_pressure' ? 0 : 1);
  return `${Number(value).toFixed(digits)} ${config.unit}`;
}

async function openForecastMapPopup(latlng) {
  if (!mapInstance) return;
  const lat = Number(latlng.lat.toFixed(3));
  const lng = Number(latlng.lng.toFixed(3));
  const variable = activeWeatherVariable || 'wind_speed_10m';
  const config = WEATHER_VARIABLES[variable];
  const popup = L.popup({ className: 'hud-leaflet-popup', maxWidth: 270 })
    .setLatLng(latlng)
    .setContent(`<div class="forecast-popup-card"><div class="fp-title">MAP FORECAST · T+${currentForecastHour}H</div><div>${lat.toFixed(2)}°, ${lng.toFixed(2)}°</div><div class="layer-data-status">Loading ${escapeHtml(config.label)} · ${activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS'}…</div></div>`)
    .openOn(mapInstance);

  const cacheKey = `${activeWeatherModel}:${lat.toFixed(1)}:${lng.toFixed(1)}`;
  let data = weatherPointCache.get(cacheKey);
  try {
    if (!data || Date.now() - data.savedAt > 15 * 60 * 1000) {
      const points = await fetchOpenMeteo([{ lat, lng }], Object.keys(WEATHER_VARIABLES));
      data = { payload: points[0], savedAt: Date.now() };
      weatherPointCache.set(cacheKey, data);
    }
    const hourly = data.payload?.hourly || {};
    const index = forecastIndexFor(hourly.time, currentForecastHour);
    const value = hourly[variable]?.[index];
    if (!popup.isOpen()) return;
    popup.setContent(`<div class="forecast-popup-card"><div class="fp-title">${escapeHtml(config.label.toUpperCase())} · T+${currentForecastHour}H</div><div class="fp-metric-row"><span class="fp-label">Coordinate</span><strong>${lat.toFixed(2)}°, ${lng.toFixed(2)}°</strong></div><div class="fp-metric-row"><span class="fp-label">Forecast value</span><strong class="fp-val text-cyan">${escapeHtml(formatWeatherValue(variable, value))}</strong></div><div class="fp-metric-row"><span class="fp-label">Valid</span><span>${escapeHtml(hourly.time?.[index] || 'Time unavailable')} UTC</span></div><div class="fp-metric-row"><span class="fp-label">Model</span><span>${activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS'} · Open-Meteo</span></div></div>`);
  } catch (error) {
    if (popup.isOpen()) popup.setContent(`<div class="forecast-popup-card"><div class="fp-title">MAP FORECAST · T+${currentForecastHour}H</div><div>${lat.toFixed(2)}°, ${lng.toFixed(2)}°</div><div class="layer-data-status">Forecast unavailable · ${escapeHtml(error.message)}</div></div>`);
  }
}

function readStormAttribute(attributes, ...names) {
  if (!attributes) return undefined;
  for (const name of names) {
    const key = Object.keys(attributes).find(candidate => candidate.toLowerCase() === name.toLowerCase());
    if (key && attributes[key] !== null && attributes[key] !== '') return attributes[key];
  }
  return undefined;
}

function parseStormTime(value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number' && value > 100000000000) return new Date(value);
  const text = String(value);
  if (/^\d{10,12}$/.test(text)) {
    const normalized = text.padEnd(12, '0');
    return new Date(Date.UTC(Number(normalized.slice(0, 4)), Number(normalized.slice(4, 6)) - 1, Number(normalized.slice(6, 8)), Number(normalized.slice(8, 10)), Number(normalized.slice(10, 12))));
  }
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function stormPosition(feature) {
  const geometry = feature?.geometry || {};
  const attributes = feature?.attributes || {};
  const lat = Number(geometry.y ?? readStormAttribute(attributes, 'LAT', 'LATITUDE'));
  const lng = Number(geometry.x ?? readStormAttribute(attributes, 'LON', 'LONGITUDE'));
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

async function queryEsriStormLayer(layerId, where = '1=1', output = 'json') {
  const params = new URLSearchParams({
    where,
    outFields: '*',
    returnGeometry: 'true',
    outSR: '4326',
    f: output
  });
  const response = await fetch(`${ESRI_STORM_SERVICE}/${layerId}/query?${params.toString()}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Esri storm feed returned ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error.message || 'Esri storm feed rejected the request');
  return payload;
}

function latestActiveStorms(payload) {
  const grouped = new Map();
  (payload.features || []).forEach(feature => {
    const attributes = feature.attributes || {};
    const name = String(readStormAttribute(attributes, 'STORMNAME', 'NAME') || '').trim();
    const position = stormPosition(feature);
    if (!name || !position) return;
    const basin = String(readStormAttribute(attributes, 'BASIN') || 'Basin unavailable');
    const validTime = parseStormTime(readStormAttribute(attributes, 'VALIDTIME', 'ADVDATE', 'DTG', 'DATELBL'));
    if (validTime && Date.now() - validTime.getTime() > 96 * 60 * 60 * 1000) return;
    const key = `${name.toLowerCase()}|${basin.toLowerCase()}`;
    const existing = grouped.get(key);
    if (!existing || (validTime && (!existing.validTime || validTime > existing.validTime))) {
      const maxWind = Number(readStormAttribute(attributes, 'MAXWIND', 'VMAX'));
      const pressure = Number(readStormAttribute(attributes, 'MSLP', 'MINPRESS'));
      grouped.set(key, {
        name,
        basin,
        category: String(readStormAttribute(attributes, 'STORMTYPE', 'DVLBL') || 'Tropical cyclone'),
        source: String(readStormAttribute(attributes, 'STORMSRC', 'SOURCE') || 'Esri · NHC/JTWC'),
        validTime,
        lat: position.lat,
        lng: position.lng,
        maxWind: Number.isFinite(maxWind) ? maxWind : null,
        pressure: Number.isFinite(pressure) && pressure > 0 ? pressure : null,
        attributes
      });
    }
  });
  return [...grouped.values()].sort((a, b) => (b.maxWind || 0) - (a.maxWind || 0));
}

async function refreshLiveCyclones() {
  const status = document.getElementById('liveCycloneFeedStatus');
  if (status) status.textContent = 'Refreshing Esri active cyclone feed…';
  try {
    const payload = await queryEsriStormLayer(1);
    liveCyclones = latestActiveStorms(payload);
    liveCycloneFeedState = 'ready';
    if (selectedLiveStorm) {
      const previousWeatherKey = weatherGridKey();
      const selected = liveCyclones.find(storm => storm.name === selectedLiveStorm.name && storm.basin === selectedLiveStorm.basin);
      if (selected) {
        selected.liveMarker = selectedLiveStorm.liveMarker;
        selectedLiveStorm = selected;
        selected.liveMarker?.setLatLng([selected.lat, selected.lng]);
        updateStormIntelPanel();
        if (activeWeatherVariable && weatherGridKey() !== previousWeatherKey) {
          cancelWeatherGridRequest();
          clearWeatherGrid();
          loadWeatherGrid();
        }
      } else {
        clearSelectedLiveStorm();
        loadScenario(currentScenarioKey);
      }
    }
    renderLiveCycloneFeed();
    updateOperationalStatus();
  } catch (error) {
    liveCycloneFeedState = 'error';
    if (status) status.textContent = `Live feed unavailable · ${error.message}`;
    renderLiveCycloneFeed();
    updateOperationalStatus();
  }
}

function renderLiveCycloneFeed() {
  const list = document.getElementById('liveCycloneFeedList');
  const status = document.getElementById('liveCycloneFeedStatus');
  if (!list) return;
  list.replaceChildren();

  if (liveCycloneFeedState === 'error') {
    if (status && !status.textContent.startsWith('Live feed unavailable')) status.textContent = 'Live storm feed unavailable';
    const empty = document.createElement('span');
    empty.className = 'live-cyclone-empty';
    empty.textContent = 'Scenario fixtures remain available; live storms were not loaded.';
    list.appendChild(empty);
    return;
  }

  if (!liveCyclones.length) {
    if (status) status.textContent = 'Esri / NHC / JTWC · no current positions reported';
    const empty = document.createElement('span');
    empty.className = 'live-cyclone-empty';
    empty.textContent = 'No active cyclones in the public feed';
    list.appendChild(empty);
  } else {
    if (status) status.textContent = `${liveCyclones.length} active position${liveCyclones.length === 1 ? '' : 's'} · Esri / NHC / JTWC`;
    liveCyclones.forEach(storm => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `live-cyclone-item${selectedLiveStorm?.name === storm.name && selectedLiveStorm?.basin === storm.basin ? ' selected' : ''}`;
      button.setAttribute('aria-label', `Select ${storm.name}, ${storm.basin}`);
      const name = document.createElement('strong');
      name.textContent = storm.name;
      const meta = document.createElement('span');
      const windKmh = storm.maxWind === null ? '' : ` · ${Math.round(storm.maxWind * 1.60934)} km/h`;
      meta.textContent = `${storm.basin}${windKmh}`;
      button.append(name, meta);
      button.addEventListener('click', () => selectLiveStorm(storm));
      list.appendChild(button);
    });
  }

  if (mapInstance) renderLiveCycloneMarkers();
}

function stormMarkerColor(storm) {
  if (storm.maxWind >= 74) return '#ef4444';
  if (storm.maxWind >= 39) return '#f59e0b';
  return '#38bdf8';
}

function renderLiveCycloneMarkers() {
  if (!mapInstance) return;
  if (liveCycloneMarkerLayer) mapInstance.removeLayer(liveCycloneMarkerLayer);
  liveCycloneMarkerLayer = L.layerGroup();
  liveCyclones.forEach(storm => {
    const marker = L.circleMarker([storm.lat, storm.lng], {
      radius: 6,
      color: '#ffffff',
      weight: 1.5,
      fillColor: stormMarkerColor(storm),
      fillOpacity: 0.95
    });
    marker.bindTooltip(`${storm.name} · ${storm.category}`, { direction: 'top', className: 'hud-tooltip' });
    marker.on('click', () => selectLiveStorm(storm));
    liveCycloneMarkerLayer.addLayer(marker);
  });
  liveCycloneMarkerLayer.addTo(mapInstance);
}

function clearSelectedLiveStorm() {
  if (selectedLiveStormLayer && mapInstance) mapInstance.removeLayer(selectedLiveStormLayer);
  selectedLiveStormLayer = null;
  if (selectedLiveStorm && selectedLiveStorm.liveMarker && mapInstance) mapInstance.removeLayer(selectedLiveStorm.liveMarker);
  selectedLiveStorm = null;
  renderLiveCycloneFeed();
}

function toGeoJSON(esriPayload) {
  const features = (esriPayload.features || []).map(feature => {
    const geometry = feature.geometry || {};
    let geoGeometry = null;
    if (Number.isFinite(geometry.x) && Number.isFinite(geometry.y)) {
      geoGeometry = { type: 'Point', coordinates: [geometry.x, geometry.y] };
    } else if (Array.isArray(geometry.paths)) {
      geoGeometry = { type: geometry.paths.length > 1 ? 'MultiLineString' : 'LineString', coordinates: geometry.paths.length > 1 ? geometry.paths : geometry.paths[0] };
    } else if (Array.isArray(geometry.rings)) {
      geoGeometry = { type: 'Polygon', coordinates: geometry.rings };
    }
    return { type: 'Feature', geometry: geoGeometry, properties: feature.attributes || {} };
  }).filter(feature => feature.geometry);
  return { type: 'FeatureCollection', features };
}

function formatStormCoordinates(storm) {
  const latHemisphere = storm.lat < 0 ? 'S' : 'N';
  const lngHemisphere = storm.lng < 0 ? 'W' : 'E';
  return `${Math.abs(storm.lat).toFixed(2)}°${latHemisphere}, ${Math.abs(storm.lng).toFixed(2)}°${lngHemisphere}`;
}

function renderIntensityPlot(points) {
  const chart = document.getElementById('stormIntensityPlot');
  if (!chart) return;
  chart.replaceChildren();
  const values = points.filter(point => Number.isFinite(point.wind)).sort((a, b) => a.hour - b.hour);
  if (values.length < 2) return;
  const min = Math.min(...values.map(point => point.wind));
  const max = Math.max(...values.map(point => point.wind));
  const coordinates = values.map((point, index) => {
    const x = 8 + index * (224 / (values.length - 1));
    const y = 36 - ((point.wind - min) / Math.max(1, max - min)) * 25;
    return { x, y };
  });
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  line.setAttribute('points', coordinates.map(point => `${point.x},${point.y}`).join(' '));
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#54d7ee');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-linejoin', 'round');
  chart.appendChild(line);
  coordinates.forEach(point => {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
    dot.setAttribute('r', '2.2');
    dot.setAttribute('fill', '#e7fbff');
    chart.appendChild(dot);
  });
}

function renderStormFeatureChips(features) {
  const container = document.getElementById('stormDetailFeatureChips');
  if (!container) return;
  container.replaceChildren();
  features.forEach(feature => {
    const chip = document.createElement('div');
    chip.className = 'storm-feature-chip';
    const label = document.createElement('span');
    label.textContent = feature.label;
    const value = document.createElement('strong');
    value.textContent = feature.value || 'Not supplied';
    chip.append(label, value);
    container.appendChild(chip);
  });
}

function hideScenarioMapLayersForLiveStorm() {
  if (mapInstance) {
    const simulationLayers = new Set(Object.entries(mapLayers)
      .filter(([key]) => key !== 'darkBasemap' && key !== 'satelliteImagery')
      .flatMap(([, layer]) => Array.isArray(layer) ? layer : [layer])
      .filter(Boolean));
    simulationLayers.forEach(layer => {
      if (mapInstance.hasLayer(layer)) mapInstance.removeLayer(layer);
    });
  }
  clearPrototypeOverlays();
  document.querySelectorAll('.map-legend, .map-radii-legend').forEach(legend => { legend.style.display = 'none'; });
}

async function selectLiveStorm(storm) {
  if (!mapInstance || !storm) return;
  clearSelectedLiveStorm();
  selectedLiveStorm = storm;
  cancelWeatherGridRequest();
  clearWeatherGrid();
  hideScenarioMapLayersForLiveStorm();
  const icon = L.divIcon({
    className: 'custom-storm-pin live-storm-pin',
    html: `<div class="storm-marker-shell" style="--storm-tone:${stormMarkerColor(storm)}"><span class="storm-marker-pulse"></span><span class="storm-marker-core"></span><span class="storm-marker-label">${escapeHtml(storm.name)} · LIVE</span></div>`,
    iconSize: [170, 42],
    iconAnchor: [21, 21]
  });
  storm.liveMarker = L.marker([storm.lat, storm.lng], { icon, zIndexOffset: 900 }).addTo(mapInstance);
  storm.liveMarker.bindPopup(`<div class="forecast-popup-card"><div class="fp-title">${escapeHtml(storm.name)} · LIVE FEED</div><div>${escapeHtml(storm.basin)}</div><div>${escapeHtml(formatStormCoordinates(storm))}</div></div>`);
  mapInstance.setView([storm.lat, storm.lng], Math.max(5, mapInstance.getZoom()), { animate: true });
  updateStormIntelPanel();
  renderLiveCycloneFeed();
  if (activeWeatherVariable) loadWeatherGrid();
  updateOperationalStatus();

  const where = `STORMNAME='${storm.name.replace(/'/g, "''")}' AND BASIN='${storm.basin.replace(/'/g, "''")}'`;
  try {
    const [forecastPosition, forecastTrack, observedTrack, cone] = await Promise.all([
      queryEsriStormLayer(0, where),
      queryEsriStormLayer(2, where),
      queryEsriStormLayer(3, where),
      queryEsriStormLayer(4, where)
    ]);
    if (selectedLiveStorm !== storm) return;
    selectedLiveStormLayer = L.layerGroup();
    const trackLayers = [
      [toGeoJSON(observedTrack), { color: '#a8b5c5', weight: 2.4, opacity: 0.82, dashArray: '4 4' }],
      [toGeoJSON(forecastTrack), { color: '#38bdf8', weight: 3, opacity: 0.92, dashArray: '7 5' }],
      [toGeoJSON(cone), { color: '#38bdf8', weight: 1.2, fillColor: '#38bdf8', fillOpacity: 0.12 }]
    ];
    trackLayers.forEach(([geojson, style]) => {
      const layer = L.geoJSON(geojson, {
        style,
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 4, color: '#fff', weight: 1, fillColor: '#38bdf8', fillOpacity: 0.95 })
      });
      selectedLiveStormLayer.addLayer(layer);
    });
    selectedLiveStormLayer.addTo(mapInstance);
    const intensityPoints = (forecastPosition.features || []).map(feature => ({
      hour: Number(readStormAttribute(feature.attributes, 'FCSTPRD', 'TAU')) || 0,
      wind: Number(readStormAttribute(feature.attributes, 'MAXWIND', 'VMAX'))
    }));
    renderIntensityPlot(intensityPoints);
    const chartLabel = document.querySelector('.storm-intel-chart-wrap .storm-intel-section-label');
    if (chartLabel) chartLabel.textContent = 'ESRI FORECAST WIND · MPH';
  } catch (error) {
    const classification = document.getElementById('stormDetailClassification');
    if (classification) classification.textContent = `Live position available; forecast track unavailable · ${error.message}`;
  }
}

function updateStormIntelPanel() {
  const name = document.getElementById('stormDetailName');
  const category = document.getElementById('stormDetailCategory');
  const position = document.getElementById('stormDetailPosition');
  const wind = document.getElementById('stormDetailWind');
  const pressure = document.getElementById('stormDetailPressure');
  const intensity = document.getElementById('stormDetailIntensity');
  const dvorak = document.getElementById('stormDetailDvorak');
  const source = document.getElementById('stormDetailSource');
  const badge = document.getElementById('stormDetailStatus');
  const classification = document.getElementById('stormDetailClassification');
  const risk = document.getElementById('stormDetailRiRisk');
  const chartLabel = document.querySelector('.storm-intel-chart-wrap .storm-intel-section-label');

  if (selectedLiveStorm) {
    const storm = selectedLiveStorm;
    if (name) name.textContent = storm.name;
    if (category) category.textContent = `${storm.category} · ${storm.basin}`;
    if (position) position.textContent = formatStormCoordinates(storm);
    if (wind) wind.textContent = storm.maxWind === null ? 'Not reported' : `${storm.maxWind} mph · ${Math.round(storm.maxWind * 1.60934)} km/h`;
    if (pressure) pressure.textContent = storm.pressure === null ? 'Not reported' : `${storm.pressure} hPa`;
    if (intensity) intensity.textContent = storm.category;
    if (dvorak) dvorak.textContent = 'Not supplied';
    if (source) source.textContent = 'ESRI · LIVE';
    if (badge) badge.textContent = 'LIVE FEED';
    if (classification) classification.textContent = 'No live AI classification is provided by this storm feed.';
    const featureLabel = document.querySelector('.storm-intel-classification .storm-intel-section-label');
    if (featureLabel) featureLabel.textContent = 'CLASSIFICATION INPUTS · LIVE FEED';
    renderStormFeatureChips([
      { label: 'Shear pattern', value: 'Not supplied' },
      { label: 'Curved band', value: 'Not supplied' },
      { label: 'Embedded centre', value: 'Not supplied' },
      { label: 'CDO', value: 'Not supplied' },
      { label: 'Eye', value: 'Not supplied' }
    ]);
    if (risk) risk.textContent = 'Rapid-intensification risk: not supplied by feed';
    if (chartLabel) chartLabel.textContent = 'ESRI FORECAST WIND · MPH';
    return;
  }

  const scenario = SCENARIOS[currentScenarioKey];
  const scenarioData = typeof CYCLONE_SCENARIOS !== 'undefined' ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  if (!scenario) return;
  const point = scenario.forecastTrack.find(item => item.hour === currentForecastHour) || scenario.forecastTrack[0];
  const observation = scenarioData?.observations?.[currentObsIndex] || scenarioData?.observations?.[4];
  const windKmh = Math.round((point.kts || 0) * 1.852);
  if (name) name.textContent = scenarioData?.name || scenario.name;
  if (category) category.textContent = scenario.category;
  if (position) position.textContent = formatStormCoordinates(point);
  if (wind) wind.textContent = `${windKmh} km/h`;
  if (pressure) pressure.textContent = `${point.hpa || '—'} hPa`;
  if (intensity) intensity.textContent = scenario.category;
  if (dvorak) dvorak.textContent = 'Not supplied';
  if (source) source.textContent = 'SCENARIO';
  if (badge) badge.textContent = 'DEMO';
  if (classification) classification.textContent = 'Scenario fixture values; no connected classifier output.';
  const featureLabel = document.querySelector('.storm-intel-classification .storm-intel-section-label');
  if (featureLabel) featureLabel.textContent = 'CLASSIFICATION INPUTS · SCENARIO FIXTURE';
  renderStormFeatureChips([
    { label: 'Shear pattern', value: scenarioData?.riWatch?.windShear ? `${scenarioData.riWatch.windShear} · fixture` : 'Not supplied' },
    { label: 'Curved band', value: 'Not supplied' },
    { label: 'Embedded centre', value: 'Not supplied' },
    { label: 'CDO', value: observation?.cdo ? `${observation.cdo} · fixture` : 'Not supplied' },
    { label: 'Eye', value: point.eye ? `${point.eye} km · fixture` : 'Not supplied' }
  ]);
  if (risk) risk.textContent = `Rapid-intensification risk: ${scenarioData?.riWatch?.status || 'scenario estimate'}`;
  if (chartLabel) chartLabel.textContent = 'SCENARIO INTENSITY GUIDANCE';
  renderIntensityPlot(scenario.forecastTrack.map(item => ({ hour: item.hour, wind: item.kts * 1.852 })));
}

function clearPrototypeOverlays() {
  Object.values(prototypeOverlayLayers).forEach(layer => {
    if (layer && mapInstance) mapInstance.removeLayer(layer);
  });
  prototypeOverlayLayers = { detection: null, explainability: null, impactZone: null };
}

function getScenarioForecastDetails(hour) {
  const scenario = SCENARIOS[currentScenarioKey];
  const scenarioData = typeof CYCLONE_SCENARIOS !== 'undefined' ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const point = scenario?.forecastTrack?.find(item => item.hour === Number(hour)) || scenario?.forecastTrack?.[0];
  if (!point) return { hour: Number(hour) || 0, windKmh: 0, confidence: 0, confidenceLabel: 'Not supplied', time: `T+${hour}h`, status: 'Forecast position unavailable', uncertainty: 'Not supplied' };
  const checkpoint = scenarioData?.forecastCheckpoints?.find(item => parseInt(item.hour, 10) === point.hour);
  const confidenceLabel = String(checkpoint?.confidence || 'Not supplied');
  const confidence = /high/i.test(confidenceLabel) ? 85 : (/moderate/i.test(confidenceLabel) ? 70 : (/low/i.test(confidenceLabel) ? 55 : 0));
  return {
    ...point,
    hour: point.hour,
    windKmh: Math.round(point.kts * 1.852),
    confidence,
    confidenceLabel,
    time: checkpoint?.time || `T+${point.hour}h`,
    status: checkpoint?.status || point.desc || 'Scenario forecast',
    uncertainty: checkpoint?.uncertainty || 'Not supplied'
  };
}

function updatePrototypeOverlays(point) {
  clearPrototypeOverlays();
  if (!mapInstance || selectedLiveStorm) return;
  const scenario = SCENARIOS[currentScenarioKey];
  const scenarioData = typeof CYCLONE_SCENARIOS !== 'undefined' ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  if (!scenario || !point) return;
  const center = [point.lat, point.lng];

  if (layerVisibility.detection) {
    const detection = L.layerGroup();
    const halfHeight = Math.max(0.34, (point.eye || 20) / 110);
    const halfWidth = Math.max(0.48, (point.eye || 20) / 80);
    const observation = scenarioData?.observations?.[currentObsIndex] || scenarioData?.observations?.[4];
    const bounds = [
      [center[0] - halfHeight, center[1] - halfWidth],
      [center[0] + halfHeight, center[1] + halfWidth]
    ];
    const box = L.rectangle(bounds, { color: '#48dff5', weight: 1.5, dashArray: '5 4', fillColor: '#26c6da', fillOpacity: 0.045 });
    box.bindTooltip(`Scenario core locator · Eye ${point.eye ? `${point.eye} km` : 'not supplied'} · CDO ${observation?.cdo || 'not supplied'} · no live CV confidence`, { sticky: true });
    detection.addLayer(box);
    [
      bounds[0],
      [bounds[0][0], bounds[1][1]],
      [bounds[1][0], bounds[0][1]],
      bounds[1]
    ].forEach((corner, index) => detection.addLayer(L.marker(corner, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: `ai-detection-corner ai-detection-corner-${index}`, html: '<i></i>', iconSize: [12, 12], iconAnchor: [6, 6] })
    })));
    detection.addLayer(L.marker(center, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({ className: 'ai-detection-label', html: '<span>CYCLONE CORE · DEMO</span>', iconSize: [136, 18], iconAnchor: [68, 29] })
    }));
    prototypeOverlayLayers.detection = detection;
    detection.addTo(mapInstance);
  }

  if (layerVisibility.explainability) {
    const explainability = L.layerGroup();
    const radiusKm = Math.max(24, (point.eye || 20) * 2.5);
    const region = L.circle(center, {
      radius: radiusKm * 1000,
      color: '#9b87f5',
      weight: 1,
      dashArray: '3 5',
      fillColor: '#8b73e6',
      fillOpacity: 0.075
    });
    region.bindTooltip(`Scenario feature anchor · ${scenarioData?.observations?.[4]?.cdo || 'CDO'} · spatial model weights are not supplied`, { sticky: true });
    explainability.addLayer(region);
    prototypeOverlayLayers.explainability = explainability;
    explainability.addTo(mapInstance);
  }

  if (layerVisibility.impactZone) {
    const impactZone = L.layerGroup();
    const r34Km = scenarioData?.windRadii?.r34_km || Math.round(180 * Math.max(0.65, Math.min(1.35, (point.kts || 65) / 65)));
    const zone = L.circle(center, {
      radius: r34Km * 1000,
      color: '#f59e0b',
      weight: 1.2,
      dashArray: '5 5',
      fillColor: '#f97316',
      fillOpacity: 0.055
    });
    zone.bindTooltip(`Scenario gale-wind proxy · 34 kt radius ${r34Km} km · not an official impact footprint`, { sticky: true });
    impactZone.addLayer(zone);
    prototypeOverlayLayers.impactZone = impactZone;
    impactZone.addTo(mapInstance);
  }
}

// 5. Load Scenario & Render Layers
function loadScenario(key) {
  clearSelectedLiveStorm();
  cancelWeatherGridRequest();
  clearWeatherGrid();
  clearPrototypeOverlays();
  document.querySelectorAll('.map-legend, .map-radii-legend').forEach(legend => { legend.style.display = ''; });
  currentScenarioKey = key;
  const scenario = SCENARIOS[key];
  currentForecastHour = 0;

  // Header update (legacy header elements - null-safe in new layout)
  const stormNameEl = document.getElementById('stormName');
  const stormCatEl = document.getElementById('stormCategory');
  if (stormNameEl) stormNameEl.textContent = scenario.name;
  if (stormCatEl) stormCatEl.textContent = scenario.category;

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
    opacity: 0.8
  }).addTo(mapInstance);

  // Past Track Markers
  mapLayers.pastTrackMarkers = scenario.pastTrack.map(pt => {
    return L.circleMarker([pt.lat, pt.lng], {
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
    opacity: 0.95,
    dashArray: '7, 5'
  }).addTo(mapInstance);

  // Render waypoints from the selected scenario track.
  mapLayers.forecastPointMarkers = scenario.forecastTrack.map(p => {
    const details = getScenarioForecastDetails(p.hour);
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
        <div class="fp-metric-row"><span class="fp-label">Wind:</span> <strong class="fp-val text-red">${details.windKmh} km/h</strong></div>
        <div class="fp-metric-row"><span class="fp-label">Confidence:</span> <strong class="fp-val text-cyan">${details.confidenceLabel}</strong></div>
        <div class="fp-metric-row"><span class="fp-label">Forecast Time:</span> <span class="fp-val">${details.time}</span></div>
        <div class="fp-metric-row"><span class="fp-label">Position:</span> <span class="fp-val">${formatStormCoordinates(p)}</span></div>
        <div class="fp-metric-row"><span class="fp-label">Source:</span> <span class="fp-val">Scenario forecast</span></div>
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
  const intensityColor = scenario.category.includes('Cat-3') ? '#ef4444' : '#f97316';
  const eyeIcon = L.divIcon({
    className: 'custom-storm-pin',
    html: `
      <div class="storm-marker-shell" style="--storm-tone:${intensityColor}">
        <span class="storm-marker-pulse"></span>
        <span class="storm-marker-core"></span>
        <span class="storm-marker-label">${scenario.name.replace(/['"]/g, '')}</span>
      </div>
    `,
    iconSize: [150, 42],
    iconAnchor: [21, 21]
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
  updatePrototypeOverlays(curPoint);
  updateStormIntelPanel();
  if (activeWeatherVariable) loadWeatherGrid();

  // Render mini data visualizations
  renderObsCharts();
  renderForecastDataLayer();
  updateOperationalStatus();
}

function updateOperationalStatus() {
  const statusEl = document.getElementById('mapOperationalStatus');
  const modeBadge = document.getElementById('topDataModeBadge');
  let mode = 'SCENARIO MODE · DEMO / FALLBACK DATA';
  if (selectedLiveStorm) mode = `LIVE CYCLONE DATA · ESRI / NHC / JTWC · ${selectedLiveStorm.name}`;
  else if (activeWeatherVariable) mode = `FORECAST MODE · ${activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS'} · OPEN-METEO`;
  else if (activeSatelliteLayer !== 'dark') mode = `SATELLITE MODE · NASA GIBS · ${activeSatelliteLayer.replaceAll('-', ' ').toUpperCase()}`;
  else if (liveCycloneFeedState === 'ready' && liveCyclones.length === 0) mode = 'NO ACTIVE CYCLONES · SCENARIO / DEMO';
  else if (activePage === 'forecast' || currentForecastHour > 0) mode = 'FORECAST MODE · SCENARIO DATA';
  else if (activePage === 'tracking') mode = 'TRACKING MODE · SCENARIO DATA';
  if (liveCycloneFeedState === 'error' && !selectedLiveStorm && !activeWeatherVariable && activeSatelliteLayer === 'dark') mode = 'DEMO / FALLBACK DATA · LIVE FEED UNAVAILABLE';
  if (statusEl) statusEl.textContent = mode;
  if (statusEl) statusEl.dataset.mode = selectedLiveStorm ? 'live' : (activeWeatherVariable ? 'forecast' : (activeSatelliteLayer !== 'dark' ? 'satellite' : (liveCycloneFeedState === 'error' ? 'fallback' : 'demo')));
  document.getElementById('page-dashboard')?.classList.toggle('has-live-storm', Boolean(selectedLiveStorm));
  const timelineTitle = document.querySelector('.slider-title');
  if (timelineTitle) timelineTitle.textContent = selectedLiveStorm ? 'Scenario timeline · live storm track shown above' : 'Forecast Track Progression:';
  if (selectedLiveStorm) {
    const storm = selectedLiveStorm;
    const setStatusValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };
    const windKmh = storm.maxWind === null ? '' : ` (${Math.round(storm.maxWind * 1.60934)} km/h)`;
    setStatusValue('dashCycloneName', storm.name);
    setStatusValue('dashPosition', formatStormCoordinates(storm));
    setStatusValue('dashIntensity', storm.category);
    setStatusValue('dashMaxWind', storm.maxWind === null ? 'Not reported' : `${storm.maxWind} mph${windKmh}`);
    setStatusValue('dashPressure', storm.pressure === null ? 'Not reported' : `${storm.pressure} hPa`);
    setStatusValue('dashMovement', 'Not supplied by feed');
    setStatusValue('dashRiskBadge', 'Not supplied');
    const riskBadge = document.getElementById('dashRiskBadge');
    if (riskBadge) riskBadge.className = 'status-risk-pill mod';
  }
  if (modeBadge) {
    modeBadge.textContent = selectedLiveStorm ? 'LIVE STORM FEED' : (activeWeatherVariable ? `${activeWeatherModel === 'icon_seamless' ? 'ICON' : 'GFS'} FORECAST` : (activeSatelliteLayer !== 'dark' ? 'NASA SATELLITE' : 'SCENARIO / DEMO'));
  }
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
  mapLayers.pastTrackMarkers.forEach(marker => mapInstance.removeLayer(marker));
  mapLayers.pastTrackMarkers = [];
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

// 6. Dynamic Wind Radii Render (34, 50, 64 KT zones)
function updateWindRadii(lat, lng, kts) {
  if (!mapInstance) return;
  if (mapLayers.radii64) { mapInstance.removeLayer(mapLayers.radii64); mapLayers.radii64 = null; }
  if (mapLayers.radii50) { mapInstance.removeLayer(mapLayers.radii50); mapLayers.radii50 = null; }
  if (mapLayers.radii34) { mapInstance.removeLayer(mapLayers.radii34); mapLayers.radii34 = null; }

  const legendEl = document.getElementById('mapRadiiLegend');
  if (!layerVisibility.radii) {
    if (legendEl) legendEl.style.display = 'none';
    return;
  }
  if (legendEl) legendEl.style.display = 'flex';

  // Base radii at reference intensity (65 kts): 34kt: 180 km, 50kt: 95 km, 64kt: 55 km
  const currentKts = kts || 65;
  const factor = Math.max(0.65, Math.min(1.35, currentKts / 65));
  const r34_km = Math.round(180 * factor);
  const r50_km = Math.round(95 * factor);
  const r64_km = Math.round(55 * factor);

  // Update Legend displays
  const leg64 = document.getElementById('legendR64');
  const leg50 = document.getElementById('legendR50');
  const leg34 = document.getElementById('legendR34');
  if (leg64) leg64.textContent = `${r64_km} km`;
  if (leg50) leg50.textContent = `${r50_km} km`;
  if (leg34) leg34.textContent = `${r34_km} km`;

  // 34 kt (Gale) Outer circle (180 km)
  mapLayers.radii34 = L.circle([lat, lng], {
    radius: r34_km * 1000,
    color: '#fbbf24',
    fillColor: '#fbbf24',
    fillOpacity: 0.08,
    weight: 1.2
  }).bindTooltip(`34 KT Gale Radius: ${r34_km} km`, { sticky: true }).addTo(mapInstance);

  // 50 kt (Storm) Middle circle (95 km)
  if (currentKts >= 45) {
    mapLayers.radii50 = L.circle([lat, lng], {
      radius: r50_km * 1000,
      color: '#fb923c',
      fillColor: '#fb923c',
      fillOpacity: 0.12,
      weight: 1.4
    }).bindTooltip(`50 KT Storm Radius: ${r50_km} km`, { sticky: true }).addTo(mapInstance);
  }

  // 64 kt (Hurricane) Inner core (55 km)
  if (currentKts >= 55) {
    mapLayers.radii64 = L.circle([lat, lng], {
      radius: r64_km * 1000,
      color: '#f43f5e',
      fillColor: '#f43f5e',
      fillOpacity: 0.18,
      weight: 1.6
    }).bindTooltip(`64 KT Hurricane Core: ${r64_km} km`, { sticky: true }).addTo(mapInstance);
  }
}

// 7. Time Scrubber & Simulation
function setForecastHour(targetHour) {
  const scenario = SCENARIOS[currentScenarioKey];
  const track = scenario.forecastTrack;
  let pt = track.find(p => p.hour === targetHour);
  if (!pt) {
    pt = track.reduce((prev, curr) => Math.abs(curr.hour - targetHour) < Math.abs(prev.hour - targetHour) ? curr : prev);
  }
  targetHour = pt.hour;
  currentForecastHour = targetHour;

  // Update slider input
  const timeSlider = document.getElementById('timeSlider');
  if (timeSlider) {
    timeSlider.value = targetHour;
    timeSlider.style.setProperty('--forecast-progress', `${(targetHour / 72) * 100}%`);
  }

  // Update timeline ticks active style
  document.querySelectorAll('.timeline-labels span').forEach(sp => sp.classList.remove('active-tick'));
  const activeTick = document.getElementById(`tick-${targetHour}`);
  if (activeTick) activeTick.classList.add('active-tick');

  // Update scrubber header tags
  const forecastTimeTag = document.getElementById('forecastTimeTag');
  if (forecastTimeTag) {
    const details = getScenarioForecastDetails(targetHour);
    forecastTimeTag.textContent = targetHour === 0 ? `NOW · ${details.time}` : `T+${targetHour}h · ${details.time}`;
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
  if (!selectedLiveStorm) updateWindRadii(pt.lat, pt.lng, pt.kts);

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
  if (!selectedLiveStorm) updateCenterFix(pt);

  // ── FLOW STEP 4 → 5: Update Near-Coast RI Watch dashboard card & map hazard connection ──
  if (!selectedLiveStorm) updateNearCoastRiWatch(pt);

  // ── FLOW STEP 6: Update Forecast Point Details Display in Card 3 ──
  updateForecastPointDetails(targetHour);
  updateStormIntelPanel();
  updatePrototypeOverlays(pt);
  if (activeWeatherVariable) {
    const cached = weatherGridCache.get(weatherGridKey());
    if (cached) renderWeatherGrid(cached.points, cached.data, activeWeatherVariable);
  }

  // Update Chart Cursor
  updateChartCursor(targetHour);

  // Update pipeline flow indicator UI
  updateFlowPipeline(targetHour, pt);
  updateOperationalStatus();
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
  if (elPressure) elPressure.textContent = `${deltaPress} hPa / 60 min`;
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
    const riskLabel = probVal >= 70 ? 'HIGH' : (probVal >= 40 ? 'MODERATE' : 'LOW');
    elFormula.textContent = `RI Risk Score: ${riskLabel} (${probVal}/100) • OHC(${ohcScore}) + Shear(${shearScore}) + Coast(${coastScore}) + Trend(${trendScore + pressScore})`;
  }
}

/**
 * Update the flow pipeline indicator: highlight which steps are active at current forecast hour.
 */
function updateFlowPipeline(hour, pt) {
  const nodes = document.querySelectorAll('.flow-node');
  if (!nodes.length) return;

  nodes.forEach((n, i) => {
    n.classList.remove('flow-node-active', 'flow-node-done', 'flow-node-warn');
    if (i < nodes.length - 1) {
      n.classList.add('flow-node-done');
    }
  });

  const lastNode = nodes[nodes.length - 1];
  if (lastNode) {
    lastNode.classList.remove('flow-node-done');
    lastNode.classList.add('flow-node-active');
  }

  const flowStatus = document.getElementById('flowStatusLabel');
  if (flowStatus) {
    if (hour === 0) {
      flowStatus.textContent = 'INTELLIGENCE PIPELINE • 12/12 NODES SYNCHRONIZED';
      flowStatus.style.color = 'var(--alert-green)';
    } else if (hour < 24) {
      flowStatus.textContent = `T+${hour}h FORECAST ADVANCE • RI Active • ${pt.dist} km coast`;
      flowStatus.style.color = 'var(--alert-orange)';
    } else if (hour === 24) {
      flowStatus.textContent = 'LANDFALL IMMINENT • T+24h Puri Sector';
      flowStatus.style.color = 'var(--alert-red)';
    } else {
      flowStatus.textContent = `T+${hour}h • Remnant Stage`;
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
  const p = getScenarioForecastDetails(hour);
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
  if (fiConfidenceVal) fiConfidenceVal.textContent = p.confidenceLabel;
  if (fiWindSpeed) fiWindSpeed.textContent = `${p.windKmh} km/h`;
  if (fiWindKts) fiWindKts.textContent = `(${p.kts} kts)`;
  const fiWindUnc = document.getElementById('fiWindUncertainty');
  if (fiWindUnc) fiWindUnc.textContent = p.uncertainty.split('•')[0].trim();
  if (fiConfidence) fiConfidence.textContent = p.confidenceLabel;
  if (fiConfBar) fiConfBar.style.width = `${p.confidence}%`;
  const coneWidth = p.uncertainty.match(/±\s*([\d.]+)\s*km\s*cone/i);
  if (fiConeWidth) fiConeWidth.textContent = coneWidth ? `±${coneWidth[1]} km` : 'Not supplied';
  if (fiStatusText) {
    fiStatusText.textContent = p.isLandfall ? 'DIRECT LANDFALL' : (p.status || (p.hour >= 48 ? 'Inland Track' : 'Forecast track'));
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
  const idx = SCENARIOS[currentScenarioKey].forecastTrack.findIndex(item => item.hour === hour);
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
  if (selector) selector.addEventListener('change', (e) => {
    stopDemo();
    stopPlay();
    loadScenario(e.target.value);
  });

  // Time Slider
  const slider = document.getElementById('timeSlider');
  if (slider) slider.addEventListener('input', (e) => {
    stopPlay();
    setForecastHour(parseInt(e.target.value, 10));
  });

  // Play / Pause Button
  const playBtn = document.getElementById('playBtn');
  if (playBtn) playBtn.addEventListener('click', () => {
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
      const marker = selectedLiveStorm?.liveMarker || mapLayers.stormMarker;
      if (mapInstance && marker) {
        const latlng = marker.getLatLng();
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
    setLayerButtonState(e.currentTarget, layerVisibility.cone);
    applyLayerVisibility();
  });

  const pastTrackBtn = document.getElementById('togglePastTrackBtn');
  if (pastTrackBtn) pastTrackBtn.addEventListener('click', (e) => {
    layerVisibility.pastTrack = !layerVisibility.pastTrack;
    setLayerButtonState(e.currentTarget, layerVisibility.pastTrack);
    applyLayerVisibility();
  });

  document.getElementById('toggleEnsembleBtn').addEventListener('click', (e) => {
    layerVisibility.ensemble = !layerVisibility.ensemble;
    setLayerButtonState(e.currentTarget, layerVisibility.ensemble);
    applyLayerVisibility();
  });

  document.getElementById('toggleRadiiBtn').addEventListener('click', (e) => {
    layerVisibility.radii = !layerVisibility.radii;
    setLayerButtonState(e.currentTarget, layerVisibility.radii);
    applyLayerVisibility();
  });

  const coastBtn = document.getElementById('toggleCoastBtn');
  if (coastBtn) coastBtn.addEventListener('click', (e) => {
    layerVisibility.coastalBuffer = !layerVisibility.coastalBuffer;
    setLayerButtonState(e.currentTarget, layerVisibility.coastalBuffer);
    applyLayerVisibility();
  });

  const riWatchBtn = document.getElementById('toggleRiWatchBtn');
  if (riWatchBtn) {
    riWatchBtn.addEventListener('click', (e) => {
      layerVisibility.riWatch = !layerVisibility.riWatch;
      setLayerButtonState(e.currentTarget, layerVisibility.riWatch);
      applyLayerVisibility();
    });
  }

  // Waypoints Toggle
  const pointsBtn = document.getElementById('togglePointsBtn');
  if (pointsBtn) {
    pointsBtn.addEventListener('click', (e) => {
      layerVisibility.waypoints = !layerVisibility.waypoints;
      setLayerButtonState(e.currentTarget, layerVisibility.waypoints);
      applyLayerVisibility();
    });
  }

  [
    ['toggleDetectionBtn', 'detection'],
    ['toggleExplainabilityBtn', 'explainability'],
    ['toggleImpactZoneBtn', 'impactZone']
  ].forEach(([buttonId, layerKey]) => {
    const button = document.getElementById(buttonId);
    if (!button) return;
    button.addEventListener('click', event => {
      layerVisibility[layerKey] = !layerVisibility[layerKey];
      setLayerButtonState(event.currentTarget, layerVisibility[layerKey]);
      const scenario = SCENARIOS[currentScenarioKey];
      const point = scenario.forecastTrack.find(item => item.hour === currentForecastHour) || scenario.forecastTrack[0];
      updatePrototypeOverlays(point);
    });
  });

  document.querySelectorAll('[data-weather-variable]').forEach(button => {
    button.addEventListener('click', () => setWeatherVariable(button.dataset.weatherVariable));
  });
  const satelliteSelector = document.getElementById('satelliteLayerSelect');
  if (satelliteSelector) satelliteSelector.addEventListener('change', event => setSatelliteLayer(event.target.value));
  document.getElementById('weatherModelIcon')?.addEventListener('click', () => setWeatherModel('icon_seamless'));
  document.getElementById('weatherModelGfs')?.addEventListener('click', () => setWeatherModel('ncep_gfs_seamless'));
  document.querySelectorAll('.timeline-labels .tick').forEach(tick => {
    tick.setAttribute('role', 'button');
    tick.setAttribute('tabindex', '0');
    tick.addEventListener('click', () => {
      stopPlay();
      setForecastHour(Number(tick.dataset.hour));
    });
    tick.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        tick.click();
      }
    });
  });

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

  // Multi-Source Fusion source clicks
  const fusionInsat = document.getElementById('fusionSrcInsat');
  if (fusionInsat) fusionInsat.addEventListener('click', () => selectSatelliteSource('insat'));
  const fusionMicro = document.getElementById('fusionSrcMicrowave');
  if (fusionMicro) fusionMicro.addEventListener('click', () => selectSatelliteSource('microwave'));
  const fusionOscat = document.getElementById('fusionSrcOscat');
  if (fusionOscat) fusionOscat.addEventListener('click', () => selectSatelliteSource('oscat'));

  // Initialize satellite panel with default source (insat)
  selectSatelliteSource('insat');

  // Initialize flow pipeline on load
  updateFlowPipeline(0, SCENARIOS[currentScenarioKey].forecastTrack[0]);

  setupMapActionHandlers();
}

function setLayerButtonState(button, isActive) {
  if (!button) return;
  button.classList.toggle('active', isActive);
  button.setAttribute('aria-pressed', String(isActive));
}

function setupMapActionHandlers() {
  const worldViewBtn = document.getElementById('mapWorldViewBtn');
  if (worldViewBtn) worldViewBtn.addEventListener('click', () => {
    if (mapInstance) mapInstance.fitBounds([[-55, -180], [75, 180]], { animate: true, padding: [12, 12] });
  });

  const locateBtn = document.getElementById('mapLocateStormBtn');
  if (locateBtn) locateBtn.addEventListener('click', () => {
    if (!mapInstance) return;
    const target = selectedLiveStorm?.liveMarker || mapLayers.stormMarker;
    if (target) mapInstance.setView(target.getLatLng(), Math.max(7, mapInstance.getZoom()), { animate: true });
  });

  const refreshBtn = document.getElementById('mapRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    stopDemo();
    stopPlay();
    stopObsPlay();
    refreshLiveCyclones();
    if (!selectedLiveStorm) loadScenario(currentScenarioKey);
    else updateOperationalStatus();
    if (activeWeatherVariable) loadWeatherGrid();
    if (mapInstance) mapInstance.invalidateSize();
  });

  const fullscreenBtn = document.getElementById('mapFullscreenBtn');
  const dashboard = document.getElementById('page-dashboard');
  if (fullscreenBtn && dashboard) {
    const getFullscreenTarget = () => {
      if (activePage === 'dashboard') return dashboard;
      const wrapper = document.querySelector('.dash-map-wrapper');
      return wrapper?.closest('.body-col-main') || wrapper || dashboard;
    };

    fullscreenBtn.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await getFullscreenTarget().requestFullscreen();
      } catch (error) {
        console.warn('Map fullscreen is unavailable in this browser context.', error);
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const active = document.fullscreenElement === getFullscreenTarget();
      fullscreenBtn.setAttribute('aria-pressed', String(active));
      fullscreenBtn.setAttribute('aria-label', active ? 'Exit map fullscreen' : 'Enter map fullscreen');
      fullscreenBtn.title = active ? 'Exit map fullscreen' : 'Enter map fullscreen';
      if (mapInstance) setTimeout(() => mapInstance.invalidateSize(), 60);
    });
  }

  const layerPanel = document.getElementById('mapLayerPanel');
  const layerPanelToggle = document.getElementById('layerPanelToggle');
  if (layerPanel && layerPanelToggle) {
    if (window.matchMedia && window.matchMedia('(max-width: 680px)').matches) {
      layerPanel.classList.add('is-collapsed');
      layerPanelToggle.setAttribute('aria-expanded', 'false');
      layerPanelToggle.setAttribute('aria-label', 'Expand map overlays');
      layerPanelToggle.title = 'Expand map overlays';
      layerPanelToggle.textContent = '+';
    }

    layerPanelToggle.addEventListener('click', () => {
      const collapsed = layerPanel.classList.toggle('is-collapsed');
      layerPanelToggle.setAttribute('aria-expanded', String(!collapsed));
      layerPanelToggle.setAttribute('aria-label', collapsed ? 'Expand map overlays' : 'Collapse map overlays');
      layerPanelToggle.title = collapsed ? 'Expand map overlays' : 'Collapse map overlays';
      layerPanelToggle.textContent = collapsed ? '+' : '−';
    });
  }
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

  // 3. Highlight selected source in Multi-Source Fusion panel
  const fMap = { insat: 'fusionSrcInsat', microwave: 'fusionSrcMicrowave', oscat: 'fusionSrcOscat' };
  ['fusionSrcInsat', 'fusionSrcMicrowave', 'fusionSrcOscat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('selected-source');
  });
  const selEl = document.getElementById(fMap[sourceKey]);
  if (selEl) selEl.classList.add('selected-source');
  if (sodDiagVal) sodDiagVal.textContent = data.coreDiagnostic;
  if (sodResVal) sodResVal.textContent = data.resolution;
  if (sodNote) sodNote.textContent = data.note;
}

function applyLayerVisibility() {
  if (!mapInstance) return;
  if (selectedLiveStorm) {
    hideScenarioMapLayersForLiveStorm();
    return;
  }
  if (mapLayers.pastTrack) {
    if (layerVisibility.pastTrack) mapInstance.addLayer(mapLayers.pastTrack);
    else mapInstance.removeLayer(mapLayers.pastTrack);
  }
  mapLayers.pastTrackMarkers.forEach(marker => {
    if (layerVisibility.pastTrack) mapInstance.addLayer(marker);
    else mapInstance.removeLayer(marker);
  });
  if (mapLayers.coastalBuffer) {
    if (layerVisibility.coastalBuffer) mapInstance.addLayer(mapLayers.coastalBuffer);
    else mapInstance.removeLayer(mapLayers.coastalBuffer);
  }
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
    const forecastHours = SCENARIOS[currentScenarioKey].forecastTrack.map(point => point.hour);
    const currentIndex = forecastHours.indexOf(currentForecastHour);
    const nextIndex = currentIndex < 0 || currentIndex === forecastHours.length - 1 ? 0 : currentIndex + 1;
    setForecastHour(forecastHours[nextIndex]);
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
      clockEl.textContent = `UTC ${utcHours}:${utcMins}`;
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

// ==========================================================================
// FEATURE: IMD Wind-Speed-Based Cyclone Classification (Prototype)
// ==========================================================================
function classifyWindKmh(kmh) {
  if (kmh >= 222) return 'Super Cyclonic Storm';
  if (kmh >= 167) return 'Extremely Severe Cyclonic Storm';
  if (kmh >= 118) return 'Very Severe Cyclonic Storm';
  if (kmh >= 89)  return 'Severe Cyclonic Storm';
  if (kmh >= 62)  return 'Cyclonic Storm';
  if (kmh >= 51)  return 'Deep Depression';
  if (kmh >= 31)  return 'Depression';
  return 'Well Marked Low';
}

function updateClassification(currentWindKmh) {
  const scenario = SCENARIOS[currentScenarioKey];
  const fc = scenario.forecastTrack;

  // Current classification
  const el0 = document.getElementById('classCatCurrent');
  const ew0 = document.getElementById('classWindCurrent');
  if (el0) el0.textContent = classifyWindKmh(currentWindKmh);
  if (ew0) ew0.textContent = `${currentWindKmh} km/h`;

  // 24h, 48h, 72h from forecast track
  [24, 48, 72].forEach(h => {
    const pt = fc.find(p => p.hour === h);
    if (!pt) return;
    const kmh = Math.round(pt.kts * 1.852);
    const catEl = document.getElementById(`classCat${h}`);
    const windEl = document.getElementById(`classWind${h}`);
    if (catEl) catEl.textContent = classifyWindKmh(kmh);
    if (windEl) windEl.textContent = `${kmh} km/h`;
  });
}

// ==========================================================================
// FEATURE: Inner-Core Structural Change
// ==========================================================================
const INNER_CORE_STATES = ['ORGANIZED', 'DEVELOPING', 'CONSOLIDATING', 'RAPIDLY INTENSIFYING', 'HIGHLY ORGANIZED'];
const INNER_CORE_EYE = ['26 km', '24 km', '22 km', '20 km', '18 km'];

function updateInnerCore(stepIndex) {
  const idx = Math.max(0, Math.min(4, stepIndex));

  // Update timeline active/passed states
  document.querySelectorAll('.ic-step').forEach((el, i) => {
    el.classList.remove('active', 'passed');
    if (i < idx) el.classList.add('passed');
    else if (i === idx) el.classList.add('active');
  });

  // Update change detection tag
  const changeTag = document.getElementById('innercoreChangeTag');
  if (changeTag) {
    if (idx >= 3) {
      changeTag.textContent = 'DETECTED';
      changeTag.style.color = 'var(--alert-red)';
      changeTag.style.background = 'rgba(244, 63, 94, 0.1)';
    } else if (idx >= 1) {
      changeTag.textContent = 'MONITORING';
      changeTag.style.color = 'var(--alert-yellow)';
      changeTag.style.background = 'rgba(251, 191, 36, 0.1)';
    } else {
      changeTag.textContent = 'BASELINE';
      changeTag.style.color = 'var(--text-dim)';
      changeTag.style.background = 'rgba(100, 116, 139, 0.1)';
    }
  }

  // Update eye contraction display
  const eyeEl = document.getElementById('icEyeChange');
  if (eyeEl) eyeEl.textContent = `${INNER_CORE_EYE[0]} → ${INNER_CORE_EYE[idx]}`;

  // Update change window
  const windowEl = document.getElementById('icChangeWindow');
  if (windowEl) windowEl.textContent = `${idx * 15} MINUTES`;
}

// ==========================================================================
// FEATURE: Multi-Source Fusion
// ==========================================================================
function updateMultiSourceFusion(stepIndex, forecastPt) {
  const hour = currentForecastHour || 0;

  // Confidence degrades over forecast time
  const baseCenterConf = CENTER_FIX_CONFIDENCE[hour] || Math.max(40, 94 - hour);
  const windConf = Math.max(50, baseCenterConf - 3);
  const riConf = Math.min(95, Math.max(30, stepIndex >= 4 ? 82 : (stepIndex * 18 + 10)));

  const elCenter = document.getElementById('fusionConfCenter');
  const elWind = document.getElementById('fusionConfWind');
  const elRI = document.getElementById('fusionConfRI');

  if (elCenter) elCenter.textContent = `${baseCenterConf}%`;
  if (elWind) elWind.textContent = `${windConf}%`;
  if (elRI) elRI.textContent = `${riConf}%`;
}

// ==========================================================================
// FEATURE: Oceanic & Atmospheric Predictors
// ==========================================================================
function updatePredictors(stepIndex, forecastPt) {
  const envData = (window.cycloneData && window.cycloneData.environment) || { oceanHeatContent: 82, windShear: 9, distanceToCoast: 85 };
  const obsList = (window.cycloneData && window.cycloneData.observations) || [];
  const idx = Math.max(0, Math.min(obsList.length - 1, stepIndex !== undefined ? stepIndex : 4));
  const obs = obsList[idx] || { windKmh: 121, pressureHpa: 972 };
  const baseline = obsList[0] || { windKmh: 82, pressureHpa: 990 };

  const ohc = envData.oceanHeatContent;
  const shear = envData.windShear;
  const coast = (currentForecastHour === 0) ? envData.distanceToCoast : (forecastPt && forecastPt.dist !== undefined ? Math.max(0, forecastPt.dist) : envData.distanceToCoast);
  const deltaPress = obs.pressureHpa - baseline.pressureHpa;
  const sst = 29.4; // Mock SST

  // OHC status
  setPredictor('predOhc', `${ohc} kJ/cm²`, 'predOhcStatus', ohc >= 60 ? 'FAVORABLE' : (ohc >= 40 ? 'MODERATE' : 'UNFAVORABLE'));
  // SST status
  setPredictor('predSst', `${sst}°C`, 'predSstStatus', sst >= 28 ? 'FAVORABLE' : (sst >= 26 ? 'MODERATE' : 'UNFAVORABLE'));
  // Shear status (low is favorable for RI)
  setPredictor('predShear', `${shear} kt`, 'predShearStatus', shear <= 15 ? 'FAVORABLE' : (shear <= 25 ? 'MODERATE' : 'UNFAVORABLE'));
  // Pressure trend
  setPredictor('predPress', `${deltaPress} hPa / 60 min`, 'predPressStatus', deltaPress <= -10 ? 'FAVORABLE' : (deltaPress <= -5 ? 'MODERATE' : 'UNFAVORABLE'));
  // Coast distance (closer is more critical)
  setPredictor('predCoast', `${coast} km`, 'predCoastStatus', coast <= 100 ? 'FAVORABLE' : (coast <= 200 ? 'MODERATE' : 'UNFAVORABLE'));

  // Combined assessment
  let favCount = 0;
  if (ohc >= 60) favCount++;
  if (sst >= 28) favCount++;
  if (shear <= 15) favCount++;
  if (deltaPress <= -10) favCount++;
  if (coast <= 150) favCount++;

  const combinedBox = document.getElementById('predCombinedBox');
  const combinedVal = document.getElementById('predCombinedVal');
  if (combinedBox) {
    combinedBox.classList.remove('unfavorable', 'moderate');
    if (favCount >= 4) {
      if (combinedVal) combinedVal.textContent = 'HIGHLY FAVORABLE';
    } else if (favCount >= 2) {
      combinedBox.classList.add('moderate');
      if (combinedVal) combinedVal.textContent = 'MODERATELY FAVORABLE';
    } else {
      combinedBox.classList.add('unfavorable');
      if (combinedVal) combinedVal.textContent = 'UNFAVORABLE';
    }
  }
}

function setPredictor(valId, valText, statusId, status) {
  const valEl = document.getElementById(valId);
  const statusEl = document.getElementById(statusId);
  if (valEl) valEl.textContent = valText;
  if (statusEl) {
    statusEl.textContent = status;
    statusEl.classList.remove('pred-favorable', 'pred-moderate', 'pred-unfavorable');
    if (status === 'FAVORABLE') statusEl.classList.add('pred-favorable');
    else if (status === 'MODERATE') statusEl.classList.add('pred-moderate');
    else statusEl.classList.add('pred-unfavorable');
  }
}

// ==========================================================================
// FEATURE: Sub-Minute Advisory Engine
// ==========================================================================
const OBS_TIMES = ['10:00', '10:15', '10:30', '10:45', '11:00'];

function updateSubMinuteAdvisory(stepIndex, riStatus, riskLevel) {
  const idx = Math.max(0, Math.min(4, stepIndex));
  const obsTime = OBS_TIMES[idx];

  const lastObs = document.getElementById('subminLastObs');
  const analysis = document.getElementById('subminAnalysis');
  const advisory = document.getElementById('subminAdvisory');
  const nextObs = document.getElementById('subminNextObs');
  const alertEl = document.getElementById('subminAlert');
  const coastRisk = document.getElementById('subminCoastRisk');

  if (lastObs) lastObs.textContent = `${obsTime}:00`;
  if (analysis) analysis.textContent = `${obsTime}:08`;
  if (advisory) advisory.textContent = `${obsTime}:12`;

  // Next observation is 15 minutes later
  const nextIdx = Math.min(4, idx + 1);
  if (nextObs) nextObs.textContent = `${OBS_TIMES[nextIdx]}:00`;

  if (alertEl) {
    alertEl.textContent = riStatus || 'STABLE';
    alertEl.classList.remove('text-red', 'text-yellow', 'text-green');
    if (riStatus === 'RAPID INTENSIFICATION') alertEl.classList.add('text-red');
    else if (riStatus === 'ELEVATED' || riStatus === 'MONITORING') alertEl.classList.add('text-yellow');
    else alertEl.classList.add('text-green');
  }

  if (coastRisk) {
    coastRisk.textContent = riskLevel || 'LOW';
    coastRisk.classList.remove('text-red', 'text-yellow', 'text-green');
    if (riskLevel === 'HIGH') coastRisk.classList.add('text-red');
    else if (riskLevel === 'MODERATE') coastRisk.classList.add('text-yellow');
    else coastRisk.classList.add('text-green');
  }
}

// ==========================================================================
// FEATURE: SDMA / NDMA Advisory Preview
// ==========================================================================
function updateSdmaAdvisory(stepIndex, forecastPt, riStatus, riskLevel) {
  const envData = (window.cycloneData && window.cycloneData.environment) || { distanceToCoast: 85 };
  const obsList = (window.cycloneData && window.cycloneData.observations) || [];
  const idx = Math.max(0, Math.min(obsList.length - 1, stepIndex));
  const obs = obsList[idx] || { windKmh: 121 };
  const baseline = obsList[0] || { windKmh: 82 };
  const deltaWind = obs.windKmh - baseline.windKmh;
  const coast = (currentForecastHour === 0) ? envData.distanceToCoast : (forecastPt && forecastPt.dist !== undefined ? Math.max(0, forecastPt.dist) : envData.distanceToCoast);

  const alertEl = document.getElementById('sdmaAlert');
  const riskEl = document.getElementById('sdmaRisk');
  const intensEl = document.getElementById('sdmaIntensification');
  const coastEl = document.getElementById('sdmaCoastDist');
  const monEl = document.getElementById('sdmaMonitoring');

  if (alertEl) alertEl.textContent = riStatus || 'STABLE';
  if (riskEl) {
    riskEl.textContent = riskLevel || 'LOW';
    riskEl.classList.remove('text-red', 'text-yellow', 'text-green');
    if (riskLevel === 'HIGH') riskEl.classList.add('text-red');
    else if (riskLevel === 'MODERATE') riskEl.classList.add('text-yellow');
    else riskEl.classList.add('text-green');
  }
  if (intensEl) intensEl.textContent = deltaWind > 0 ? `+${Math.max(0, deltaWind - 5)} to +${deltaWind + 5} km/h` : 'Minimal';
  if (coastEl) coastEl.textContent = `${coast} km`;
  if (monEl) {
    monEl.textContent = riskLevel === 'HIGH' ? 'IMMEDIATE' : (riskLevel === 'MODERATE' ? 'ELEVATED' : 'ROUTINE');
    monEl.classList.remove('text-red', 'text-yellow');
    if (riskLevel === 'HIGH') monEl.classList.add('text-red');
    else if (riskLevel === 'MODERATE') monEl.classList.add('text-yellow');
  }
}

// Advisory Modal handlers
function openAdvisoryModal() {
  const modal = document.getElementById('advisoryModal');
  if (!modal) return;

  // Populate modal with current data
  const obsList = (window.cycloneData && window.cycloneData.observations) || [];
  const obs = obsList[currentObsIndex] || { windKmh: 121 };
  const kts = Math.round(obs.windKmh / 1.852);
  const scenario = SCENARIOS[currentScenarioKey];
  const envData = (window.cycloneData && window.cycloneData.environment) || {};
  const coast = envData.distanceToCoast || 85;
  const hour = currentForecastHour || 0;
  const confidence = CENTER_FIX_CONFIDENCE[hour] || 94;

  const advStatus = document.getElementById('advCycloneStatus');
  const advIntensity = document.getElementById('advIntensity');
  const advRiProb = document.getElementById('advRiProb');
  const advCoastRisk = document.getElementById('advCoastRisk');
  const advCenterConf = document.getElementById('advCenterConf');
  const advLatestObs = document.getElementById('advLatestObs');

  if (advStatus) advStatus.textContent = `${classifyWindKmh(obs.windKmh)} '${cycloneData.name}'`;
  if (advIntensity) advIntensity.textContent = `${obs.windKmh} km/h (${kts} kts)`;
  if (advRiProb) advRiProb.textContent = document.getElementById('pgProbVal')?.textContent || '82%';
  if (advCoastRisk) advCoastRisk.textContent = document.getElementById('riRiskStatusText')?.textContent || 'HIGH';
  if (advCenterConf) advCenterConf.textContent = `${confidence}%`;
  if (advLatestObs) advLatestObs.textContent = OBS_TIMES[currentObsIndex] + ' UTC';

  modal.classList.add('open');
}

function closeAdvisoryModal() {
  const modal = document.getElementById('advisoryModal');
  if (modal) modal.classList.remove('open');
}

function exportAdvisoryPreview() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt', 'a4');

  const obs = (window.cycloneData && window.cycloneData.observations && window.cycloneData.observations[currentObsIndex]) || { windKmh: 121 };
  const kts = Math.round(obs.windKmh / 1.852);
  const scenario = SCENARIOS[currentScenarioKey] || SCENARIOS['bay_of_bengal'];
  const curPoint = scenario.forecastTrack[0] || {};
  
  // Page 1: Executive Summary
  doc.setFontSize(22);
  doc.setTextColor(220, 38, 38);
  doc.text("VAYUDRISHTI CYCLONE ADVISORY", 40, 60);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("SDMA / NDMA OFFICIAL PREVIEW (SIMULATED PROTOTYPE)", 40, 85);
  
  doc.setLineWidth(2);
  doc.setDrawColor(220, 38, 38);
  doc.line(40, 95, 550, 95);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`System: ${scenario.category} '${scenario.name}'`, 40, 130);
  doc.text(`Current Intensity: ${obs.windKmh} km/h (${kts} kts)`, 40, 160);
  
  const riProb = document.getElementById('pgProbVal')?.textContent || '82%';
  const riskLevel = document.getElementById('subminCoastRisk')?.textContent || 'HIGH';
  const centerConf = document.getElementById('cfConfVal')?.textContent || '94%';
  const dist = curPoint.dist || 85;
  
  doc.text(`RI Probability: ${riProb}`, 40, 190);
  doc.text(`Near-Coast Risk: ${riskLevel}`, 40, 220);
  doc.text(`Center Confidence: ${centerConf}`, 40, 250);
  doc.text(`Distance to Coast: ${dist} km`, 40, 280);
  
  doc.setFontSize(14);
  doc.setTextColor(220, 38, 38);
  doc.text("ACTION: IMMEDIATE MONITORING REQUIRED", 40, 330);
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("Generated: " + new Date().toISOString(), 40, 800);
  doc.text("Page 1 of 5", 500, 800);
  
  // Page 2: Current Observations
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("1. CURRENT OBSERVATIONS & TELEMETRY", 40, 60);
  
  doc.autoTable({
    startY: 80,
    head: [['Metric', 'Value', 'Status']],
    body: [
      ['Wind Speed', `${obs.windKmh} km/h`, 'CRITICAL'],
      ['Central Pressure', `${curPoint.hpa} hPa`, 'DROPPING'],
      ['Eye Diameter', `${curPoint.eye} km`, 'CONTRACTING'],
      ['Location', `${curPoint.lat}°N, ${curPoint.lng}°E`, 'TRACKING'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59] }
  });
  doc.text("Page 2 of 5", 500, 800);

  // Page 3: Forecast Track & Intensity
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("2. 72-HOUR FORECAST TRACK", 40, 60);
  
  const forecastBody = scenario.forecastTrack.map(p => [
    `T+${p.hour}h`, 
    `${p.lat}°N, ${p.lng}°E`, 
    `${Math.round(p.kts * 1.852)} km/h`, 
    p.desc
  ]);
  
  doc.autoTable({
    startY: 80,
    head: [['Time', 'Location', 'Wind Intensity', 'Remarks']],
    body: forecastBody,
    theme: 'grid',
    headStyles: { fillColor: [0, 150, 200] }
  });
  doc.text("Page 3 of 5", 500, 800);

  // Page 4: Risk Analysis
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("3. RISK ANALYSIS & COASTAL IMPACT", 40, 60);
  
  doc.setFontSize(12);
  doc.text(`The cyclone is currently ${Math.max(0, dist)} km from the coast.`, 40, 100);
  doc.text(`Rapid Intensification (RI) risk is assessed at ${riProb}.`, 40, 120);
  if (dist > 0 && dist < 200) {
    doc.setTextColor(220, 38, 38);
    doc.text("WARNING: Cyclone is within the 200km Danger Buffer Zone.", 40, 150);
  } else if (dist <= 0) {
    doc.setTextColor(220, 38, 38);
    doc.text("WARNING: Cyclone is currently making landfall or inland.", 40, 150);
  }
  doc.setTextColor(0, 0, 0);
  
  const sectors = scenario.landfallSectors || [];
  if (sectors.length > 0) {
    doc.text("Expected Landfall Sectors:", 40, 190);
    const sectorBody = sectors.map(s => [s.name, `${s.prob}%`]);
    doc.autoTable({
      startY: 210,
      head: [['Sector', 'Probability']],
      body: sectorBody,
      theme: 'grid',
      headStyles: { fillColor: [220, 38, 38] }
    });
  }
  doc.text("Page 4 of 5", 500, 800);

  // Page 5: Directives
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("4. DISASTER MANAGEMENT DIRECTIVES", 40, 60);
  
  const directives = [
    ["1", "Activate State Emergency Operations Center (SEOC)"],
    ["2", "Evacuate low-lying coastal zones within 5km of shoreline"],
    ["3", "Suspend all fishing and marine activities"],
    ["4", "Deploy NDRF and SDRF teams to high-probability sectors"]
  ];
  
  doc.autoTable({
    startY: 80,
    head: [['#', 'Directive']],
    body: directives,
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59] }
  });
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("END OF REPORT - SIMULATED PROTOTYPE (SIH 2025)", 40, 250);
  doc.text("Page 5 of 5", 500, 800);
  
  doc.save(`VayuDrishti_Advisory_Preview_${Date.now()}.pdf`);
}

// ==========================================================================
// INTEGRATION: Wire new features into existing update flows
// ==========================================================================

// Extend selectObservation to update all new panels
const _originalSelectObservation = selectObservation;
selectObservation = function(stepIndex) {
  _originalSelectObservation(stepIndex);

  const obs = (window.cycloneData && window.cycloneData.observations && window.cycloneData.observations[stepIndex]) || { windKmh: 121 };
  const baseline = (window.cycloneData && window.cycloneData.observations && window.cycloneData.observations[0]) || { windKmh: 82 };
  const intensityIncrease = obs.windKmh - baseline.windKmh;

  let riStatus = 'STABLE';
  let riskLevel = 'LOW';
  if (stepIndex === 4 || intensityIncrease >= 30) { riStatus = 'RAPID INTENSIFICATION'; riskLevel = 'HIGH'; }
  else if (stepIndex === 3 || intensityIncrease >= 20) { riStatus = 'ELEVATED'; riskLevel = 'MODERATE'; }
  else if (stepIndex === 2 || intensityIncrease >= 10) { riStatus = 'MONITORING'; riskLevel = 'LOW'; }

  updateInnerCore(stepIndex);
  updateMultiSourceFusion(stepIndex, null);
  updatePredictors(stepIndex, null);
  updateClassification(obs.windKmh);
  updateSubMinuteAdvisory(stepIndex, riStatus, riskLevel);
  updateSdmaAdvisory(stepIndex, null, riStatus, riskLevel);
};

// Extend syncObsToForecastHour to update new panels during forecast scrubbing
const _originalSyncObs = syncObsToForecastHour;
syncObsToForecastHour = function(stepIndex, forecastPt) {
  _originalSyncObs(stepIndex, forecastPt);

  const obs = (window.cycloneData && window.cycloneData.observations && window.cycloneData.observations[stepIndex]) || { windKmh: 121 };
  const baseline = (window.cycloneData && window.cycloneData.observations && window.cycloneData.observations[0]) || { windKmh: 82 };
  const windKmh = currentForecastHour > 0 ? Math.round((forecastPt.kts || 0) * 1.852) : obs.windKmh;
  const intensityIncrease = obs.windKmh - baseline.windKmh;

  let riStatus = 'STABLE';
  let riskLevel = 'LOW';
  if (currentForecastHour >= 24) { riStatus = 'WEAKENING'; riskLevel = 'LOW'; }
  else if (stepIndex === 4 || (currentForecastHour > 0 && currentForecastHour <= 18)) { riStatus = 'RAPID INTENSIFICATION'; riskLevel = 'HIGH'; }
  else if (stepIndex === 3 || intensityIncrease >= 20) { riStatus = 'ELEVATED'; riskLevel = 'MODERATE'; }
  else if (stepIndex === 2 || intensityIncrease >= 10) { riStatus = 'MONITORING'; riskLevel = 'LOW'; }

  updateInnerCore(stepIndex);
  updateMultiSourceFusion(stepIndex, forecastPt);
  updatePredictors(stepIndex, forecastPt);
  updateClassification(windKmh);
  updateSubMinuteAdvisory(stepIndex, riStatus, riskLevel);
  updateSdmaAdvisory(stepIndex, forecastPt, riStatus, riskLevel);
};

// Wire up SDMA/NDMA buttons + modal after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.getElementById('viewAdvisoryBtn');
  const exportBtn = document.getElementById('exportAdvisoryBtn');
  const closeBtn = document.getElementById('closeAdvisoryBtn');
  const overlay = document.getElementById('advisoryModal');

  if (viewBtn) viewBtn.addEventListener('click', openAdvisoryModal);
  if (exportBtn) exportBtn.addEventListener('click', exportAdvisoryPreview);
  if (closeBtn) closeBtn.addEventListener('click', closeAdvisoryModal);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAdvisoryModal();
  });
});

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
  document.querySelector(`.nav-tab[data-page="${pageId}"]`)?.classList.add('active');

  // Update nav-item highlights (legacy sidebar, if any)
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${pageId}"]`)?.classList.add('active');

  // Show correct page
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');

  // Handle Map Reparenting (Leaflet can only render in one container at a time)
  const mapWrapper = document.querySelector('.dash-map-wrapper');
  const dashMapCard = document.querySelector('.dash-map-card');
  const trackingMapContainer = document.getElementById('tracking-map-container');
  const forecastMapContainer = document.getElementById('fc-map-container');

  if (pageId === 'dashboard' && dashMapCard && mapWrapper) {
    dashMapCard.appendChild(mapWrapper);
  } else if (pageId === 'tracking' && trackingMapContainer && mapWrapper) {
    trackingMapContainer.appendChild(mapWrapper);
  } else if (pageId === 'forecast' && forecastMapContainer && mapWrapper) {
    forecastMapContainer.appendChild(mapWrapper);
  }

  if (mapInstance && (pageId === 'dashboard' || pageId === 'tracking' || pageId === 'forecast')) {
    setTimeout(() => mapInstance.invalidateSize(), 60);
  }
  updateOperationalStatus();

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
  
  const cycloneName = scenarioData ? `${scenarioData.category.split(' ').slice(0,2).join(' ')} '${scenarioData.name}'` : scenario.name;
  setT('dashCycloneName', cycloneName);
  setT('dashPosition', `${pt.lat}°N, ${pt.lng}°E`);
  setT('dashIntensity', scenarioData?.category || scenario.category);
  
  const windKts = obs.windKmh ? Math.round(obs.windKmh / 1.852) : (pt.kts || 95);
  const windKmh = obs.windKmh || Math.round(windKts * 1.852);
  const windEl = document.getElementById('dashMaxWind');
  if (windEl) windEl.innerHTML = `${windKts} kt <span class="status-cell-sub">(${windKmh} km/h)</span>`;
  
  setT('dashPressure', (obs.pressureHpa || pt.hpa || 958) + ' hPa');
  
  const motion = scenarioData?.currentIntensity;
  setT('dashMovement', motion ? `${motion.motionHeading.split('(')[1]?.replace(')','')} • ${motion.motionSpeed}` : 'NNW • 15 km/h');
  
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
      tr.innerHTML = `
        <td><strong>${step.hour}</strong>${isLandfall ? ' <span class="tag-lf">LF</span>' : ''}</td>
        <td>${step.location}</td>
        <td class="text-red">${step.intensityKts} kt (${step.intensityKmh} km/h)</td>
        <td class="${confClass}">${conf}</td>
      `;
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
    whyContainer.innerHTML = exRisk.factors.map(f => `
      <div class="why-box-row">
        <span class="why-icon ${f.startsWith('↑') ? 'text-red' : (f.startsWith('↓') ? 'text-green' : 'text-yellow')}">${f[0]}</span>
        ${f.slice(2)}
      </div>
    `).join('');
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
      return `
        <div class="dash-pri-row">
          <div class="pri-left">
            <span class="pri-marker ${markerClass}"></span>
            <div>
              <strong>${a.category}</strong>
              <div class="pri-sub">${a.action.substring(0, 60)}${a.action.length > 60 ? '…' : ''}</div>
            </div>
          </div>
          <span class="status-risk-pill ${pillClass}">${a.priority}</span>
        </div>
      `;
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
        tr.innerHTML = `
          <td>T+${p.hour}h</td>
          <td>${p.lat}°N, ${p.lng}°E</td>
          <td>${p.windKmh} km/h</td>
          <td>${p.hour === 0 ? 958 : (958 + p.hour / 2)} hPa</td>
          <td class="text-${p.confidence > 80 ? 'green' : (p.confidence > 60 ? 'yellow' : 'red')}">${p.confidence}%</td>
        `;
      } else {
        // CYCLONE_SCENARIOS forecastCheckpoints style
        const confClass = p.confidence === 'High' ? 'text-green' : (p.confidence === 'Moderate' ? 'text-yellow' : 'text-red');
        tr.innerHTML = `
          <td>T+${p.hour}</td>
          <td>${p.location}</td>
          <td>${p.intensityKmh} km/h</td>
          <td>-</td>
          <td class="${confClass}">${p.confidence}</td>
        `;
      }
      tbody.appendChild(tr);
    });
  }
  // Refresh landfall sectors
  const lsEl = document.getElementById('landfallSectors');
  if (lsEl) {
    const scenario = SCENARIOS[currentScenarioKey];
    lsEl.innerHTML = (scenario.landfallSectors || []).map(s => `
      <div class="landfall-row">
        <span style="color:${s.color}; font-weight:700;">${s.name}</span>
        <div class="sector-bar-track"><div class="sector-bar-fill" style="width:${s.prob}%; background:${s.color};"></div></div>
        <span class="sector-val">${s.prob}%</span>
      </div>
    `).join('');
  }
}

// ----- RI PAGE -----
function populateRIPage() {
  const scenarioData = (typeof CYCLONE_SCENARIOS !== 'undefined') ? CYCLONE_SCENARIOS[currentScenarioKey] : null;
  const exRisk = scenarioData?.explainableRisk || {};

  const reasons = document.getElementById('ri-why-reasons');
  if (reasons && exRisk.factors) {
    reasons.innerHTML = exRisk.factors.map(f => `
      <div class="ri-why-item">
        <span class="${f.startsWith('↑') ? 'text-red' : (f.startsWith('↓') ? 'text-green' : 'text-yellow')}">${f[0]}</span>
        ${f.slice(2)}
      </div>
    `).join('');
  }

  // Update RI predictor values
  const rc = scenarioData?.rapidChange || {};
  const riw = scenarioData?.riWatch || {};
  const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setT('pgValTrend', rc.intensityTrend ? (rc.intensityTrend.match(/[+-]?\d+ km\/h/) || [])[0] || rc.intensityTrend : '+39 km/h');
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
