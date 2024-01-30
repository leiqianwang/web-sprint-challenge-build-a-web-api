// Write your "projects" router here!
// const express = require('express');
// const router = express.Router();
// const Projects = require('./projects-model');
// const middleware = require('./projects-middleware'); // Import your middleware functions

// // Define endpoints here
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectData, validateProjectId, validateCompletedField } = require('./projects-middleware');

const router = express.Router();

// [GET] /api/projects - Get all projects
router.get('/', async (req, res, next) => {  // Add 'async'
    try {
        const projects = await Projects.get();  // Add 'await'
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
});


// [GET] /api/projects/:id - Get a single project by ID
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// [POST] /api/projects - Create a new project
router.post('/', validateProjectData, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});


// [PUT] /api/projects/:id - Update a project
router.put('/:id', validateProjectData, validateCompletedField, validateProjectId, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
    } catch (err) {
        next(err);
    }
});

// [DELETE] /api/projects/:id - Delete a project
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects/:id/actions - Get actions for a project
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Something went wrong inside the projects router',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;


