// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model.js');
const middleware = require('./actions-middleware.js'); // Import your middleware functions


// [GET] /api/actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// [GET] /api/actions/:id
router.get('/:id', middleware.validateActionId, async (req, res) => {
  res.status(200).json(req.action); // req.action is attached by the middleware
});

// [POST] /api/actions
router.post('/', middleware.validateActionData, async (req, res) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ message: 'Error adding action' });
  }
});

// [PUT] /api/actions/:id
router.put('/:id', middleware.validateActionId, middleware.validateActionData, async (req, res) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating action' });
  }
});

// [DELETE] /api/actions/:id
router.delete('/:id', middleware.validateActionId, async (req, res) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end(); // No content in response
  } catch (error) {
    res.status(500).json({ message: 'Error deleting action' });
  }
});

// Define other endpoints as needed

module.exports = router;
