import { Transaction } from '../transactions/entities/transaction.entity';
import { RevolutTransactionDto } from './revolut/revolut-transaction.dto';
import { SterlingTransactionDto } from './sterling/sterling-transaction.dto';
import { MonzoTransactionDto } from './monzo/monzo-transaction.dto';
import Joi from 'joi';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';

export type BankApiTransactionDto =
  | RevolutTransactionDto
  | MonzoTransactionDto
  | SterlingTransactionDto;

export interface BankApi {
  getTransactions: () => Promise<Transaction[]>;
  mapToInternalTransactionType: (
    transactionDto: BankApiTransactionDto,
  ) => Transaction;
  validateSchema: (
    transactions: BankApiTransactionDto[],
    schema: Joi.Schema,
  ) => void;
}

export class BankApiService<TransactionDto extends BankApiTransactionDto>
  implements BankApi
{
  constructor(
    private apiUrl: string,
    private httpService: HttpService,
    private mappingFunction: (transactionDto: TransactionDto) => Transaction,
    private schema: Joi.Schema,
  ) {}

  async getTransactions(): Promise<Transaction[]> {
    const { data: transactions } = await this.httpService.axiosRef.get<
      TransactionDto[]
    >(this.apiUrl);
    this.validateSchema(transactions, this.schema);
    return this.mapTransactions(transactions);
  }

  mapToInternalTransactionType(transactionDto: TransactionDto): Transaction {
    return this.mappingFunction(transactionDto);
  }

  validateSchema(transactions: TransactionDto[], schema: Joi.Schema): void {
    const { error } = schema.validate(transactions);

    if (error) {
      throw new InternalServerErrorException(
        { error: 'Something went wrong', status: 500 },
        error.message,
      );
    }
  }

  mapTransactions(transactions: TransactionDto[]): Transaction[] {
    return transactions.map((transactionDto) =>
      this.mapToInternalTransactionType(transactionDto),
    );
  }
}
