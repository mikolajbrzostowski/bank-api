import * as Joi from 'joi';

const SterlingTransactionSchema = Joi.object({
  id: Joi.string().required(),
  currency: Joi.string().required(),
  amount: Joi.string().required(),
  direction: Joi.string().required(),
  narrative: Joi.string().required(),
  created: Joi.string().required(),
  reference: Joi.string().required(),
});

export const SterlingTransactionsSchema = Joi.array().items(
  SterlingTransactionSchema,
);
