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
	```
	{
    "data": {
        "_id": "5f5716c8ea311a1a0f68da85",
        "tickerSymbol": "ADANIGAS",
        "sharePrice": 190.02,
        "shares": 50,
        "type": false,
        "created_at": "2020-09-08T05:29:44.235Z",
        "updated_at": "2020-09-08T05:29:44.235Z",
        "__v": 0
    },
    "error": null
	}
	```

2. #### GET - /api/trade - Get all trades
	#### response - 
	```
	{
    "data": [
        {
            "_id": "5f55f755bc9fef866c26d5f9",
            "tickerSymbol": "KAMA",
            "sharePrice": 19.02,
            "shares": 100,
            "created_at": "2020-09-07T09:03:17.201Z",
            "updated_at": "2020-09-07T09:03:17.201Z",
            "__v": 0
        },
        {
            "_id": "5f55f760bc9fef866c26d5fc",
            "tickerSymbol": "TRIL",
            "sharePrice": 19.02,
            "shares": 100,
            "created_at": "2020-09-07T09:03:28.451Z",
            "updated_at": "2020-09-07T09:03:28.451Z",
            "__v": 0
        },
        {
            "_id": "5f561701378362a872db75f2",
            "tickerSymbol": "ABFRL",
            "sharePrice": 190.02,
            "shares": 50,
            "type": true,
            "created_at": "2020-09-07T11:18:25.415Z",
            "updated_at": "2020-09-07T11:18:25.415Z",
            "__v": 0
        },
        {
            "_id": "5f5655372f2426244b442b24",
            "tickerSymbol": "TRIL",
            "sharePrice": 20.02,
            "shares": 50,
            "type": true,
            "created_at": "2020-09-07T15:43:51.271Z",
            "updated_at": "2020-09-07T15:43:51.271Z",
            "__v": 0
        }
    ],
    "error": null
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
	```
	{
    "data": [
        {
            "_id": "5f55f755bc9fef866c26d5f8",
            "tickerSymbol": "KAMA",
            "avgBuyPrice": 19.02,
            "shares": 100,
            "created_at": "2020-09-07T09:03:17.188Z",
            "updated_at": "2020-09-07T12:11:31.030Z",
            "__v": 0,
            "trades": [
                {
                    "_id": "5f55f755bc9fef866c26d5f9",
                    "tickerSymbol": "KAMA",
                    "sharePrice": 19.02,
                    "shares": 100,
                    "created_at": "2020-09-07T09:03:17.201Z",
                    "updated_at": "2020-09-07T09:03:17.201Z",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "5f55f760bc9fef866c26d5fb",
            "tickerSymbol": "TRIL",
            "avgBuyPrice": 19.77,
            "shares": 100,
            "created_at": "2020-09-07T09:03:28.449Z",
            "updated_at": "2020-09-07T15:47:38.575Z",
            "__v": 0,
            "trades": [
                {
                    "_id": "5f55f760bc9fef866c26d5fc",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 19.02,
                    "shares": 100,
                    "created_at": "2020-09-07T09:03:28.451Z",
                    "updated_at": "2020-09-07T09:03:28.451Z",
                    "__v": 0
                },
                {
                    "_id": "5f5655372f2426244b442b24",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 20.02,
                    "shares": 50,
                    "type": true,
                    "created_at": "2020-09-07T15:43:51.271Z",
                    "updated_at": "2020-09-07T15:43:51.271Z",
                    "__v": 0
                },
                {
                    "_id": "5f5655502f2426244b442b25",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 20.02,
                    "shares": 50,
                    "type": true,
                    "created_at": "2020-09-07T15:44:16.196Z",
                    "updated_at": "2020-09-07T15:44:16.196Z",
                    "__v": 0
                },
                {
                    "_id": "5f5655612f2426244b442b26",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 20.02,
                    "shares": 50,
                    "type": true,
                    "created_at": "2020-09-07T15:44:33.660Z",
                    "updated_at": "2020-09-07T15:44:33.660Z",
                    "__v": 0
                },
                {
                    "_id": "5f5655c4a16d7f25345cfd2a",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 20.02,
                    "shares": 50,
                    "type": false,
                    "created_at": "2020-09-07T15:46:12.108Z",
                    "updated_at": "2020-09-07T15:46:12.108Z",
                    "__v": 0
                },
                {
                    "_id": "5f56561aa16d7f25345cfd2b",
                    "tickerSymbol": "TRIL",
                    "sharePrice": 20.02,
                    "shares": 50,
                    "type": false,
                    "created_at": "2020-09-07T15:47:38.578Z",
                    "updated_at": "2020-09-07T15:47:38.578Z",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "5f55fee3e3f2bf8dddef0dba",
            "tickerSymbol": "ABFRL",
            "avgBuyPrice": 190.02,
            "shares": 100,
            "created_at": "2020-09-07T09:35:31.427Z",
            "updated_at": "2020-09-07T11:18:25.333Z",
            "__v": 0,
            "trades": [
                {
                    "_id": "5f561701378362a872db75f2",
                    "tickerSymbol": "ABFRL",
                    "sharePrice": 190.02,
                    "shares": 50,
                    "type": true,
                    "created_at": "2020-09-07T11:18:25.415Z",
                    "updated_at": "2020-09-07T11:18:25.415Z",
                    "__v": 0
                }
            ]
        }
    ],
    "error": null
	}
	```

5. #### GET - /api/holdings - get the holdings
	#### response - 
	```
	{
    "data": [
        {
            "_id": "5f55f755bc9fef866c26d5f8",
            "tickerSymbol": "KAMA",
            "avgBuyPrice": 19.02,
            "shares": 100,
            "created_at": "2020-09-07T09:03:17.188Z",
            "updated_at": "2020-09-07T12:11:31.030Z",
            "__v": 0
        },
        {
            "_id": "5f55f760bc9fef866c26d5fb",
            "tickerSymbol": "TRIL",
            "avgBuyPrice": 19.77,
            "shares": 100,
            "created_at": "2020-09-07T09:03:28.449Z",
            "updated_at": "2020-09-07T15:47:38.575Z",
            "__v": 0
        },
        {
            "_id": "5f55fee3e3f2bf8dddef0dba",
            "tickerSymbol": "ABFRL",
            "avgBuyPrice": 190.02,
            "shares": 100,
            "created_at": "2020-09-07T09:35:31.427Z",
            "updated_at": "2020-09-07T11:18:25.333Z",
            "__v": 0
        }
    ],
    "error": null
	}
	```

6. #### GET - /api/returns - get the returns
	#### response - 
	```
	{
		"data": {
			"returns": 7118.999999999998
		},
		"error": null
	}
	```