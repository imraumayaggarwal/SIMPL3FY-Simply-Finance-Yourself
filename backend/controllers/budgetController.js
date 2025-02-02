const Budget = require('../models/budgetModel');

// Create a fresh budget
exports.createBudget = async (req, res) => {
    const { category, amount } = req.body;
    const userId = req.user;  // Get the userId from the decoded token

    try {
        // Validate the amount
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be positive' });
        }

        // Check if the budget already exists for the category and user
        const existingBudget = await Budget.findOne({ category, userId });
        if (existingBudget) {
            return res.status(400).json({ message: 'Budget already set for this category' });
        }

        // Create and save the new budget
        const newBudget = new Budget({ category, amount, userId });
        await newBudget.save();
        
        console.log(`Budget for ${category} created successfully!`);
        res.status(201).json({ message: `Budget for ${category} created successfully!`, budget: newBudget });
    } catch (error) {
        console.error("Error creating budget:", error);
        res.status(500).json({ message: 'Error creating budget', error: error.message });
    }
};

// Get all budgets for the authenticated user
exports.getBudgets = async (req, res) => {
    const userId = req.user;  // Get the userId from the decoded token

    try {
        const budgets = await Budget.find({ userId });  // Fetch all budgets for the authenticated user
        if (budgets.length === 0) {
            return res.status(404).json({ message: 'No budgets found for this user' });
        }

        res.status(200).json({ budgets });  // Send the budgets as JSON
    } catch (error) {
        console.error("Error fetching budgets:", error);
        res.status(500).json({ message: 'Error fetching budgets', error: error.message });
    }
};

// Delete an existing budget
exports.deleteBudget = async (req, res) => {
    const { category } = req.body;  // Get the category to delete
    const userId = req.user;  // Get the userId from the decoded token

    try {
        const budget = await Budget.findOneAndDelete({ category, userId });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found for this category' });
        }

        console.log(`Budget for ${category} deleted successfully!`);
        res.status(200).json({ message: `Budget for ${category} deleted successfully!` });
    } catch (error) {
        console.error("Error deleting budget:", error);
        res.status(500).json({ message: 'Error deleting budget', error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    const userId = req.user;  // Get the userId from the decoded token

    try {
        // Fetch all budgets for the user
        const budgets = await Budget.find({ userId });

        // Get the categories that the user has set a budget for
        const categories = budgets.map(budget => budget.category);

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No budgets found for this user' });
        }

        res.status(200).json({ categories });  // Send the categories as JSON
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

