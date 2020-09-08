const db = require('../models')

/**
 * Function to get holdings
 */
const getHoldings = async () => {
	try {
		const holdings = await db.portfolio.find({});
		return holdings;
	} catch (err) {
		console.log(err);
		throw new Error('Unable to get Holdings');
	}
};

/**
 * Function to get returns
 */
const getReturns = async () => {
	try {

		// default constant price
		const todayPrice = 100;

		// get all Securities
		const allSecurities = await db.portfolio.find();

		// calculate the return
		let returns = allSecurities.reduce((totalReturns, security) => {
			return totalReturns + (todayPrice - security.avgBuyPrice) * security.shares
		}, 0);

		return {
			returns
		};
	} catch (err) {
		console.log(err);
		res.sendServerError();
	}
};

/**
 * Function to get the portfolio
 */
const getPortfolio = async () => {
	try {
		const holdings = await db.portfolio.aggregate([
			{
				$lookup:
				{
					from: "trades",
					localField: "tickerSymbol",
					foreignField: "tickerSymbol",
					as: "trades"
				}
			}
		])
		return holdings;
	} catch (err) {
		console.log(err);
		throw new Error('Unable to get Holdings');
	}
}


module.exports = {

	getHoldings,
	getReturns,
	getPortfolio,

};