import { SterlingTransactionDto } from './sterling-transaction.dto';
import { Transaction } from '../../transactions/entities/transaction.entity';

export function mapToInternalTransactionType(
  sterlingTransactionDto: SterlingTransactionDto,
): Transaction {
  return {
    id: sterlingTransactionDto.id,
    created: sterlingTransactionDto.created,
    description: sterlingTransactionDto.narrative,
    amount: {
      value: sterlingTransactionDto.amount,
      currency: sterlingTransactionDto.currency,
    },
    type: 'UNKNOWN', // TODO CHECK THIS
    reference: sterlingTransactionDto.reference,
    metadata: {
      source: 'Sterling',
    },
  };
}
