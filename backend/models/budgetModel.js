const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['food', 'transport', 'entertainment', 'personalCare', 'education', 'medicines', 'clothing', 'groceries'],
        required: true,
    },
    amount: { type: Number, required: true, min:0, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
