// add middlewares here related to actions

const Actions = require('./actions-model.js');
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
      const action = await Actions.get(id);
  
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
  
  module.exports = {
    validateActionData,
    validateActionId,
  };