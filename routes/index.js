const httpStatus = require('http-status')

module.exports = (app) => {

	require('./tradeRoutes.js')(app)
	require('./portfolioRoutes.js')(app)
	

	// health check api
    app.get( '/health', (req,res) =>{
        res.send("OK");
	});

    // Render error page
    app.get( '*', (req, res) => {
        res.sendStatus(httpStatus.NOT_FOUND)
	})
}