const manager = require('../manager');
const httpStatus = require('http-status');

module.exports = (app) => {

	app.get('/api/portfolio/', (req, res, next) => {
		manager.portfolio.getPortfolio()
			.then((data) => {
				res.send({ data, error: null })
			})
			.catch((error) => {
				res
					.status(httpStatus.INTERNAL_SERVER_ERROR)
					.send({ data: null, error })
			})
	})

	app.get('/api/holdings', (req, res, next) => {
		manager.portfolio.getHoldings()
			.then((data) => {
				res.send({ data, error: null })
			})
			.catch((error) => {
				res
					.status(httpStatus.INTERNAL_SERVER_ERROR)
					.send({ data: null, error })
			})
	})

	app.get('/api/returns', (req, res, next) => {
		manager.portfolio.getReturns()
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