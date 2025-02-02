const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
