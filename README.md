# SmallCase Backend Task

## Brief Intro
```
This is a NodeJs project built with Express and MongoDB. There are 2 collections in the MongoDB
1. trade - To store all the trades with their share price, share quantity, type of trade( true - buy , false- sell) and tickerSymbol of the security. 
2. portfolio - This stores the cumulative of all the trades that have happened so far on a security. It includes average buy price, share quantity, tickerSymbol and get update accordingly based on the trades placed.

All the API's are just operations on these two components.
```

### Improvements
1. Currently the tickerSymbol is dependent on the Request Params i.e no check for tickerSymbol but since we have only limited ticker symbols, we should have a check on that as well.
2. Trade type should be an enum rather than a boolean.
3. We can add a logger for handling and reporting our errors.
3. Although it is written in the task that we need an update API for trades but I believe that this is not needed in this project as once we place a trade it gets executed on spot and hence it is not feasible to update a trade in real life scenario.

## API's
1. #### PUT - /api/trade/:tickerSymbol - Add a trade
	#### request body - 
	```
		{ 
			"sharePrice" : 90.03,
			"shares" : 100,
			"type" : true // true for buy , sell for false 
		}
	```
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

2. #### GET - /api/trade - Get all trades
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

3. #### POST - /api/trade/:id - Update share price ,quantity of a trade
	#### request body - 
	```
		{ 
			"sharePrice" : 90.03,
			"shares" : 100,
		}
	``` 
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

4. #### DELETE - /api/trade/:id - Delete a trade
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

4. #### GET - /api/portfolio - get the portfolio
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

5. #### GET - /api/holdings - get the holdings
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```

6. #### GET - /api/returns - get the returns
	#### response - 
	```{ 
		"sharePrice" : 90.03,
		"shares" : 100,
		"type" : true // true for buy , sell for false 
		}
	```