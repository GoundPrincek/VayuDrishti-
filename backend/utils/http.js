class HttpError extends Error {
  constructor(statusCode, publicMessage) {
    super(publicMessage);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}

function createHttpError(statusCode, publicMessage) {
  return new HttpError(statusCode, publicMessage);
}

async function fetchJson(url, { timeoutMs = 10_000, headers = {}, ...options } = {}) {
  if (typeof fetch !== 'function') {
    throw createHttpError(500, 'The server requires Node.js 18 or newer');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      headers: { Accept: 'application/json', ...headers },
      signal: controller.signal
    });
    if (!response.ok) throw createHttpError(502, 'External data service returned an error');

    try {
      return await response.json();
    } catch {
      throw createHttpError(502, 'External data service returned invalid JSON');
    }
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (controller.signal.aborted || error?.name === 'AbortError') {
      throw createHttpError(504, 'External data service timed out');
    }
    throw createHttpError(502, 'External data service is unavailable');
  } finally {
    clearTimeout(timeout);
  }
}

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

module.exports = { HttpError, createHttpError, fetchJson, asyncHandler };
