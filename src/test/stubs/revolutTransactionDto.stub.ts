import { RevolutTransactionDto } from '../../integrations/revolut/revolut-transaction.dto';

export class RevolutTransactionDtoStub implements RevolutTransactionDto {
  id: string;
  created_at: string;
  completed_at: string;
  state: string;
  amount: {
    value: string;
    currency: string;
  };
  merchant: unknown;
  counterparty: {
    id: string;
    name: string;
  };
  reference: string;

  constructor(props: Partial<RevolutTransactionDto> | undefined = {}) {
    const {
      id = 'tr_0987654321',
      created_at = '2022-03-21T14:16:32.000Z',
      completed_at = '2022-03-21T14:18:32.000Z',
      state = 'COMPLETED',
      amount = {
        value: '78.99',
        currency: 'EUR',
      },
      merchant = null,
      counterparty = {
        id: 'acc_0987654321',
        name: 'John Doe',
      },
      reference = 'SEPA-0987654321',
    } = props;

    this.id = id;
    this.created_at = created_at;
    this.completed_at = completed_at;
    this.state = state;
    this.amount = amount;
    this.merchant = merchant;
    this.counterparty = counterparty;
    this.reference = reference;
  }
}
