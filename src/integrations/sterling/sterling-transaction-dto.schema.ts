import * as Joi from 'joi';

const StarlingTransactionSchema = Joi.object({
  id: Joi.string().required(),
  currency: Joi.string().required(),
  amount: Joi.string().required(),
  direction: Joi.string().required(),
  narrative: Joi.string().required(),
  created: Joi.string().required(),
  reference: Joi.string().required(),
});

export const StarlingTransactionsSchema = Joi.array().items(
  StarlingTransactionSchema,
);
