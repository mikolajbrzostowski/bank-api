export class Transaction {
  id: string;
  created: string;
  description: string;
  amount: { value: string; currency: string };
  type: 'DEBIT' | 'CREDIT' | 'UNKNOWN';
  reference: string;
  metadata: { source: string };
}
