// add middlewares here related to projects
const Projects = require('./projects-model');

// Middleware to validate project data
function validateProjectData(req, res, next) {
    const { project, actions } = req.body;
    if (!project || !actions) {
        next({ status: 400, message: 'Missing required fields: name and/or description' });  // Add 'status: 400'
    } else {
        next();
    }
}

// Middleware to validate project ID
async function validateProjectId(req, res, next) {
    const { id } = req.params;

    try {
        const project = await Projects.get(id);
        if (project) {
            req.project = project; // Attach the project to the request object for later use
            next();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validating project ID' });
    }
}

module.exports = {
    validateProjectData,
    validateProjectId
};
