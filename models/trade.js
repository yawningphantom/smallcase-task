const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
	tickerSymbol: {
		type: String
	},
	sharePrice: {
		type: Number,
		min: 0
	},
	shares: {
		type: Number,
		min: 0
	},
	type: {
		type: Boolean
	},
},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

	});

module.exports = mongoose.model("trade", tradeSchema);
