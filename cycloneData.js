// Simple reusable mock data layer for one tropical cyclone
const cycloneData = {
  id: "TC-2026-01",
  name: "VAJRA",
  category: "Very Severe Cyclonic Storm",
  status: "Active - Near-Coast Rapid Intensification",

  // 15-minute rapid observations (Innovation 1: Intra-Cycle Rapid Intel)
  observations: [
    {
      step: 0,
      label: "T-60",
      time: "10:00",
      windKmh: 82,
      pressureHpa: 990,
      intensityChange: "Baseline (0 km/h)",
      deltaKmh: 0,
      deltaPress: 0,
      category: "Cyclonic Storm (82 km/h)",
      note: "Standard coastal tracking. Normal convective baseline."
    },
    {
      step: 1,
      label: "T-45",
      time: "10:15",
      windKmh: 89,
      pressureHpa: 986,
      intensityChange: "+7 km/h (+8.5%)",
      deltaKmh: 7,
      deltaPress: -4,
      category: "Severe Cyclonic Storm (89 km/h)",
      note: "Central dense overcast cloud tops cooling to -80°C."
    },
    {
      step: 2,
      label: "T-30",
      time: "10:30",
      windKmh: 97,
      pressureHpa: 982,
      intensityChange: "+8 km/h (+9.0%)",
      deltaKmh: 8,
      deltaPress: -4,
      category: "Severe Cyclonic Storm (97 km/h)",
      note: "Inner core tightening. Convective burst cluster detected."
    },
    {
      step: 3,
      label: "T-15",
      time: "10:45",
      windKmh: 108,
      pressureHpa: 977,
      intensityChange: "+11 km/h (+11.3%)",
      deltaKmh: 11,
      deltaPress: -5,
      category: "Very Severe Cyclonic Storm (108 km/h)",
      note: "Eyewall wrap completing. Sharp pressure plunge."
    },
    {
      step: 4,
      label: "NOW",
      time: "11:00",
      windKmh: 121,
      pressureHpa: 972,
      intensityChange: "+13 km/h (+12.0%)",
      deltaKmh: 13,
      deltaPress: -5,
      category: "Very Severe Cyclonic Storm (121 km/h)",
      note: "EXPLOSIVE RI: +39 km/h surge and -18 hPa in 60 min near coast!"
    }
  ],

  // Probabilistic 0-72h forecast (Innovation 3: Probabilistic 0-72h Forecast)
  forecast: [
    { hour: 0, windKmh: 125, confidence: 94 },
    { hour: 12, windKmh: 132, confidence: 86 },
    { hour: 24, windKmh: 140, confidence: 78 },
    { hour: 48, windKmh: 148, confidence: 69 },
    { hour: 72, windKmh: 155, confidence: 61 }
  ],

  // Environmental tensors (Innovation 2: Near-Coast RI Watch)
  environment: {
    oceanHeatContent: 82, // kJ/cm²
    windShear: 9,          // kt
    distanceToCoast: 85    // km
  },

  // Geospatial mock coordinates for the approaching cyclone
  geo: {
    basin: "Bay of Bengal (North-West Sector)",
    currentCoords: [18.2, 86.8],
    motionVector: { headingDeg: 335, direction: "NNW", speedKmh: 15 },
    currentIntensity: {
      category: "Very Severe Cyclonic Storm",
      knots: 95,
      kmh: 175,
      pressureHpa: 958,
      eyeDiameterKm: 18,
      distanceToCoastKm: 172
    },

    // Coastline definition (Odisha, Andhra Pradesh, West Bengal)
    coastline: [
      { name: "Chennai Coast", lat: 13.08, lng: 80.27 },
      { name: "Nellore", lat: 14.44, lng: 80.00 },
      { name: "Ongole", lat: 15.50, lng: 80.05 },
      { name: "Bapatla", lat: 15.90, lng: 80.47 },
      { name: "Machilipatnam", lat: 16.18, lng: 81.14 },
      { name: "Kakinada", lat: 16.98, lng: 82.24 },
      { name: "Visakhapatnam", lat: 17.69, lng: 83.22 },
      { name: "Srikakulam", lat: 18.30, lng: 83.90 },
      { name: "Gopalpur", lat: 19.26, lng: 84.90 },
      { name: "Chilika Lake", lat: 19.65, lng: 85.35 },
      { name: "Puri", lat: 19.81, lng: 85.83 },
      { name: "Konark", lat: 19.88, lng: 86.10 },
      { name: "Paradip Port", lat: 20.32, lng: 86.61 },
      { name: "Dhamra Port", lat: 20.80, lng: 86.95 },
      { name: "Chandipur", lat: 21.47, lng: 87.02 },
      { name: "Digha", lat: 21.62, lng: 87.52 },
      { name: "Haldia", lat: 22.06, lng: 88.06 },
      { name: "Kolkata / Sundarbans", lat: 22.45, lng: 88.50 }
    ],

    // Land polygon to render realistic coastal landmass
    landPolygon: [
      [13.08, 80.27], [14.44, 80.00], [15.50, 80.05], [15.90, 80.47], [16.18, 81.14],
      [16.98, 82.24], [17.69, 83.22], [18.30, 83.90], [19.26, 84.90], [19.65, 85.35],
      [19.81, 85.83], [19.88, 86.10], [20.32, 86.61], [20.80, 86.95], [21.47, 87.02],
      [21.62, 87.52], [22.06, 88.06], [22.45, 88.50],
      [24.50, 88.50], [24.50, 78.50], [12.00, 78.50], [12.00, 80.27]
    ],

    // Key coastal landmarks and warning statuses
    coastalCities: [
      { name: "Puri", lat: 19.81, lng: 85.83, role: "landfall", alert: "CRITICAL LANDFALL ZONE (T+24h)", status: "Direct Impact", distKm: 172 },
      { name: "Paradip Port", lat: 20.32, lng: 86.61, role: "port", alert: "SEVERE GALE WARNING", status: "High Risk", distKm: 235 },
      { name: "Gopalpur", lat: 19.26, lng: 84.90, role: "coastal", alert: "STORM SURGE ADVISORY", status: "Moderate Risk", distKm: 230 },
      { name: "Bhubaneswar", lat: 20.29, lng: 85.82, role: "capital", alert: "INLAND SQUALL WATCH", status: "Inland Watch", distKm: 245 },
      { name: "Visakhapatnam", lat: 17.69, lng: 83.22, role: "port", alert: "ROUGH SEAS ADVISORY", status: "Peripheral", distKm: 380 },
      { name: "Digha / WB", lat: 21.62, lng: 87.52, role: "coastal", alert: "COASTAL GALE WATCH", status: "Peripheral", distKm: 385 }
    ],

    // Observed historical positions (Past Track)
    pastTrack: [
      { step: -4, label: "T-24h", time: "11:00 UTC (Yesterday)", lat: 14.5, lng: 88.5, kts: 50, kmh: 93, hpa: 998, category: "Cyclonic Storm", status: "Depression consolidating" },
      { step: -3, label: "T-18h", time: "17:00 UTC (Yesterday)", lat: 15.4, lng: 88.0, kts: 65, kmh: 120, hpa: 990, category: "Severe Cyclonic Storm", status: "Convective overcast cooling" },
      { step: -2, label: "T-12h", time: "23:00 UTC (Last Night)", lat: 16.3, lng: 87.6, kts: 75, kmh: 139, hpa: 982, category: "Severe Cyclonic Storm", status: "Core tightening" },
      { step: -1, label: "T-6h",  time: "05:00 UTC (Morning)",    lat: 17.2, lng: 87.2, kts: 85, kmh: 157, hpa: 974, category: "Very Severe Cyclonic Storm", status: "Eyewall wrap initiating" },
      { step: 0,  label: "NOW",    time: "11:00 UTC (CURRENT)",    lat: 18.2, lng: 86.8, kts: 95, kmh: 175, hpa: 958, category: "Very Severe Cyclonic Storm", status: "Rapid Intensification Active", isCurrent: true }
    ],

    // Consensus Forecast Track with landfall at T+24h
    forecastTrack: [
      { hour: 0,  time: "NOW (11:00 UTC)", lat: 18.2, lng: 86.8, kts: 95,  kmh: 175, hpa: 958, eye: 18, dist: 172, category: "Very Severe Cyclonic Storm", desc: "Near-Coast Zone • Explosive RI", alert: "RAPID INTENSIFICATION" },
      { hour: 6,  time: "T+6h (17:00)",    lat: 18.8, lng: 86.4, kts: 105, kmh: 195, hpa: 950, eye: 16, dist: 125, category: "Extremely Severe Cyclonic Storm", desc: "Intense Inner Core Surging", alert: "EXTREME SURGE" },
      { hour: 12, time: "T+12h (23:00)",   lat: 19.3, lng: 86.0, kts: 115, kmh: 213, hpa: 942, eye: 15, dist: 80,  category: "Extremely Severe Cyclonic Storm", desc: "Peak Near-Coast Intensity", alert: "PEAK INTENSITY" },
      { hour: 18, time: "T+18h (05:00)",   lat: 19.7, lng: 85.7, kts: 120, kmh: 222, hpa: 938, eye: 14, dist: 38,  category: "Extremely Severe Cyclonic Storm", desc: "Coast Proximity < 40 km", alert: "COASTAL IMMINENT" },
      { hour: 24, time: "T+24h (11:00)",   lat: 20.0, lng: 85.5, kts: 110, kmh: 204, hpa: 948, eye: 18, dist: 0,   category: "Very Severe Cyclonic Storm", desc: "LANDFALL: Puri Coastline", alert: "DIRECT LANDFALL IMPACT", isLandfall: true },
      { hour: 36, time: "T+36h (23:00)",   lat: 20.7, lng: 85.2, kts: 75,  kmh: 139, hpa: 970, eye: 26, dist: -65, category: "Severe Cyclonic Storm", desc: "Inland Odisha / Weakening", alert: "INLAND SQUALL" },
      { hour: 48, time: "T+48h (11:00)",   lat: 21.5, lng: 85.0, kts: 50,  kmh: 93,  hpa: 985, eye: 35, dist: -150, category: "Cyclonic Storm", desc: "Depression over Jharkhand border", alert: "INLAND FLOOD" },
      { hour: 72, time: "T+72h (11:00)",   lat: 22.8, lng: 84.8, kts: 30,  kmh: 56,  hpa: 998, eye: 45, dist: -290, category: "Well Marked Low", desc: "Dissipated remnant low", alert: "RESIDUAL LOW" }
    ],

    // Probabilistic Uncertainty Cones (Widening cone of uncertainty)
    cone68: [
      [18.2, 86.8],
      [18.9, 86.0], [19.5, 85.5], [20.2, 85.0], [21.0, 84.5], [22.8, 84.2],
      [23.0, 85.3], [21.8, 85.6], [20.8, 85.9], [20.0, 86.2], [19.0, 86.6]
    ],
    cone95: [
      [18.2, 86.8],
      [19.1, 85.6], [19.7, 85.0], [20.5, 84.3], [21.5, 83.7], [23.3, 83.3],
      [23.5, 86.0], [22.3, 86.3], [21.1, 86.6], [20.3, 87.0], [19.2, 87.3]
    ],

    // 100km & 200km Coastal Warning Buffer lines
    coastalBuffers: {
      buffer100: [
        [17.4, 84.2], [18.5, 85.1], [19.5, 86.1], [20.2, 87.1], [21.0, 87.8], [21.8, 88.5]
      ],
      buffer200: [
        [17.0, 83.5], [18.0, 84.5], [19.2, 85.5], [20.0, 86.8], [21.5, 87.5], [22.2, 88.5]
      ]
    }
  }
};

// Reusable export for browser and Node environments
if (typeof window !== 'undefined') {
  window.cycloneData = cycloneData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cycloneData;
}
