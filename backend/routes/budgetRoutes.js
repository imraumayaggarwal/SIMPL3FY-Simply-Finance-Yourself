const express = require('express');
const { createBudget, deleteBudget, getBudgets, getCategories } = require('../controllers/budgetController');
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Apply 'auth' middleware to these routes
router.post('/create', auth, createBudget);  // Create a new budget (protected)
router.delete('/delete', auth, deleteBudget); // Delete a budget (protected)
router.get('/', auth, getBudgets);  
router.get('/categories', auth, getCategories);


module.exports = router;
