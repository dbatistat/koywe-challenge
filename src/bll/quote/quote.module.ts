import { Module } from '@nestjs/common'
import { ConfigModule } from '../../config/config.module'
import { QuoteController } from './quote.controller'
import { QuoteService } from './quote.service'
import { ExchangeRateModule } from '../../facades/exchange-rate/exchange-rate.module'
import { RepositoryModule } from '../../dal/repository/repository.module'

@Module({
  imports: [ConfigModule, RepositoryModule, ExchangeRateModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
