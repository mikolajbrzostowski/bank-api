import { MonzoTransactionDto } from './monzo-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';

export function mapToInternalTransactionType(
  monzoTransactionDto: MonzoTransactionDto,
): Transaction {
  return {
    id: monzoTransactionDto.id,
    created: monzoTransactionDto.created,
    description: monzoTransactionDto.description,
    amount: {
      value: monzoTransactionDto.amount.toFixed(2),
      currency: monzoTransactionDto.currency,
    },
    type: 'UNKNOWN', // TODO CHECK THIS
    reference: monzoTransactionDto.metadata?.reference,
    metadata: {
      source: 'Monzo',
    },
  };
}
