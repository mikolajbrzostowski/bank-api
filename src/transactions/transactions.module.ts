import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HttpModule } from '@nestjs/axios';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [HttpModule, IntegrationsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
