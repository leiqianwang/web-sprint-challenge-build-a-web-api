const express = require('express');
const server = express();

// Configure your server here
server.use(express.json());

// Import routers for actions and projects
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

// Use the routers with their respective base paths
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
