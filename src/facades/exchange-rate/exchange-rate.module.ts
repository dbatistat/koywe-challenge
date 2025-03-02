import { Module } from '@nestjs/common'
import { CryptomktModule } from '../../providers/cryptomkt/cryptomkt.module'
import { ExchangeRateService } from './exchange-rate.service'

@Module({
  imports: [CryptomktModule],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
