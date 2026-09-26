require('dotenv').config();

const cors = require('cors');
const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const cycloneRoutes = require('./routes/cycloneRoutes');
const { createHttpError } = require('./utils/http');

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = new Set(
  String(process.env.FRONTEND_ORIGIN || 'http://localhost:8085')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(createHttpError(403, 'Origin not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json({ limit: '128kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VayuDrishti Backend' });
});
app.use('/api/weather', weatherRoutes);
app.use('/api/cyclones', cycloneRoutes);

app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: true, message: 'Invalid JSON body' });
  }
  const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
  const message = error?.publicMessage || (statusCode >= 500 ? 'Internal server error' : 'Request failed');
  return res.status(statusCode).json({ error: true, message });
});

if (require.main === module) {
  app.listen(port, () => console.log(`VayuDrishti backend listening on http://localhost:${port}`));
}

module.exports = app;
