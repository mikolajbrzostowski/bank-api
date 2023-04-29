import { SterlingTransactionDto } from '../../integrations/sterling/sterling-transaction.dto';

export class SterlingTransactionDtoStub implements SterlingTransactionDto {
  id: string;
  currency: string;
  amount: string;
  direction: string;
  narrative: string;
  created: string;
  reference: string;

  constructor(props: Partial<SterlingTransactionDto> | undefined = {}) {
    const {
      id = '6d4c34fc-94e7-4e52-8a36-9c40b102ecfc',
      currency = 'EUR',
      amount = '-25.00',
      direction = 'OUT',
      narrative = 'Payment to Jane Smith',
      created = '2022-03-21T14:16:32.000Z',
      reference = 'SEPA-1234567890',
    } = props;

    this.id = id;
    this.currency = currency;
    this.amount = amount;
    this.direction = direction;
    this.narrative = narrative;
    this.created = created;
    this.reference = reference;
  }
}
