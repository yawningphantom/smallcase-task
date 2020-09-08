
const manager = require('../manager');
const httpStatus = require('http-status');
const validator = require('../validations/index');
const { validate, schema } = require('../validations');
const baseUrl = '/api/trade'
module.exports = (app) => {

	// route to add a new trade
	app.put(`${baseUrl}/:tickerSymbol`
		, validate(schema.addTrade)
		, (req, res, next) => {

			const { tickerSymbol } = req.params
			const { sharePrice, shares, type } = req.body;
			manager.trade.addTrade(tickerSymbol, sharePrice, shares, type)
				.then((data) => {
					res.send({ data, error: null })
				})
				.catch((error) => {
					res
						.status(httpStatus.INTERNAL_SERVER_ERROR)
						.send({ data: null, error })
				})
		})

	// route to get all the trades
	app.get(baseUrl, (req, res, next) => {

		manager.trade.getTrade()
			.then((data) => {
				res.send({ data, error: null })
			})
			.catch((error) => {
				res
					.status(httpStatus.INTERNAL_SERVER_ERROR)
					.send({ data: null, error })
			})

	})

	// route to update a trade
	app.post('/api/trade/:id'
		, validate(schema.updateTrade)
		, (req, res, next) => {

			const { sharePrice, shares } = req.body;
			manager.trade.updateTradeById(id, sharePrice, shares)
				.then((data) => {
					res.send({ data, error: null })
				})
				.catch((error) => {
					res
						.status(httpStatus.INTERNAL_SERVER_ERROR)
						.send({ data: null, error })
				})
		})

	app.delete('/api/trade/:id', (req, res, next) => {
		const { id } = req.params
		manager.trade.deleteTrade(id)
			.then((data) => {
				res.send({ data, error: null })
			})
			.catch((error) => {
				res
					.status(httpStatus.INTERNAL_SERVER_ERROR)
					.send({ data: null, error })
			})
	})

}