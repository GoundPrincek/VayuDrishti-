const cache = require('../utils/cache');
const { createHttpError, fetchJson } = require('../utils/http');

const CACHE_TTL_MS = 90 * 1000;
const CURRENT_FIELDS = {
  temperature: 'temperature_2m',
  apparentTemperature: 'apparent_temperature',
  humidity: 'relative_humidity_2m',
  dewPoint: 'dew_point_2m',
  precipitation: 'precipitation',
  windSpeed: 'wind_speed_10m',
  windGust: 'wind_gusts_10m',
  windDirection: 'wind_direction_10m',
  pressure: 'pressure_msl',
  wetBulb: 'wet_bulb_temperature_2m'
};
const HOURLY_FIELDS = { ...CURRENT_FIELDS };
const ALLOWED_MODELS = new Set(['icon_seamless', 'ncep_gfs_seamless']);

function rounded(value) {
  return Number(value).toFixed(2);
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeWeather(record, location) {
  const currentData = record?.current || {};
  const hourlyData = record?.hourly || {};
  const current = { time: typeof currentData.time === 'string' ? currentData.time : null };
  const hourly = { time: Array.isArray(hourlyData.time) ? hourlyData.time : [] };

  Object.entries(CURRENT_FIELDS).forEach(([key, sourceField]) => {
    current[key] = numberOrNull(currentData[sourceField]);
  });
  Object.entries(HOURLY_FIELDS).forEach(([key, sourceField]) => {
    hourly[key] = Array.isArray(hourlyData[sourceField])
      ? hourlyData[sourceField].map(numberOrNull)
      : [];
  });

  return {
    source: 'Open-Meteo',
    location: { latitude: location.latitude, longitude: location.longitude },
    current,
    hourly
  };
}

function buildForecastUrl(locations, model, hourlyFields, includeCurrent = true) {
  const baseUrl = process.env.OPEN_METEO_BASE_URL;
  let url;
  try {
    url = new URL(baseUrl);
  } catch {
    throw createHttpError(500, 'Weather service configuration is invalid');
  }

  url.searchParams.set('latitude', locations.map(location => location.latitude).join(','));
  url.searchParams.set('longitude', locations.map(location => location.longitude).join(','));
  if (includeCurrent) url.searchParams.set('current', Object.values(CURRENT_FIELDS).join(','));
  url.searchParams.set('hourly', hourlyFields.join(','));
  url.searchParams.set('forecast_days', '4');
  url.searchParams.set('timezone', 'GMT');
  url.searchParams.set('wind_speed_unit', 'kmh');
  url.searchParams.set('models', model);
  return url;
}

async function requestWeather(locations, model, hourlyFields, includeCurrent = true) {
  if (!ALLOWED_MODELS.has(model)) throw createHttpError(400, 'Invalid weather model');
  const url = buildForecastUrl(locations, model, hourlyFields, includeCurrent);
  const response = await fetchJson(url);
  if (response?.error || (!Array.isArray(response) && !response?.hourly && !response?.current)) {
    throw createHttpError(502, 'External data service returned an invalid weather response');
  }
  const records = Array.isArray(response) ? response : [response];
  if (records.length !== locations.length) {
    throw createHttpError(502, 'External data service returned an incomplete weather response');
  }
  return records.map((record, index) => normalizeWeather(record, locations[index]));
}

function validateModel(model) {
  const selected = model || 'icon_seamless';
  if (!ALLOWED_MODELS.has(selected)) throw createHttpError(400, 'Invalid weather model');
  return selected;
}

async function getWeather(latitude, longitude, model = 'icon_seamless') {
  const selectedModel = validateModel(model);
  const location = { latitude, longitude };
  const key = `weather:${rounded(latitude)}:${rounded(longitude)}:${selectedModel}`;
  return cache.getOrSet(key, CACHE_TTL_MS, async () => {
    const [weather] = await requestWeather([location], selectedModel, Object.values(HOURLY_FIELDS));
    return weather;
  });
}

async function getWeatherGrid(locations, model = 'icon_seamless', hourlyFields = []) {
  const selectedModel = validateModel(model);
  const selectedFields = hourlyFields.length ? hourlyFields : [Object.values(HOURLY_FIELDS)[0]];
  const unique = new Map();

  locations.forEach(location => {
    const key = `weather-grid:${rounded(location.latitude)}:${rounded(location.longitude)}:${selectedModel}:${selectedFields.join(',')}`;
    if (!unique.has(key)) unique.set(key, { key, location });
  });

  const missing = [...unique.values()].filter(item => cache.get(item.key) === undefined);
  if (missing.length) {
    const weather = await requestWeather(missing.map(item => item.location), selectedModel, selectedFields, false);
    weather.forEach((item, index) => cache.set(missing[index].key, item, CACHE_TTL_MS));
  }

  return locations.map(location => {
    const key = `weather-grid:${rounded(location.latitude)}:${rounded(location.longitude)}:${selectedModel}:${selectedFields.join(',')}`;
    return cache.get(key);
  });
}

module.exports = {
  ALLOWED_MODELS,
  CURRENT_FIELDS,
  HOURLY_FIELDS,
  getWeather,
  getWeatherGrid
};
