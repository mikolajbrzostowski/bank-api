import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [TransactionsModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
