import * as Joi from 'joi';

export const RevolutTransactionSchema = Joi.object({
  id: Joi.string().required(),
  created_at: Joi.string().required(),
  completed_at: Joi.string().required(),
  state: Joi.string().required(),
  amount: Joi.object({
    value: Joi.string().required(),
    currency: Joi.string().required(),
  }),
  merchant: Joi.object({}),
  counterparty: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),
  reference: Joi.string().required(),
});

export const RevolutTransactionsSchema = Joi.array().items(
  RevolutTransactionSchema,
);
