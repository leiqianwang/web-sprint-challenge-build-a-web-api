// add middlewares here related to actions

// add middlewares here related to actions

const Projects = require('../projects/projects-model');
const Actions = require('./actions-model'); // Uncomment and ensure this path is correct

// Middleware function 1: Validate Action Data
function validateActionData(req, res, next) {
    const { description, notes } = req.body;
  
    if (!description || !notes) {
      res.status(400).json({ message: 'Missing required fields: description and/or notes' });
    } else {
      next();
    }
}

// Middleware function 2: Validate Action ID
async function validateActionId(req, res, next) {
    const { id } = req.params;
  
    try {
        const action = await Actions.actionToBody(action);
  
        if (action) {
            req.action = action; // Attach the action to the request object for later use
            next();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validating action ID' });
    }
}

// Middleware function 3: Validate Project ID
async function validateProjectId(req, res, next) {
    const { project_id } = req.body;

    try {
        const project = await Projects.get(project_id);
        if (project) {
            next();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error validating project ID' });
    }
}
  
module.exports = {
  validateActionData,
  validateActionId,
  validateProjectId,
};
