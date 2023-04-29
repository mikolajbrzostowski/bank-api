import * as Joi from 'joi';

const MonzoTransactionSchema = Joi.object({
  id: Joi.string().required(),
  created: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  metadata: Joi.object({
    reference: Joi.string().required(),
  }),
});

export const MonzoTransactionsSchema = Joi.array().items(
  MonzoTransactionSchema,
);
