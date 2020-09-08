const config = require('config');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || config.port;

app.use(helmet());
app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1024mb', parameterLimit: 50000 }));

// added routes
require('./routes')(app)

app.use((err, req, res, next) => {
	// log error with logger of your choice
	res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
})

mongoose
	.connect(config.db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => app.listen(port, () => console.log('Running server on port : ' + port)))
	.catch(err => console.log(err));