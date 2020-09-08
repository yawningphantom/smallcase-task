const db = require('../models')

/**
 * Function to add a trade for a ticker price
 * 
 * @param {String} tickerSymbol 
 * @param {Number} avgBuyPrice 
 * @param {Number} shares 
 */

const addTrade = async (tickerSymbol, sharePrice, shares, type) => {

	try {

		let portfolioSecurity = await db.portfolio.findOne({ tickerSymbol: tickerSymbol });
		if (!portfolioSecurity) {
			const newPortfolioSecurity = new db.portfolio({ tickerSymbol, avgBuyPrice: sharePrice, shares });
			await newPortfolioSecurity.save();
		}
		else {
			await updatePortfolio(portfolioSecurity, shares, sharePrice, type);
		}


		const newTrade = new db.trade({ tickerSymbol, sharePrice, shares, type });
		const savedTrade = await newTrade.save();

		return savedTrade;

	}
	catch (err) {
		console.error(err);
		throw new Error('Unable to add Trade');
	}
};

/**
 * Function to get all the trades
 */
const getTrade = async () => {
	try {
		const trades = await db.trade.find({});
		return trades;
	} catch (err) {
		console.log(err);
		throw new Error('Unable to get Trades');
	}
};

/**
 * Function to update a trade by Id
 * @param {String} id 
 */

const updateTradeById = async (id, sharePrice, shares) => {
	console.log(id, sharePrice, shares)

	try {

		// get the existing trade
		let existingTrade = await db.trade.findById(id);

		// check if trade exists
		if (!existingTrade) {
			return { message: "Trade Not Found " };
		}

		// get the portfolio
		let portfolioSecurity = await db.portfolio.findOne({ tickerSymbol: existingTrade.tickerSymbol });

		// remove the shares
		await updatePortfolio(portfolioSecurity, existingTrade.shares, existingTrade.sharePrice, !existingTrade.type);

		// add the shares
		await updatePortfolio(portfolioSecurity, shares, sharePrice, existingTrade.type);

		// update the sharePrice and shares
		existingTrade.sharePrice = sharePrice;
		existingTrade.shares = shares;

		// save the changes
		existingTrade.save();
		return existingTrade;

	} catch (err) {
		console.log(err);
		return err
	}
};

/**
 * Function to delete a trade by Id
 * @param {String} id 
 */
const deleteTrade = async (id) => {
	try {

		const deletedTrade = await db.trade.findByIdAndDelete(id);
		if (!deletedTrade)
			return { message: "Trade Not Found " };

		let portfolioSecurity = await db.portfolio.findOne({ tickerSymbol: deletedTrade.tickerSymbol });

		await updatePortfolio(portfolioSecurity, deletedTrade.shares, deletedTrade.sharePrice, !deletedTrade.type);

		return deleteTrade;
	} catch (err) {
		console.log(err);
		res.sendServerError();
	}
};

// Util Function to update the portfolio
const updatePortfolio = async (portfolioSecurity, shares, sharePrice, type) => {

	let initialPrice = portfolioSecurity.avgBuyPrice;
	let initialShares = portfolioSecurity.shares;

	// for Buy
	if (type) {
		let sum = (shares * sharePrice) + (Number.parseInt(initialShares) * Number.parseFloat(initialPrice));
		portfolioSecurity.shares += shares;
		portfolioSecurity.avgBuyPrice = sum / portfolioSecurity.shares;
	}
	// for Sell
	else {

		// check if quantity is > existing shares
		if (initialShares < shares)
			throw `Cannot sell more than ${initialShares}`;

		portfolioSecurity.shares -= shares;

	}
	await portfolioSecurity.save();


}


module.exports = {

	addTrade,
	getTrade,
	deleteTrade,
	updateTradeById,

};