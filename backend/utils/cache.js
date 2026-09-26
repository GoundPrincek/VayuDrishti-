const values = new Map();

function get(key) {
  const entry = values.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    values.delete(key);
    return undefined;
  }
  return entry.value;
}

function set(key, value, ttlMs) {
  values.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

async function getOrSet(key, ttlMs, loader) {
  const cached = get(key);
  if (cached !== undefined) return cached;

  const pending = values.get(key);
  if (pending?.promise) return pending.promise;

  const promise = Promise.resolve().then(loader).then(
    value => set(key, value, ttlMs),
    error => {
      if (values.get(key)?.promise === promise) values.delete(key);
      throw error;
    }
  );
  values.set(key, { promise, expiresAt: Date.now() + ttlMs });
  return promise;
}

function clear() {
  values.clear();
}

module.exports = { get, set, getOrSet, clear };
