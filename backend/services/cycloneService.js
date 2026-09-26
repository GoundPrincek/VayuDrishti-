const cache = require('../utils/cache');
const { createHttpError, fetchJson } = require('../utils/http');

const CACHE_TTL_MS = 5 * 60 * 1000;
const LAYERS = { forecastPoints: 5, forecastTrack: 6, forecastCone: 7, pastPoints: 10, pastTrack: 11 };

function readAttribute(attributes, ...names) {
  if (!attributes) return null;
  for (const requested of names) {
    const key = Object.keys(attributes).find(candidate => candidate.toLowerCase() === requested.toLowerCase());
    const value = key ? attributes[key] : null;
    if (value !== null && value !== undefined && value !== '') return value;
  }
  return null;
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function textOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  return String(value).trim() || null;
}

function identityParts(attributes) {
  return [
    textOrNull(readAttribute(attributes, 'idp_source')) || '',
    textOrNull(readAttribute(attributes, 'stormnum')) || '',
    textOrNull(readAttribute(attributes, 'stormname')) || '',
    textOrNull(readAttribute(attributes, 'basin')) || ''
  ];
}

function groupKey(attributes) {
  return JSON.stringify(identityParts(attributes).map(value => value.toLowerCase()));
}

function stableId(attributes) {
  return Buffer.from(JSON.stringify(identityParts(attributes))).toString('base64url');
}

