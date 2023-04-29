import { RevolutTransactionDto } from './revolut-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';

export function mapToInternalTransactionType(
  revolutTransactionDto: RevolutTransactionDto,
): Transaction {
  return {
    id: revolutTransactionDto.id,
    created: revolutTransactionDto.created_at,
    description: revolutTransactionDto.counterparty.name,
    amount: {
      value: revolutTransactionDto.amount.value,
      currency: revolutTransactionDto.amount.currency,
    },
    type: 'UNKNOWN',
    reference: revolutTransactionDto.reference,
    metadata: {
      source: 'Revolut',
    },
  };
}
