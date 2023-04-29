import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

export type TransactionSource = 'monzo' | 'revolut' | 'sterling';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Query('source') source: TransactionSource): Promise<Transaction[]> {
    return this.transactionsService.find(source);
  }
}