function featureCoordinates(feature) {
  const geometry = feature?.geometry || {};
  const attributes = feature?.attributes || {};
  const latitude = numberOrNull(geometry.y ?? readAttribute(attributes, 'lat', 'latitude'));
  const longitude = numberOrNull(geometry.x ?? readAttribute(attributes, 'lon', 'longitude'));
  if (latitude === null || longitude === null || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

function readLeadHours(attributes) {
  return numberOrNull(readAttribute(attributes, 'fcstprd', 'tau'));
}

function validTime(attributes) {
  return textOrNull(readAttribute(attributes, 'validtime', 'fldatelbl', 'advdate', 'datelbl', 'idp_filedate'));
}

function featureTimeValue(feature) {
  const value = validTime(feature?.attributes);
  const parsed = value ? Date.parse(value) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

function sortByObservedTime(features) {
  return [...features].sort((first, second) => {
    const firstTime = featureTimeValue(first);
    const secondTime = featureTimeValue(second);
    if (firstTime === null || secondTime === null) return 0;
    return firstTime - secondTime;
  });
}

function pointRecord(feature) {
  const position = featureCoordinates(feature);
  if (!position) return null;
  const attributes = feature.attributes || {};
  return {
    ...position,
    time: validTime(attributes),
    windSpeed: numberOrNull(readAttribute(attributes, 'maxwind')),
    windGust: numberOrNull(readAttribute(attributes, 'gust')),
    pressure: numberOrNull(readAttribute(attributes, 'mslp')),
    category: textOrNull(readAttribute(attributes, 'tcdvlp', 'stormtype'))
  };
}

function forecastPointRecord(feature) {
  const point = pointRecord(feature);
  if (!point) return null;
  const attributes = feature.attributes || {};
  return {
    ...point,
    hour: readLeadHours(attributes),
    advisoryNumber: textOrNull(readAttribute(attributes, 'advisnum')),
    movement: {
      direction: numberOrNull(readAttribute(attributes, 'tcdir')),
      speed: numberOrNull(readAttribute(attributes, 'tcspd'))
    }
  };
}

function lineCoordinates(feature) {
  const paths = feature?.geometry?.paths;
  if (!Array.isArray(paths)) return [];
  return paths.map(path => path
    .filter(coordinate => Array.isArray(coordinate) && coordinate.length >= 2)
    .map(([longitude, latitude]) => ({ latitude: numberOrNull(latitude), longitude: numberOrNull(longitude) }))
    .filter(point => point.latitude !== null && point.longitude !== null && point.latitude >= -90 && point.latitude <= 90 && point.longitude >= -180 && point.longitude <= 180))
    .filter(path => path.length > 0);
}

function polygonCoordinates(feature) {
  const rings = feature?.geometry?.rings;
  if (!Array.isArray(rings)) return [];
  return rings.map(ring => ring
    .filter(coordinate => Array.isArray(coordinate) && coordinate.length >= 2)
    .map(([longitude, latitude]) => ({ latitude: numberOrNull(latitude), longitude: numberOrNull(longitude) }))
    .filter(point => point.latitude !== null && point.longitude !== null && point.latitude >= -90 && point.latitude <= 90 && point.longitude >= -180 && point.longitude <= 180))
    .filter(ring => ring.length > 0);
}

function indexFeatures(features) {
  const groups = new Map();
  features.forEach(feature => {
    const key = groupKey(feature?.attributes);
    const group = groups.get(key) || [];
    group.push(feature);
    groups.set(key, group);
  });
  return groups;
}

function featuresFor(index, attributes) {
  const requested = identityParts(attributes).map(value => value.toLowerCase());
  return [...index.values()].flat().filter(feature => {
    const candidate = identityParts(feature?.attributes).map(value => value.toLowerCase());
    let sharedIdentity = false;
    for (let position = 0; position < requested.length; position += 1) {
      if (!requested[position] || !candidate[position]) continue;
      if (requested[position] !== candidate[position]) return false;
      if (position < 3) sharedIdentity = true;
    }
    return sharedIdentity;
  });
}

function latestFeature(features) {
  return [...features].sort((first, second) => (featureTimeValue(second) || 0) - (featureTimeValue(first) || 0))[0] || null;
}

function buildCyclone(currentFeature, indexes) {
  const attributes = currentFeature.attributes || {};
  const current = pointRecord(currentFeature);
  if (!current) return null;

  const forecastPointFeatures = featuresFor(indexes.forecastPoints, attributes);
  const forecastPoints = forecastPointFeatures
    .map(forecastPointRecord)
    .filter(point => point && point.hour !== null && point.hour > 0)
    .sort((first, second) => first.hour - second.hour);

  const pastPointFeatures = sortByObservedTime(featuresFor(indexes.pastPoints, attributes));
  const track = pastPointFeatures.map(pointRecord).filter(Boolean);
  const pastTrackLines = featuresFor(indexes.pastTrack, attributes).flatMap(lineCoordinates);
  if (!track.length && pastTrackLines.length) {
    pastTrackLines.forEach(line => line.forEach(point => track.push(point)));
  }

  const forecastTrack = featuresFor(indexes.forecastTrack, attributes).flatMap(lineCoordinates);
  const forecastCone = featuresFor(indexes.forecastCone, attributes).map(polygonCoordinates).filter(rings => rings.length);

  return {
    id: stableId(attributes),
    name: textOrNull(readAttribute(attributes, 'stormname')) || 'Unnamed cyclone',
    basin: textOrNull(readAttribute(attributes, 'basin')),
    sourceIdentifier: textOrNull(readAttribute(attributes, 'idp_source')),
    stormNumber: readAttribute(attributes, 'stormnum'),
    latitude: current.latitude,
    longitude: current.longitude,
    windSpeed: current.windSpeed,
    windGust: current.windGust,
    pressure: current.pressure,
    category: current.category,
    movement: {
      direction: numberOrNull(readAttribute(attributes, 'tcdir')),
      speed: numberOrNull(readAttribute(attributes, 'tcspd'))
    },
    track,
    forecastTrack,
    forecastPoints,
    forecastCone,
    updatedAt: current.time
  };
}

async function queryLayer(layerId) {
  let baseUrl;
  try {
    baseUrl = new URL(`${String(process.env.NOAA_TROPICAL_BASE_URL).replace(/\/$/, '')}/${layerId}/query`);
  } catch {
    throw createHttpError(500, 'Cyclone service configuration is invalid');
  }
  baseUrl.searchParams.set('where', '1=1');
  baseUrl.searchParams.set('outFields', '*');
  baseUrl.searchParams.set('returnGeometry', 'true');
  baseUrl.searchParams.set('outSR', '4326');
  baseUrl.searchParams.set('f', 'json');
  const payload = await fetchJson(baseUrl);
  if (payload?.error || !Array.isArray(payload?.features)) {
    throw createHttpError(502, 'Cyclone data service returned an invalid response');
  }
  return payload.features;
}

async function loadCyclones() {
  const layerEntries = await Promise.all(Object.entries(LAYERS).map(async ([name, id]) => [name, await queryLayer(id)]));
  const layers = Object.fromEntries(layerEntries);
  const indexes = {
    forecastPoints: indexFeatures(layers.forecastPoints),
    forecastTrack: indexFeatures(layers.forecastTrack),
    forecastCone: indexFeatures(layers.forecastCone),
    pastPoints: indexFeatures(layers.pastPoints),
    pastTrack: indexFeatures(layers.pastTrack)
  };
  const currentByStorm = new Map();

  layers.forecastPoints.forEach(feature => {
    const hours = readLeadHours(feature?.attributes || {});
    if (hours !== 0 || !textOrNull(readAttribute(feature?.attributes, 'stormname'))) return;
    const key = groupKey(feature.attributes);
    const existing = currentByStorm.get(key);
    if (!existing || (featureTimeValue(feature) || 0) > (featureTimeValue(existing) || 0)) currentByStorm.set(key, feature);
  });

  const cyclones = [...currentByStorm.values()].map(feature => buildCyclone(feature, indexes)).filter(Boolean);
  const updatedAt = cyclones.map(cyclone => cyclone.updatedAt).filter(Boolean).sort((first, second) => {
    const firstTime = Date.parse(first);
    const secondTime = Date.parse(second);
    return (Number.isFinite(secondTime) ? secondTime : 0) - (Number.isFinite(firstTime) ? firstTime : 0);
  })[0] || null;

  return { source: 'NOAA', updatedAt, count: cyclones.length, cyclones };
}

function getCyclones() {
  return cache.getOrSet('cyclones:noaa:current', CACHE_TTL_MS, loadCyclones);
}

async function getCycloneById(id) {
  const selectedId = String(id || '').trim();
  if (!selectedId) throw createHttpError(400, 'Cyclone ID is required');
  return cache.getOrSet(`cyclones:noaa:detail:${selectedId}`, CACHE_TTL_MS, async () => {
    const data = await getCyclones();
    const cyclone = data.cyclones.find(item => item.id === selectedId);
    if (!cyclone) throw createHttpError(404, 'Cyclone not found');
    return cyclone;
  });
}

async function getCycloneForecast(id) {
  const selectedId = String(id || '').trim();
  if (!selectedId) throw createHttpError(400, 'Cyclone ID is required');
  return cache.getOrSet(`cyclones:noaa:forecast:${selectedId}`, CACHE_TTL_MS, async () => {
    const cyclone = await getCycloneById(selectedId);
    return {
      cycloneId: cyclone.id,
      track: cyclone.track,
      forecastTrack: cyclone.forecastTrack,
      forecastPoints: cyclone.forecastPoints,
      forecastCone: cyclone.forecastCone
    };
  });
}

module.exports = { getCyclones, getCycloneById, getCycloneForecast };
