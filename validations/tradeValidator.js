const Joi = require("joi");

const addTrade = Joi.object().keys({
  tickerSymbol: Joi.string()
    .min(4)
    .required(),
  sharePrice: Joi.number()
    .min(0)
    .required(),
  shares: Joi.number()
    .min(1)
    .required(),
  type: Joi.boolean()
    .required(),
});



const updateTrade = Joi.object().keys({
  shares: Joi.number()
    .min(1)
    .required(),
  sharePrice: Joi.number()
    .min(0)
    .required(),
});

module.exports = {
  addTrade,
  updateTrade,
}