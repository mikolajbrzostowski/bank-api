import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TransactionSource } from '../transactions/transactions.controller';
import { Transaction } from '../transactions/entities/transaction.entity';
import { BankApi, BankApiService } from './bank-api.service';
import { SterlingTransactionDto } from './sterling/sterling-transaction.dto';
import { MonzoTransactionDto } from './monzo/monzo-transaction.dto';
import { RevolutTransactionDto } from './revolut/revolut-transaction.dto';

@Injectable()
export class BankApiDispatcher {
  constructor(
    private readonly httpService: HttpService,
    @Inject('MonzoBankApiService')
    private readonly monzoBankApi: BankApiService<MonzoTransactionDto>,
    @Inject('RevolutBankApiService')
    private readonly revolutBankApi: BankApiService<RevolutTransactionDto>,
    @Inject('SterlingBankApiService')
    private readonly sterlingBankApi: BankApiService<SterlingTransactionDto>,
  ) {}

  async getTransactions(source: TransactionSource): Promise<Transaction[]> {
    const api: BankApi = this.getBankApi(source);

    if (!api) {
      throw new BadRequestException({
        error: 'Wrong source parameter',
        status: 400,
      });
    }
    return api.getTransactions();
  }

  async getTransactionsFromAllBanks(): Promise<Transaction[]> {
    const monzoApi: BankApi = this.getBankApi('monzo');
    const revolutApi: BankApi = this.getBankApi('revolut');
    const sterlingApi: BankApi = this.getBankApi('sterling');

    const transactions = await Promise.all(
      [monzoApi, revolutApi, sterlingApi].map((api) => api.getTransactions()),
    );
    return transactions.flat();
  }

  private getBankApi(source: TransactionSource): BankApi {
    const bankApis = {
      monzo: this.monzoBankApi,
      revolut: this.revolutBankApi,
      sterling: this.sterlingBankApi,
    };
    return bankApis[source];
  }
}
