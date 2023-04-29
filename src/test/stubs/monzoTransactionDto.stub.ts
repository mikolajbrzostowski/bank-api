import { MonzoTransactionDto } from '../../integrations/monzo/monzo-transaction.dto';

export class MonzoTransactionDtoStub implements MonzoTransactionDto {
  id: string;
  created: string;
  description: string;
  amount: number;
  currency: string;
  metadata: {
    reference: string;
  };

  constructor(props: Partial<MonzoTransactionDto> | undefined = {}) {
    const {
      id = 'tx_00001YpBqNqL8mWnKf4t2Z',
      created = '2023-04-05T09:12:00.000Z',
      description = 'Monthly rent payment',
      amount = -120000,
      currency = 'EUR',
      metadata = {
        reference: 'SEPA-0987654321',
      },
    } = props;

    this.id = id;
    this.created = created;
    this.description = description;
    this.amount = amount;
    this.currency = currency;
    this.metadata = metadata;
  }
}
