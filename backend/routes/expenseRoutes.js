const express = require('express');
const { addExpense, viewExpenses, deleteExpense, viewExpensesByCategory } = require('../controllers/expenseController');
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

router.post('/add', auth, addExpense);
router.get('/view', auth, viewExpenses);  // Protect this route with 'auth' middleware
router.delete('/delete/:id', auth, deleteExpense); // Protect this route with 'auth' middleware
router.get('/expenseByCategory', auth, viewExpensesByCategory);

module.exports = router;
