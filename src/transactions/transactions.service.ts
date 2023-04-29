import { Injectable } from '@nestjs/common';
import { Transaction } from "./entities/transaction.entity";
import { TransactionSource } from "./transactions.controller";
import { BankApiDispatcher } from "../integrations/bank-api.dispatcher";

@Injectable()
export class TransactionsService {
  constructor(private bankApiDispatcher: BankApiDispatcher) {
  }

  find(source?: TransactionSource):Promise<Transaction[]>  {
    return source ? this.bankApiDispatcher.getTransactions(source) : this.bankApiDispatcher.getTransactionsFromAllBanks()
  }

}
