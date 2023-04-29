import { HttpService } from '@nestjs/axios';
import { RevolutBankApi } from './revolut-bank-api';
import { Injectable } from '@nestjs/common';
import { TransactionSource } from "../transactions/transactions.controller";

@Injectable()
export class IntegrationFactory {
  constructor(
    private httpService: HttpService,
  ) {}

  async createIntegration(source: TransactionSource): Promise<EcommerceIntegration> {


    switch (source) {
      case 'revolut':
        return new RevolutBankApi(accessKey, this.httpService);
      case 'monzo':
        return new VendureIntegration(accessKey, this.httpService);
      case 'sterling':
        return new VendureIntegration(accessKey, this.httpService);
    }
  }
}
