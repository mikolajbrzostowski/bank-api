import Joi from 'joi';
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BankApiDispatcher } from './bank-api.dispatcher';
import { BankApiService, BankApiTransactionDto } from './bank-api.service';
import { ConfigService } from '@nestjs/config';
import { Transaction } from '../transactions/entities/transaction.entity';
import { mapToInternalTransactionType as sterlingMapping } from './sterling/sterling-mapping';
import { mapToInternalTransactionType as revolutMapping } from './revolut/revolut-mapping';
import { mapToInternalTransactionType as monzoMapping } from './monzo/monzo-mapping';
import { MonzoTransactionsSchema } from './monzo/monzo-transaction-dto.schema';
import { RevolutTransactionsSchema } from './revolut/revoult-transaction-dto.schema';
import { SterlingTransactionsSchema } from './sterling/sterling-transaction-dto.schema';

const apiServiceFactory = (
  bankName: string,
  apiUrlConstant: string,
  mappingFunction: (transactionDto: BankApiTransactionDto) => Transaction,
  schema: Joi.Schema,
) => ({
  provide: `${bankName}BankApiService`,
  useFactory: (httpService: HttpService, configService: ConfigService) => {
    const apiUrl = configService.get(apiUrlConstant);
    return new BankApiService(apiUrl, httpService, mappingFunction, schema);
  },
  inject: [HttpService, ConfigService],
});

@Module({
  imports: [HttpModule],
  providers: [
    BankApiDispatcher,
    apiServiceFactory(
      'Monzo',
      'MONZO_API_URL',
      monzoMapping,
      MonzoTransactionsSchema,
    ),
    apiServiceFactory(
      'Revolut',
      'REVOLUT_API_URL',
      revolutMapping,
      RevolutTransactionsSchema,
    ),
    apiServiceFactory(
      'Sterling',
      'STERLING_API_URL',
      sterlingMapping,
      SterlingTransactionsSchema,
    ),
  ],
  exports: [BankApiDispatcher],
})
export class IntegrationsModule {}
