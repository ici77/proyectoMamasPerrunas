const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4321',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'API Mamás Perrunas funcionando',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalPosts = await prisma.post.count();
    const totalEvents = await prisma.event.count();

    res.json({
      ok: true,
      data: {
        totalUsers,
        totalPosts,
        totalEvents,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Error conectando con la base de datos',
      error: error.message,
    });
  }
});

module.exports = app;