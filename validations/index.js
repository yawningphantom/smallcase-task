const tradeValidator = require("./tradeValidator");
const httpStatus = require('http-status');

// const tradeUpdateBuyValidator = require("./tradeUpdateBuyValidator");
// const tradeUpdateSellValidator = require("./tradeUpdateSellValidator");

module.exports = {
	validate: schema => (req, res, next) => {
		try {
			req.body.tickerSymbol = req.params.tickerSymbol;
			const result = schema.validate(req.body);
			if (result.error) {
				return res.status(httpStatus.BAD_REQUEST).send(result.error);
			}
		}
		catch (error) {
			console.log(error)
		}


		next();
	},
	schema: tradeValidator
};
