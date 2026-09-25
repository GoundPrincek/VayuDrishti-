// VayuDrishti - Centralized Cyclone Intelligence & Simulation Data Layer
// Authoritative prototype data representation for SIH demonstration

const CYCLONE_SCENARIOS = {
  bay_of_bengal: {
    id: "VD-DEMO-01",
    scenarioKey: "bay_of_bengal",
    scenarioTitle: "Scenario 1: Bay of Bengal (Explosive Near-Coast RI)",
    name: "VAJRA",
    category: "Very Severe Cyclonic Storm",
    basin: "Bay of Bengal (North-West Sector)",
    centerCoords: [18.2, 86.8],
    zoom: 7,
    timestamp: "25/09/2026 11:00 IST",
    statusText: "RAPID INTENSIFICATION ACTIVE",
    riskLevel: "HIGH",
    currentIntensity: {
      knots: 65,
      kmh: 121,
      pressureHpa: 972,
      eyeDiameterKm: 18,
      distanceToCoastKm: 85,
      motionHeading: "335° (NNW)",
      motionSpeed: "15 km/h",
      motionSummary: "NNW @ 15 km/h"
    },
    windRadii: {
      r34_km: 180,
      r50_km: 95,
      r64_km: 55,
      desc34: "Tropical-storm-force wind extent",
      desc50: "Strong gale wind core",
      desc64: "Hurricane-force destructive inner core"
    },
    rapidChange: {
      structuralChange: "Significant (Inner Core Tightening)",
      cloudTopEvolution: "Increasing Organization (-84.2°C CDO)",
      intensityTrend: "Rapidly Increasing (+39 km/h / 60 min)",
      centreDisplacement: "128 km (past 6h)",
      observationInterval: "15 minutes",
      changeSeverity: "Significant",
      alertBanner: "⚠️ SIGNIFICANT INNER-CORE EVOLUTION DETECTED",
      alertSub: "Core cooling indicates storm is deepening 1.8x faster than scheduled bulletin. Pre-advisory trigger activated."
    },
    riWatch: {
      status: "HIGH",
      intensityTrend: "Rapidly Increasing (+39 km/h / 60 min)",
      sst: "29.4°C",
      sstLabel: "FAVORABLE",
      ohc: "82 kJ/cm²",
      ohcLabel: "HIGH",
      windShear: "9 kt",
      windShearLabel: "LOW SHEAR",
      distanceToCoast: "85 km",
      distanceLabel: "STRIKE ZONE",
      confidence: "High (Qualitative Assessment)",
      verdictText: "All 3 Triggers Met (High RI Risk)",
      triggersMet: "3 / 3 Triggers Met (Near-Coast Thermal Coupling)"
    },
    explainableRisk: {
      title: "WHY DID THE RISK CHANGE?",
      summary: "Risk evaluated as HIGH due to multi-source physical alignment:",
      factors: [
        "↑ Inner core cloud-top cooling rapidly to -84.2°C with tight eyewall symmetry",
        "↓ Vertical wind shear suppressed to 9 kt (< 15 kt rapid-intensification threshold)",
        "↑ High ocean heat content (82 kJ/cm²) coupled with 29.4°C sea surface temperature",
        "→ Cyclone positioned within 85 km of vulnerable Puri/Odisha coastline with 15 km/h forward translation"
      ]
    },
    observations: [
      { step: 0, label: "T-60", time: "10:00 IST", windKmh: 82, pressureHpa: 990, intensityChange: "Baseline (0 km/h)", deltaKmh: 0, deltaPress: 0, category: "Cyclonic Storm (82 km/h)", note: "Standard coastal tracking. Normal convective baseline.", status: "STABLE", cdo: "-78.5°C" },
      { step: 1, label: "T-45", time: "10:15 IST", windKmh: 89, pressureHpa: 986, intensityChange: "+7 km/h (+8.5%)", deltaKmh: 7, deltaPress: -4, category: "Severe Cyclonic Storm (89 km/h)", note: "Central dense overcast cloud tops cooling to -80.8°C.", status: "MONITORING", cdo: "-80.8°C" },
      { step: 2, label: "T-30", time: "10:30 IST", windKmh: 97, pressureHpa: 982, intensityChange: "+8 km/h (+9.0%)", deltaKmh: 8, deltaPress: -4, category: "Severe Cyclonic Storm (97 km/h)", note: "Inner core tightening. Convective burst cluster detected.", status: "MONITORING", cdo: "-82.0°C" },
      { step: 3, label: "T-15", time: "10:45 IST", windKmh: 108, pressureHpa: 977, intensityChange: "+11 km/h (+11.3%)", deltaKmh: 11, deltaPress: -5, category: "Very Severe Cyclonic Storm (108 km/h)", note: "Eyewall wrap completing. Sharp pressure plunge.", status: "ELEVATED", cdo: "-83.1°C" },
      { step: 4, label: "NOW", time: "11:00 IST", windKmh: 121, pressureHpa: 972, intensityChange: "+13 km/h (+12.0%)", deltaKmh: 13, deltaPress: -5, category: "Very Severe Cyclonic Storm (121 km/h)", note: "EXPLOSIVE RI: +39 km/h surge and -18 hPa in 60 min near coast!", status: "RAPID INTENSIFICATION", cdo: "-84.2°C" }
    ],
    forecastCheckpoints: [
      { hour: "0h", time: "25/09 11:00 IST", lat: 18.2, lng: 86.8, location: "18.2°N, 86.8°E", intensityKmh: 121, intensityKts: 65, category: "Very Severe Cyclonic Storm", confidence: "High", uncertainty: "±8 km/h • ±15 km cone", status: "Active Eye (85 km offshore)" },
      { hour: "12h", time: "25/09 23:00 IST", lat: 19.3, lng: 86.0, location: "19.3°N, 86.0°E", intensityKmh: 132, intensityKts: 71, category: "Very Severe Cyclonic Storm", confidence: "High", uncertainty: "±11 km/h • ±35 km cone", status: "Peak Near-Coast Intensity" },
      { hour: "24h", time: "26/09 11:00 IST", lat: 20.0, lng: 85.5, location: "20.0°N, 85.5°E", intensityKmh: 140, intensityKts: 76, category: "Very Severe Cyclonic Storm", confidence: "Moderate", uncertainty: "±15 km/h • ±65 km cone", status: "DIRECT LANDFALL (Puri Coast)", isLandfall: true },
      { hour: "48h", time: "27/09 11:00 IST", lat: 21.5, lng: 85.0, location: "21.5°N, 85.0°E", intensityKmh: 93, intensityKts: 50, category: "Cyclonic Storm", confidence: "Moderate", uncertainty: "±22 km/h • ±110 km cone", status: "Inland Odisha Weakening" },
      { hour: "72h", time: "28/09 11:00 IST", lat: 22.8, lng: 84.8, location: "22.8°N, 84.8°E", intensityKmh: 56, intensityKts: 30, category: "Well Marked Low", confidence: "Low / Moderate", uncertainty: "±30 km/h • ±180 km cone", status: "Dissipated Low" }
    ],
    districtRisk: [
      { name: "Puri", wind: "High (120–140 km/h)", rain: "Extreme (>200 mm)", risk: "CRITICAL", reason: "Direct landfall sector; coastal storm surge 2.0–2.5m; high pilgrim density and exposed coastal dwellings." },
      { name: "Jagatsinghpur (Paradip)", wind: "High (100–125 km/h)", rain: "High (150–200 mm)", risk: "CRITICAL", reason: "Major deepwater port infrastructure; industrial chemical complex; high surge vulnerability." },
      { name: "Kendrapara", wind: "Moderate to High (90–110 km/h)", rain: "High (120–180 mm)", risk: "HIGH", reason: "Bhitarkanika saline embankment overtopping threat; riverine delta flooding." },
      { name: "Khordha (Bhubaneswar)", wind: "Moderate (70–90 km/h)", rain: "High (100–150 mm)", risk: "HIGH", reason: "State capital administrative node; intense urban squall damage; airport operations impact." },
      { name: "Ganjam (Gopalpur)", wind: "Moderate (65–85 km/h)", rain: "Moderate (80–120 mm)", risk: "MODERATE", reason: "Peripheral gale quadrant; rough surf surge; power distribution lines exposure." }
    ],
    priorityActions: [
      { category: "Coastal Evacuation", priority: "CRITICAL", status: "Active Stage 3", action: "Evacuate vulnerable populations within 5 km of Puri & Paradip coasts to multi-purpose cyclone shelters." },
      { category: "Fisheries", priority: "CRITICAL", status: "Total Suspension", action: "Strict maritime ban in North & West-Central Bay; deep-sea trawlers berthed in safe creeks." },
      { category: "Ports", priority: "CRITICAL", status: "Warning Stage 4", action: "Great Danger Signal #8 hoisted at Paradip & Dhamra ports; suspend cargo handling and bunker gantry cranes." },
      { category: "Power Infrastructure", priority: "HIGH", status: "Pre-positioned", action: "Controlled shutdown of 33/11 kV lines in landfall sector; pre-stage 500+ poles and transformer teams." },
      { category: "Roads & Transit", priority: "MODERATE", status: "Active Patrol", action: "Deploy ODRAF & NDRF tree-clearance teams with chain-saws along NH-16 and state highways." },
      { category: "Hospitals", priority: "HIGH", status: "Crisis Standby", action: "Assure 72-hour backup fuel for district hospital generators; secure medical oxygen and saline buffers." },
      { category: "Communication", priority: "HIGH", status: "Redundant Active", action: "Deploy satellite phones and police VHF handsets to all coastal block development officers." }
    ],
    pastTrack: [
      { lat: 14.5, lng: 88.5, kts: 50, time: "T-24h", label: "T-24h", hpa: 998 },
      { lat: 15.4, lng: 88.0, kts: 65, time: "T-18h", label: "T-18h", hpa: 990 },
      { lat: 16.3, lng: 87.6, kts: 75, time: "T-12h", label: "T-12h", hpa: 982 },
      { lat: 17.2, lng: 87.2, kts: 85, time: "T-6h",  label: "T-6h",  hpa: 974 },
      { lat: 18.2, lng: 86.8, kts: 95, time: "NOW",   label: "NOW",   hpa: 958 }
    ],
    forecastTrack: [
      { hour: 0, lat: 18.2, lng: 86.8, kts: 95, hpa: 958, dist: 85, eye: 18, desc: "Near-Coast Zone • Explosive RI", alert: "RAPID INTENSIFICATION" },
      { hour: 6, lat: 18.8, lng: 86.4, kts: 105, hpa: 950, dist: 65, eye: 16, desc: "Severe Eyewall Tightening", alert: "SEVERE EYEWALL" },
      { hour: 12, lat: 19.3, lng: 86.0, kts: 115, hpa: 942, dist: 45, eye: 15, desc: "Peak Near-Coast Intensity", alert: "PEAK INTENSITY" },
      { hour: 18, lat: 19.7, lng: 85.7, kts: 120, hpa: 938, dist: 20, eye: 14, desc: "Coastal Approach < 25 km", alert: "COASTAL IMMINENT" },
      { hour: 24, lat: 20.0, lng: 85.5, kts: 110, hpa: 948, dist: 0, eye: 18, desc: "Landfall: Puri Sector Coastline", alert: "DIRECT LANDFALL IMPACT", isLandfall: true },
      { hour: 36, lat: 20.7, lng: 85.2, kts: 75, hpa: 970, dist: -65, eye: 26, desc: "Inland Odisha / Weakening", alert: "INLAND SQUALL" },
      { hour: 48, lat: 21.5, lng: 85.0, kts: 50, hpa: 985, dist: -150, eye: 35, desc: "Depression Stage", alert: "INLAND FLOOD" },
      { hour: 72, lat: 22.8, lng: 84.8, kts: 30, hpa: 998, dist: -290, eye: 45, desc: "Well Marked Low", alert: "RESIDUAL LOW" }
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
    coastalBufferCoords: [
      [17.0, 83.5], [18.0, 84.5], [19.2, 85.5], [20.0, 86.8], [21.5, 87.5], [22.2, 88.5]
    ],
    landfallSectors: [
      { name: "Puri Coast, Odisha", prob: 48, color: "var(--alert-red)" },
      { name: "Paradip Port, Odisha", prob: 32, color: "var(--alert-orange)" },
      { name: "Gopalpur, Ganjam", prob: 13, color: "var(--accent-blue)" },
      { name: "Digha / WB Border", prob: 7, color: "var(--accent-purple)" }
    ],
    chartPoints: {
      p90: "M 40,43 L 95,36 L 150,22 L 205,18 L 260,35 L 340,58",
      p50: "M 40,44 L 95,41 L 150,30 L 205,28 L 260,44 L 340,63",
      p10: "M 40,45 L 95,48 L 150,42 L 205,38 L 260,52 L 340,68",
      area: "M 40,43 L 95,36 L 150,22 L 205,18 L 260,35 L 340,58 L 340,68 L 260,52 L 205,38 L 150,42 L 95,48 L 40,45 Z"
    },
    landfallEta: "Landfall: T+24h (Puri Sector)"
  },

  arabian_sea: {
    id: "VD-DEMO-02",
    scenarioKey: "arabian_sea",
    scenarioTitle: "Scenario 2: Arabian Sea (Curving Coastal Threat)",
    name: "TEJ-II",
    category: "Extremely Severe Cyclonic Storm",
    basin: "Arabian Sea (East-Central Sector)",
    centerCoords: [19.5, 68.2],
    zoom: 7,
    timestamp: "25/09/2026 11:00 IST",
    statusText: "ELEVATED RI WATCH ACTIVE",
    riskLevel: "HIGH",
    currentIntensity: {
      knots: 85,
      kmh: 157,
      pressureHpa: 968,
      eyeDiameterKm: 22,
      distanceToCoastKm: 195,
      motionHeading: "045° (NE)",
      motionSpeed: "18 km/h",
      motionSummary: "NE @ 18 km/h"
    },
    windRadii: {
      r34_km: 210,
      r50_km: 110,
      r64_km: 65,
      desc34: "Tropical-storm-force wind extent",
      desc50: "Strong gale wind zone",
      desc64: "Hurricane-force destructive inner core"
    },
    rapidChange: {
      structuralChange: "Elevated (Recurving Core Consolidation)",
      cloudTopEvolution: "Deep Convective Bands (-81.8°C)",
      intensityTrend: "Increasing (+25 km/h / 60 min)",
      centreDisplacement: "115 km (past 6h)",
      observationInterval: "15 minutes",
      changeSeverity: "Elevated",
      alertBanner: "⚠️ RECURVATURE ACCELERATION DETECTED",
      alertSub: "Storm exhibiting sharper northeastward track curvature toward Saurashtra coast. Early warning protocol active."
    },
    riWatch: {
      status: "HIGH",
      intensityTrend: "Increasing (+25 km/h / 60 min)",
      sst: "30.4°C",
      sstLabel: "FAVORABLE",
      ohc: "78 kJ/cm²",
      ohcLabel: "HIGH",
      windShear: "8.5 kt",
      windShearLabel: "LOW SHEAR",
      distanceToCoast: "195 km",
      distanceLabel: "COASTAL THREAT",
      confidence: "High (Qualitative Assessment)",
      verdictText: "All 3 Triggers Met (High RI Risk)",
      triggersMet: "3 / 3 Triggers Met (Arabian Sea Warm Pool)"
    },
    explainableRisk: {
      title: "WHY DID THE RISK CHANGE?",
      summary: "Risk evaluated as HIGH due to warm sea surface & trough interaction:",
      factors: [
        "↑ High SST (30.4°C) across northeast Arabian Sea providing intense thermal energy",
        "↓ Upper-tropospheric wind shear remaining low (8.5 kt) along the curved path",
        "→ Accelerated forward movement (18 km/h) bringing gale radii close to Saurashtra ports",
        "↑ Rapid moisture convergence detected by polar microwave sounders"
      ]
    },
    observations: [
      { step: 0, label: "T-60", time: "10:00 IST", windKmh: 132, pressureHpa: 980, intensityChange: "Baseline", deltaKmh: 0, deltaPress: 0, category: "Very Severe Cyclonic Storm", note: "Curvature consolidating along expected synoptic trough.", status: "MONITORING", cdo: "-75.2°C" },
      { step: 1, label: "T-45", time: "10:15 IST", windKmh: 138, pressureHpa: 976, intensityChange: "+6 km/h", deltaKmh: 6, deltaPress: -4, category: "Very Severe Cyclonic Storm", note: "Convective bursts deepening in northern semicircle.", status: "MONITORING", cdo: "-77.4°C" },
      { step: 2, label: "T-30", time: "10:30 IST", windKmh: 144, pressureHpa: 973, intensityChange: "+6 km/h", deltaKmh: 6, deltaPress: -3, category: "Very Severe Cyclonic Storm", note: "Eyewall symmetry sharpening on 89 GHz microwave channel.", status: "ELEVATED", cdo: "-79.1°C" },
      { step: 3, label: "T-15", time: "10:45 IST", windKmh: 151, pressureHpa: 970, intensityChange: "+7 km/h", deltaKmh: 7, deltaPress: -3, category: "Extremely Severe Cyclonic Storm", note: "Eye diameter contracted to 22 km.", status: "ELEVATED", cdo: "-80.5°C" },
      { step: 4, label: "NOW", time: "11:00 IST", windKmh: 157, pressureHpa: 968, intensityChange: "+6 km/h", deltaKmh: 6, deltaPress: -2, category: "Extremely Severe Cyclonic Storm", note: "Accelerating north-northeastward with severe gale wind field.", status: "RAPID INTENSIFICATION", cdo: "-81.8°C" }
    ],
    forecastCheckpoints: [
      { hour: "0h", time: "25/09 11:00 IST", lat: 19.5, lng: 68.2, location: "19.5°N, 68.2°E", intensityKmh: 157, intensityKts: 85, category: "Extremely Severe Cyclonic Storm", confidence: "High", uncertainty: "±10 km/h • ±18 km cone", status: "Active Eye (195 km offshore)" },
      { hour: "12h", time: "25/09 23:00 IST", lat: 20.9, lng: 69.1, location: "20.9°N, 69.1°E", intensityKmh: 167, intensityKts: 90, category: "Extremely Severe Cyclonic Storm", confidence: "High", uncertainty: "±14 km/h • ±40 km cone", status: "Approaching Porbandar Sector" },
      { hour: "24h", time: "26/09 11:00 IST", lat: 22.2, lng: 69.7, location: "22.2°N, 69.7°E", intensityKmh: 148, intensityKts: 80, category: "Very Severe Cyclonic Storm", confidence: "Moderate", uncertainty: "±18 km/h • ±70 km cone", status: "DIRECT LANDFALL (Saurashtra)", isLandfall: true },
      { hour: "48h", time: "27/09 11:00 IST", lat: 23.8, lng: 71.0, location: "23.8°N, 71.0°E", intensityKmh: 74,  intensityKts: 40, category: "Cyclonic Storm", confidence: "Moderate", uncertainty: "±25 km/h • ±120 km cone", status: "Inland Gujarat Weakening" },
      { hour: "72h", time: "28/09 11:00 IST", lat: 24.6, lng: 72.2, location: "24.6°N, 72.2°E", intensityKmh: 46,  intensityKts: 25, category: "Well Marked Low", confidence: "Low / Moderate", uncertainty: "±32 km/h • ±190 km cone", status: "Dissipated Low" }
    ],
    districtRisk: [
      { name: "Porbandar", wind: "High (130–155 km/h)", rain: "Extreme (>200 mm)", risk: "CRITICAL", reason: "Direct landfall impact zone; heavy tidal surge (2.0m); fishing harbor & coastal industrial assets." },
      { name: "Devbhumi Dwarka", wind: "High (115–135 km/h)", rain: "High (150–180 mm)", risk: "CRITICAL", reason: "Exposed peninsula geography; coastal temple town heritage & tourist zone evacuation." },
      { name: "Gir Somnath (Veraval)", wind: "Moderate to High", rain: "High (120–160 mm)", risk: "HIGH", reason: "Large fishing vessel fleet; coastal highway exposure; squall surge." },
      { name: "Jamnagar", wind: "Moderate (80–100 km/h)", rain: "Moderate (90–130 mm)", risk: "HIGH", reason: "Major petroleum refining hub; port terminal vessel moorings." },
      { name: "Kutch (Mundra)", wind: "Moderate (70–90 km/h)", rain: "Moderate (70–100 mm)", risk: "MODERATE", reason: "Peripheral gale warning; salt pan flooding; port crane tie-downs." }
    ],
    priorityActions: [
      { category: "Coastal Evacuation", priority: "CRITICAL", status: "Active Stage 2", action: "Evacuate kachha coastal dwellings in Porbandar & Dwarka to designated cyclone centres." },
      { category: "Fisheries", priority: "CRITICAL", status: "Total Suspension", action: "All fishing harbors (Veraval, Porbandar, Mangrol) closed; boats moored in inner creek basins." },
      { category: "Ports", priority: "CRITICAL", status: "Warning Stage 4", action: "Porbandar, Okha, Sikka & Mundra ports issue warning stage; suspend lighterage operations." },
      { category: "Power Infrastructure", priority: "HIGH", status: "Preventive Protocol", action: "Pre-position restoration teams in Rajkot & Jamnagar; inspect sub-station flood barriers." },
      { category: "Roads & Transit", priority: "MODERATE", status: "Monitoring", action: "National Highway 51 coastal route monitored for tidal overwash; tree clearance teams ready." },
      { category: "Hospitals", priority: "HIGH", status: "Standby Readiness", action: "District civil hospitals equipped with power generators & trauma emergency supplies." },
      { category: "Communication", priority: "HIGH", status: "Redundant Backup", action: "Satellite wireless terminals tested with Gandhinagar State Emergency Operations Centre (SEOC)." }
    ],
    pastTrack: [
      { lat: 16.5, lng: 66.8, kts: 45, time: "T-24h", label: "T-24h", hpa: 994 },
      { lat: 17.2, lng: 67.1, kts: 60, time: "T-18h", label: "T-18h", hpa: 986 },
      { lat: 18.0, lng: 67.5, kts: 70, time: "T-12h", label: "T-12h", hpa: 980 },
      { lat: 18.8, lng: 67.8, kts: 75, time: "T-6h",  label: "T-6h",  hpa: 974 },
      { lat: 19.5, lng: 68.2, kts: 85, time: "NOW",   label: "NOW",   hpa: 968 }
    ],
    forecastTrack: [
      { hour: 0, lat: 19.5, lng: 68.2, kts: 85, hpa: 968, dist: 195, eye: 22, desc: "Recurving Northeast • Active RI", alert: "RECURVING ACCELERATION" },
      { hour: 6, lat: 20.2, lng: 68.7, kts: 95, hpa: 960, dist: 140, eye: 20, desc: "Approaching Saurashtra Coast", alert: "COASTAL THREAT" },
      { hour: 12, lat: 20.9, lng: 69.1, kts: 105, hpa: 952, dist: 95, eye: 18, desc: "Peak Near-Coast Peak", alert: "PEAK INTENSITY" },
      { hour: 18, lat: 21.6, lng: 69.4, kts: 100, hpa: 956, dist: 45, eye: 19, desc: "Near Porbandar Coastal Sector", alert: "IMMINENT STRIKE" },
      { hour: 24, lat: 22.2, lng: 69.7, kts: 85, hpa: 970, dist: 0, eye: 24, desc: "Landfall: Saurashtra Peninsula", alert: "DIRECT LANDFALL IMPACT", isLandfall: true },
      { hour: 36, lat: 23.0, lng: 70.3, kts: 55, hpa: 988, dist: -80, eye: 34, desc: "Inland Gujarat Weakening", alert: "INLAND GALE" },
      { hour: 48, lat: 23.8, lng: 71.0, kts: 35, hpa: 996, dist: -170, eye: 42, desc: "Kutch Remnant Stage", alert: "DEPRESSION" },
      { hour: 72, lat: 24.6, lng: 72.2, kts: 25, hpa: 1004, dist: -310, eye: 50, desc: "Dissipated Low", alert: "REMNANT LOW" }
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
    coastalBufferCoords: [
      [20.5, 69.5], [21.5, 69.0], [22.4, 68.8], [23.1, 68.5]
    ],
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
    landfallEta: "Landfall: T+24h to T+28h (Saurashtra)"
  },

  historical_amphan: {
    id: "VD-HIST-01",
    scenarioKey: "historical_amphan",
    scenarioTitle: "Scenario 3: Historical Cyclone (Super Cyclone 'AMPHAN' Benchmark)",
    name: "AMPHAN (Historical)",
    category: "Super Cyclonic Storm",
    basin: "Bay of Bengal (Historical Reanalysis Benchmark)",
    centerCoords: [20.8, 88.1],
    zoom: 7,
    timestamp: "20/05/2020 11:30 IST (Historical Archive)",
    statusText: "HISTORICAL BENCHMARK REPLAY",
    riskLevel: "CRITICAL",
    currentIntensity: {
      knots: 90,
      kmh: 165,
      pressureHpa: 950,
      eyeDiameterKm: 28,
      distanceToCoastKm: 60,
      motionHeading: "020° (NNE)",
      motionSpeed: "24 km/h",
      motionSummary: "NNE @ 24 km/h"
    },
    windRadii: {
      r34_km: 240,
      r50_km: 130,
      r64_km: 80,
      desc34: "Massive tropical-storm-force wind extent",
      desc50: "Destructive gale wind core",
      desc64: "Extensive hurricane-force damage envelope"
    },
    rapidChange: {
      structuralChange: "Extreme (Historic Super Cyclone Core)",
      cloudTopEvolution: "Massive Symmetrical CDO (-88.0°C)",
      intensityTrend: "Near-Landfall Sustained Extreme Wind",
      centreDisplacement: "145 km (past 6h)",
      observationInterval: "15 minutes",
      changeSeverity: "Extreme",
      alertBanner: "⚠️ HISTORIC BENCHMARK ARCHIVE REPLAY",
      alertSub: "Historical re-analysis of Super Cyclone AMPHAN pre-landfall trajectory and inner core dynamics."
    },
    riWatch: {
      status: "CRITICAL",
      intensityTrend: "Extreme (+45 km/h prior surge)",
      sst: "31.2°C",
      sstLabel: "CRITICAL HEAT",
      ohc: "105 kJ/cm²",
      ohcLabel: "EXTREME",
      windShear: "6.0 kt",
      windShearLabel: "VERY LOW",
      distanceToCoast: "60 km",
      distanceLabel: "IMMINENT STRIKE",
      confidence: "Validated Historical Reanalysis",
      verdictText: "All 3 Triggers Met (Historic Record)",
      triggersMet: "3 / 3 Triggers Met (Super Cyclone Benchmark)"
    },
    explainableRisk: {
      title: "WHY DID THE RISK CHANGE?",
      summary: "Risk was CRITICAL due to historic high-energy thermodynamic conditions:",
      factors: [
        "↑ Extreme pre-landfall Ocean Heat Content (105 kJ/cm²) sustained Category 5 intensity",
        "↓ Minimal vertical wind shear (6 kt) permitted unprecedented central symmetry",
        "→ Fast forward translation (24 km/h) brought catastrophic core into Sundarbans",
        "↑ Coincident high astronomical tide generated 4.5m storm surge across coastal delta"
      ]
    },
    observations: [
      { step: 0, label: "T-60", time: "10:30 IST", windKmh: 155, pressureHpa: 956, intensityChange: "Baseline", deltaKmh: 0, deltaPress: 0, category: "Super Cyclonic Storm", note: "Outer rainbands lashing Digha and Sundarbans coast.", status: "CRITICAL", cdo: "-86.0°C" },
      { step: 1, label: "T-45", time: "10:45 IST", windKmh: 158, pressureHpa: 954, intensityChange: "+3 km/h", deltaKmh: 3, deltaPress: -2, category: "Super Cyclonic Storm", note: "Eyewall radar reflectivity exceeding 52 dBZ.", status: "CRITICAL", cdo: "-86.8°C" },
      { step: 2, label: "T-30", time: "11:00 IST", windKmh: 160, pressureHpa: 952, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -2, category: "Super Cyclonic Storm", note: "Northern eyewall crossing Sagar Island perimeter.", status: "CRITICAL", cdo: "-87.4°C" },
      { step: 3, label: "T-15", time: "11:15 IST", windKmh: 163, pressureHpa: 951, intensityChange: "+3 km/h", deltaKmh: 3, deltaPress: -1, category: "Super Cyclonic Storm", note: "Storm surge surge gauge recording +3.8m above normal tide.", status: "CRITICAL", cdo: "-87.8°C" },
      { step: 4, label: "NOW", time: "11:30 IST", windKmh: 165, pressureHpa: 950, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -1, category: "Super Cyclonic Storm", note: "Catastrophic landfall impact underway across Sundarbans.", status: "CRITICAL", cdo: "-88.0°C" }
    ],
    forecastCheckpoints: [
      { hour: "0h", time: "20/05 11:30 IST", lat: 20.8, lng: 88.1, location: "20.8°N, 88.1°E", intensityKmh: 165, intensityKts: 90, category: "Super Cyclonic Storm", confidence: "High (Archive)", uncertainty: "±5 km/h • ±10 km cone", status: "Landfall Inception" },
      { hour: "12h", time: "20/05 23:30 IST", lat: 22.5, lng: 88.4, location: "22.5°N, 88.4°E", intensityKmh: 130, intensityKts: 70, category: "Very Severe Cyclonic Storm", confidence: "High (Archive)", uncertainty: "±8 km/h • ±25 km cone", status: "Kolkata Metro Eye Passage", isLandfall: true },
      { hour: "24h", time: "21/05 11:30 IST", lat: 24.2, lng: 89.2, location: "24.2°N, 89.2°E", intensityKmh: 85,  intensityKts: 45, category: "Cyclonic Storm", confidence: "High (Archive)", uncertainty: "±12 km/h • ±45 km cone", status: "Bangladesh Inland Track" },
      { hour: "48h", time: "22/05 11:30 IST", lat: 26.0, lng: 90.5, location: "26.0°N, 90.5°E", intensityKmh: 45,  intensityKts: 25, category: "Deep Depression", confidence: "High (Archive)", uncertainty: "±18 km/h • ±80 km cone", status: "Assam Hills Dissipation" },
      { hour: "72h", time: "23/05 11:30 IST", lat: 27.5, lng: 92.0, location: "27.5°N, 92.0°E", intensityKmh: 25,  intensityKts: 15, category: "Remnant Low", confidence: "High (Archive)", uncertainty: "±25 km/h • ±120 km cone", status: "Fully Dissipated" }
    ],
    districtRisk: [
      { name: "South 24 Parganas (Sundarbans)", wind: "Extreme (155–185 km/h)", rain: "Extreme (>250 mm)", risk: "CRITICAL", reason: "Direct landfall; 4.5m storm surge; extensive embankment failure; island isolation." },
      { name: "North 24 Parganas", wind: "Extreme (130–160 km/h)", rain: "Extreme (>200 mm)", risk: "CRITICAL", reason: "Severe wind destruction to unreinforced structures; delta drainage inundation." },
      { name: "Kolkata Metropolitan", wind: "High (110–130 km/h)", rain: "Very High (>180 mm)", risk: "CRITICAL", reason: "Massive tree uprooting; catastrophic grid collapse; airport flooded." },
      { name: "East Medinipur (Digha)", wind: "High (100–130 km/h)", rain: "High (150 mm)", risk: "HIGH", reason: "Storm surge battering coastal sea walls; saline ingress." },
      { name: "Howrah & Hooghly", wind: "Moderate to High", rain: "High (120 mm)", risk: "HIGH", reason: "Inland squall damage to power distribution & telecommunications." }
    ],
    priorityActions: [
      { category: "Coastal Evacuation", priority: "CRITICAL", status: "Historical Benchmark", action: "Historical record: 500,000+ residents evacuated to multi-purpose cyclone shelters." },
      { category: "Fisheries", priority: "CRITICAL", status: "Total Suspension", action: "Complete maritime lockdown across North & Central Bay of Bengal." },
      { category: "Ports", priority: "CRITICAL", status: "Great Danger Signal #10", action: "Kolkata Port Trust & Haldia dock complex fully shut down." },
      { category: "Power Infrastructure", priority: "CRITICAL", status: "Pre-emptive Shutdown", action: "Controlled grid isolation to protect transmission substations from wind shear destruction." },
      { category: "Roads & Transit", priority: "HIGH", status: "NDRF Deployed", action: "National Disaster Response Force (NDRF) deployed along all major transit arteries." },
      { category: "Hospitals", priority: "HIGH", status: "Crisis Mode", action: "Underground bunker generators and flood barriers activated at regional medical colleges." },
      { category: "Communication", priority: "HIGH", status: "Dual Satellite Link", action: "Disaster communication via GSAT satellite link and police wireless network." }
    ],
    pastTrack: [
      { lat: 15.0, lng: 86.5, kts: 130, time: "T-24h", label: "T-24h", hpa: 920 },
      { lat: 16.5, lng: 86.8, kts: 120, time: "T-18h", label: "T-18h", hpa: 930 },
      { lat: 18.0, lng: 87.2, kts: 110, time: "T-12h", label: "T-12h", hpa: 940 },
      { lat: 19.5, lng: 87.6, kts: 100, time: "T-6h",  label: "T-6h",  hpa: 945 },
      { lat: 20.8, lng: 88.1, kts: 90,  time: "NOW",   label: "NOW",   hpa: 950 }
    ],
    forecastTrack: [
      { hour: 0, lat: 20.8, lng: 88.1, kts: 90, hpa: 950, dist: 60, eye: 28, desc: "Sundarbans Approach", alert: "CAT-3 CORE" },
      { hour: 6, lat: 21.6, lng: 88.2, kts: 85, hpa: 958, dist: 0,  eye: 30, desc: "Landfall: Sagar Island Sector", alert: "HISTORIC LANDFALL", isLandfall: true },
      { hour: 12, lat: 22.5, lng: 88.4, kts: 70, hpa: 968, dist: -80, eye: 36, desc: "Kolkata City Center Passage", alert: "METRO EYE PASSAGE" },
      { hour: 24, lat: 24.2, lng: 89.2, kts: 45, hpa: 985, dist: -220, eye: 48, desc: "Inland Bangladesh Weakening", alert: "INLAND WEAKENING" },
      { hour: 48, lat: 26.0, lng: 90.5, kts: 25, hpa: 998, dist: -390, eye: 60, desc: "Assam Hills Remnants", alert: "DISSIPATING" },
      { hour: 72, lat: 27.5, lng: 92.0, kts: 15, hpa: 1006, dist: -540, eye: 75, desc: "Dissipated Low", alert: "REMNANT LOW" }
    ],
    ensembles: [
      { name: "Historical Actual", color: "#f43f5e", coords: [[20.8, 88.1], [21.6, 88.2], [22.5, 88.4], [24.2, 89.2], [26.0, 90.5]] },
      { name: "ECMWF Hindcast", color: "#60a5fa", coords: [[20.8, 88.1], [21.7, 88.3], [22.6, 88.5], [24.4, 89.4], [26.2, 90.7]] },
      { name: "GFS Hindcast", color: "#34d399", coords: [[20.8, 88.1], [21.5, 88.0], [22.3, 88.2], [23.9, 88.9], [25.7, 90.1]] }
    ],
    cone95: [
      [20.8, 88.1],
      [21.5, 87.5], [22.4, 87.7], [24.0, 88.3], [26.0, 89.5],
      [26.2, 91.5], [24.5, 90.2], [22.7, 89.2], [21.8, 88.8]
    ],
    cone68: [
      [20.8, 88.1],
      [21.5, 87.8], [22.4, 88.0], [24.1, 88.7], [25.9, 89.9],
      [26.1, 91.0], [24.3, 89.7], [22.6, 88.8], [21.7, 88.5]
    ],
    coastalBufferCoords: [
      [21.2, 86.8], [21.6, 87.5], [21.8, 88.2], [22.1, 89.0]
    ],
    landfallSectors: [
      { name: "Sundarbans / Sagar Island", prob: 78, color: "var(--alert-red)" },
      { name: "East Medinipur / Digha", prob: 14, color: "var(--alert-orange)" },
      { name: "Bangladesh Border Delta", prob: 8, color: "var(--accent-purple)" }
    ],
    chartPoints: {
      p90: "M 40,30 L 95,34 L 150,42 L 205,52 L 260,62 L 340,68",
      p50: "M 40,32 L 95,36 L 150,45 L 205,55 L 260,64 L 340,69",
      p10: "M 40,35 L 95,40 L 150,48 L 205,58 L 260,66 L 340,71",
      area: "M 40,30 L 95,34 L 150,42 L 205,52 L 260,62 L 340,68 L 340,71 L 260,66 L 205,58 L 150,48 L 95,40 L 40,35 Z"
    },
    landfallEta: "Landfall: Historical Benchmark (20 May 2020)"
  },

  sample_asani: {
    id: "VD-SAMPLE-01",
    scenarioKey: "sample_asani",
    scenarioTitle: "Scenario 4: Sample Cyclone ('ASANI' Curved Coastal Skirting)",
    name: "ASANI (Sample)",
    category: "Severe Cyclonic Storm",
    basin: "Bay of Bengal (West-Central Sector)",
    centerCoords: [15.8, 82.5],
    zoom: 7,
    timestamp: "25/09/2026 11:00 IST",
    statusText: "MODERATE COASTAL WATCH",
    riskLevel: "MODERATE",
    currentIntensity: {
      knots: 57,
      kmh: 105,
      pressureHpa: 984,
      eyeDiameterKm: 32,
      distanceToCoastKm: 110,
      motionHeading: "005° (N)",
      motionSpeed: "12 km/h",
      motionSummary: "N @ 12 km/h"
    },
    windRadii: {
      r34_km: 150,
      r50_km: 75,
      r64_km: 0,
      desc34: "Tropical-storm-force wind extent",
      desc50: "Strong gale wind core",
      desc64: "No hurricane-force threshold reached"
    },
    rapidChange: {
      structuralChange: "Moderate (Sheared Asymmetric Core)",
      cloudTopEvolution: "Moderate Convective Bands (-76.2°C)",
      intensityTrend: "Gradually Intensifying (+8 km/h / 60 min)",
      centreDisplacement: "72 km (past 6h)",
      observationInterval: "15 minutes",
      changeSeverity: "Moderate",
      alertBanner: "ℹ️ MODERATE STRUCTURAL CONSOLIDATION",
      alertSub: "Storm encountering moderate environmental wind shear. Explosive rapid intensification unlikely."
    },
    riWatch: {
      status: "MODERATE",
      intensityTrend: "Gradually Intensifying (+8 km/h / 60 min)",
      sst: "28.8°C",
      sstLabel: "MODERATE",
      ohc: "64 kJ/cm²",
      ohcLabel: "ADEQUATE",
      windShear: "14.0 kt",
      windShearLabel: "MODERATE SHEAR",
      distanceToCoast: "110 km",
      distanceLabel: "COASTAL BUFFER",
      confidence: "Moderate (Qualitative Assessment)",
      verdictText: "2 / 3 Triggers Met (Elevated RI Risk)",
      triggersMet: "2 / 3 Triggers Met (Marginal Wind Shear Resistance)"
    },
    explainableRisk: {
      title: "WHY DID THE RISK CHANGE?",
      summary: "Risk maintained at MODERATE due to competing environmental dynamics:",
      factors: [
        "↔ Moderate vertical wind shear (14 kt) is tilting convective plume and limiting explosive spin-up",
        "↑ Ocean heat content (64 kJ/cm²) remains above the minimum threshold (60 kJ/cm²)",
        "→ Storm skirting parallel to Andhra coast rather than making perpendicular landfall",
        "↓ Narrower gale wind radius (150 km) spares inland districts from severe damage"
      ]
    },
    observations: [
      { step: 0, label: "T-60", time: "10:00 IST", windKmh: 97, pressureHpa: 988, intensityChange: "Baseline", deltaKmh: 0, deltaPress: 0, category: "Severe Cyclonic Storm", note: "Moderate convective banding wrapping into broad low-level center.", status: "STABLE", cdo: "-74.0°C" },
      { step: 1, label: "T-45", time: "10:15 IST", windKmh: 99, pressureHpa: 987, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -1, category: "Severe Cyclonic Storm", note: "Northern rainband producing squally showers at Machilipatnam.", status: "MONITORING", cdo: "-74.8°C" },
      { step: 2, label: "T-30", time: "10:30 IST", windKmh: 101, pressureHpa: 986, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -1, category: "Severe Cyclonic Storm", note: "Cloud top cooling to -75.4°C over western flank.", status: "MONITORING", cdo: "-75.4°C" },
      { step: 3, label: "T-15", time: "10:45 IST", windKmh: 103, pressureHpa: 985, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -1, category: "Severe Cyclonic Storm", note: "Moderate forward translation northward at 12 km/h.", status: "MONITORING", cdo: "-75.9°C" },
      { step: 4, label: "NOW", time: "11:00 IST", windKmh: 105, pressureHpa: 984, intensityChange: "+2 km/h", deltaKmh: 2, deltaPress: -1, category: "Severe Cyclonic Storm", note: "Skirting 110 km offshore Andhra coastline; recurvature underway.", status: "MODERATE", cdo: "-76.2°C" }
    ],
    forecastCheckpoints: [
      { hour: "0h", time: "25/09 11:00 IST", lat: 15.8, lng: 82.5, location: "15.8°N, 82.5°E", intensityKmh: 105, intensityKts: 57, category: "Severe Cyclonic Storm", confidence: "High", uncertainty: "±8 km/h • ±15 km cone", status: "Active Skirting Core" },
      { hour: "12h", time: "25/09 23:00 IST", lat: 16.7, lng: 82.8, location: "16.7°N, 82.8°E", intensityKmh: 110, intensityKts: 60, category: "Severe Cyclonic Storm", confidence: "Moderate", uncertainty: "±12 km/h • ±35 km cone", status: "Off Kakinada Coast" },
      { hour: "24h", time: "26/09 11:00 IST", lat: 17.5, lng: 83.4, location: "17.5°N, 83.4°E", intensityKmh: 95,  intensityKts: 50, category: "Cyclonic Storm", confidence: "Moderate", uncertainty: "±16 km/h • ±60 km cone", status: "Closest Approach (Vizag)", isLandfall: false },
      { hour: "48h", time: "27/09 11:00 IST", lat: 18.4, lng: 84.5, location: "18.4°N, 84.5°E", intensityKmh: 75,  intensityKts: 40, category: "Cyclonic Storm", confidence: "Moderate", uncertainty: "±20 km/h • ±100 km cone", status: "Recurving Offshore Eastward" },
      { hour: "72h", time: "28/09 11:00 IST", lat: 19.2, lng: 86.2, location: "19.2°N, 86.2°E", intensityKmh: 45,  intensityKts: 25, category: "Well Marked Low", confidence: "Low / Moderate", uncertainty: "±28 km/h • ±160 km cone", status: "Dissipating Over Sea" }
    ],
    districtRisk: [
      { name: "Kakinada", wind: "Moderate (75–95 km/h)", rain: "High (120–150 mm)", risk: "HIGH", reason: "Deepwater port approach; squally coastal winds; localized inundation." },
      { name: "Machilipatnam (Krishna)", wind: "Moderate (70–90 km/h)", rain: "Moderate (80–120 mm)", risk: "MODERATE", reason: "Low-lying coastal plain; storm surge 0.5–1.0m; canal water rise." },
      { name: "Visakhapatnam", wind: "Moderate (65–80 km/h)", rain: "Moderate (60–90 mm)", risk: "MODERATE", reason: "Port operations precautionary slowdown; rough surf along beach road." },
      { name: "Bapatla", wind: "Moderate (55–75 km/h)", rain: "Moderate (50–80 mm)", risk: "MODERATE", reason: "Coastal agriculture buffer zone; minor wind gust impacts." },
      { name: "Nellore", wind: "Low (40–55 km/h)", rain: "Light to Moderate", risk: "LOW", reason: "Distant southern peripheral cloudband; minimal infrastructure threat." }
    ],
    priorityActions: [
      { category: "Coastal Evacuation", priority: "MODERATE", status: "Standby Notice", action: "Identify low-lying coastal hamlets; keep community shelters on 6-hour readiness." },
      { category: "Fisheries", priority: "HIGH", status: "Advisory Active", action: "Bar artisanal fishermen from venturing into rough offshore waters until storm recedes." },
      { category: "Ports", priority: "MODERATE", status: "Warning Stage 2", action: "Kakinada & Machilipatnam ports advise vessels to keep main engines on standby." },
      { category: "Power Infrastructure", priority: "MODERATE", status: "Routine Patrols", action: "Patrol coastal feeder lines; secure loose advertising hoardings and line spans." },
      { category: "Roads & Transit", priority: "LOW", status: "Nominal", action: "State Highway 216 monitored for heavy rain ponding; traffic remains operational." },
      { category: "Hospitals", priority: "MODERATE", status: "Preparedness Check", action: "Standard monsoon emergency medicine stocks replenished in coastal Primary Health Centres." },
      { category: "Communication", priority: "LOW", status: "Nominal", action: "Cellular operators confirm battery backup availability at coastal towers." }
    ],
    pastTrack: [
      { lat: 13.5, lng: 81.8, kts: 45, time: "T-24h", label: "T-24h", hpa: 996 },
      { lat: 14.1, lng: 82.0, kts: 50, time: "T-18h", label: "T-18h", hpa: 992 },
      { lat: 14.7, lng: 82.2, kts: 52, time: "T-12h", label: "T-12h", hpa: 990 },
      { lat: 15.2, lng: 82.3, kts: 55, time: "T-6h",  label: "T-6h",  hpa: 986 },
      { lat: 15.8, lng: 82.5, kts: 57, time: "NOW",   label: "NOW",   hpa: 984 }
    ],
    forecastTrack: [
      { hour: 0, lat: 15.8, lng: 82.5, kts: 57, hpa: 984, dist: 110, eye: 32, desc: "Skirting Andhra Coast", alert: "COASTAL SKIRTING" },
      { hour: 6, lat: 16.3, lng: 82.6, kts: 60, hpa: 982, dist: 95,  eye: 30, desc: "Approaching Kakinada Latitude", alert: "SQUALLY COAST" },
      { hour: 12, lat: 16.7, lng: 82.8, kts: 60, hpa: 980, dist: 85, eye: 30, desc: "Near Machilipatnam-Kakinada Offing", alert: "OFFSHORE GALE" },
      { hour: 18, lat: 17.1, lng: 83.1, kts: 55, hpa: 984, dist: 75, eye: 34, desc: "Curving Towards Vizag Coast", alert: "CLOSE APPROACH" },
      { hour: 24, lat: 17.5, lng: 83.4, kts: 50, hpa: 988, dist: 70, eye: 38, desc: "Closest Approach (Vizag Offing)", alert: "PERIPHERAL SKIRT", isLandfall: false },
      { hour: 36, lat: 18.0, lng: 84.0, kts: 45, hpa: 994, dist: 100, eye: 44, desc: "Turning East-Northeastward", alert: "RECURVING" },
      { hour: 48, lat: 18.4, lng: 84.5, kts: 40, hpa: 998, dist: 140, eye: 50, desc: "Weakening into Deep Depression", alert: "DEPRESSION" },
      { hour: 72, lat: 19.2, lng: 86.2, kts: 25, hpa: 1004, dist: 220, eye: 65, desc: "Dissipating Over Sea", alert: "REMNANT LOW" }
    ],
    ensembles: [
      { name: "ECMWF", color: "#60a5fa", coords: [[15.8, 82.5], [16.8, 83.0], [17.7, 83.8], [18.6, 85.0], [19.5, 86.6]] },
      { name: "GFS", color: "#34d399", coords: [[15.8, 82.5], [16.5, 82.6], [17.3, 83.2], [18.2, 84.2], [19.0, 85.8]] },
      { name: "NCUM (India)", color: "#f43f5e", coords: [[15.8, 82.5], [16.7, 82.9], [17.6, 83.6], [18.5, 84.7], [19.3, 86.2]] }
    ],
    cone95: [
      [15.8, 82.5],
      [16.4, 82.0], [17.2, 82.5], [18.1, 83.3], [19.0, 84.5], [19.8, 86.0],
      [19.6, 87.5], [18.7, 86.0], [17.8, 84.5], [17.0, 83.7], [16.2, 83.0]
    ],
    cone68: [
      [15.8, 82.5],
      [16.4, 82.3], [17.2, 82.8], [18.0, 83.6], [18.8, 84.8], [19.6, 86.2],
      [19.4, 87.0], [18.6, 85.6], [17.7, 84.2], [17.0, 83.4], [16.2, 82.8]
    ],
    coastalBufferCoords: [
      [15.0, 80.5], [16.0, 81.2], [17.0, 82.5], [17.8, 83.5], [18.5, 84.5]
    ],
    landfallSectors: [
      { name: "Kakinada Coast, AP", prob: 36, color: "var(--alert-orange)" },
      { name: "Machilipatnam, AP", prob: 28, color: "var(--accent-blue)" },
      { name: "Visakhapatnam Offing", prob: 24, color: "var(--accent-purple)" },
      { name: "Curved Offshore Skirt", prob: 12, color: "var(--alert-green)" }
    ],
    chartPoints: {
      p90: "M 40,52 L 95,48 L 150,46 L 205,52 L 260,60 L 340,68",
      p50: "M 40,54 L 95,51 L 150,50 L 205,56 L 260,63 L 340,70",
      p10: "M 40,56 L 95,54 L 150,54 L 205,60 L 260,66 L 340,72",
      area: "M 40,52 L 95,48 L 150,46 L 205,52 L 260,60 L 340,68 L 340,72 L 260,66 L 205,60 L 150,54 L 95,54 L 40,56 Z"
    },
    landfallEta: "Closest Approach: T+24h (Vizag Offing - Coastal Skirt)"
  }
};

// Default active mock data alias pointing to Bay of Bengal scenario
const cycloneData = CYCLONE_SCENARIOS.bay_of_bengal;

// Export for browser and Node environments
if (typeof window !== 'undefined') {
  window.cycloneData = cycloneData;
  window.CYCLONE_SCENARIOS = CYCLONE_SCENARIOS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { cycloneData, CYCLONE_SCENARIOS };
}
