export interface MonzoTransactionDto {
  id: string;
  created: string;
  description: string;
  amount: number;
  currency: string;
  metadata: {
    reference: string;
  };
}
