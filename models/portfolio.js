const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
	tickerSymbol: {
		type: String,
		unique: true
	},
	avgBuyPrice: {
		type: Number,
		min: 0
	},
	shares: {
		type: Number,
		min: 0
	}
},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

	}
);

module.exports = mongoose.model("portfolio", portfolioSchema);
