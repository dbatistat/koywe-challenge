import { Module } from '@nestjs/common'
import { ConfigModule } from '../../config/config.module'
import { QuoteController } from './quote.controller'
import { QuoteService } from './quote.service'
import { ExchangeRateModule } from '../../facades/exchange-rate/exchange-rate.module'

@Module({
  imports: [ConfigModule, ExchangeRateModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
