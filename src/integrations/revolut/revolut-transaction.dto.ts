export class RevolutTransactionDto {
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
}
