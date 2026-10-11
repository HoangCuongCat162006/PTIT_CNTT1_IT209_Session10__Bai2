const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend service is running smoothly with Docker Multi-stage build!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: `${process.uptime().toFixed(2)} seconds`,
    timestamp: new Date().toISOString()
  });
});

// System info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    memory: {
      totalMemMB: (os.totalmem() / (1024 * 1024)).toFixed(2),
      freeMemMB: (os.freemem() / (1024 * 1024)).toFixed(2),
      processUsageMB: (process.memoryUsage().rss / (1024 * 1024)).toFixed(2)
    },
    env: process.env.NODE_ENV || 'development'
  });
});

// Mock users API endpoint
app.get('/api/users', (req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Nguyen Van A', role: 'DevOps Engineer' },
      { id: 2, name: 'Tran Thi B', role: 'Backend Developer' },
      { id: 3, name: 'Le Van C', role: 'System Architect' }
    ],
    total: 3
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(` Server is running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});
