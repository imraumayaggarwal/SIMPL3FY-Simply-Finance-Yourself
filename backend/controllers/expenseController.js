const Expense = require('../models/expenseModel');
const Budget = require('../models/budgetModel');
const { validationResult } = require('express-validator');

// Add expense
exports.addExpense = async (req, res) => {
    const { category, amount, date } = req.body;
    const userId = req.user; // Get userId from the decoded token (already set by auth middleware)

    try {
        if (amount <= 0) return res.status(400).json({ message: 'Amount must be positive' });

        // Ensure the date is valid
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const newExpense = new Expense({ category, amount, date: parsedDate, userId }); // Use req.user as userId
        await newExpense.save();

        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

exports.viewExpenses = async (req, res) => {
    const { category, startDate, endDate } = req.query;
    const userId = req.user;

    try {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const budget = await Budget.findOne({ category, userId });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found for this category' });
        }

        const expenses = await Expense.find({
            category,
            userId,
            date: { $gte: parsedStartDate, $lte: parsedEndDate }
        });

        const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        const remainingBudget = budget.amount - totalExpenses;

        const graphData = {
            labels: expenses.map(exp => exp.date.toISOString().slice(0, 10)),
            expenses: expenses.map(exp => exp.amount),
            budget: Array(expenses.length).fill(budget.amount)
        };

        res.status(200).json({
            budget: budget.amount,
            expenses,
            totalExpenses,
            remainingBudget,
            graphData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
};

//deleting an expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

// View expenses by category and date range
exports.viewExpensesByCategory = async (req, res) => {
    const { category, startDate, endDate } = req.query;
    const userId = req.user; // Extracted from the token by the auth middleware

    try {
        if (!category || !startDate || !endDate) {
            return res.status(400).json({ message: 'Category, start date, and end date are required' });
        }

        // Ensure startDate and endDate are valid Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Find expenses that match the userId, category, and fall within the date range
        const expenses = await Expense.find({
            userId,
            category,
            date: { $gte: start, $lte: end }
        }).sort({ date: 1 }); // Sort by date in ascending order

        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this category within the selected date range' });
        }

        res.status(200).json({ message: 'Expenses retrieved successfully', expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving expenses by category', error });
    }
};