import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { ConvertCurrency } from './types/create-quote.type'
import { Quote } from './types/quote.type'
import { ConfigService } from '../../config/config.service'
import { ExchangeRateService } from '../../facades/exchange-rate/exchange-rate.service'

@Injectable()
export class QuoteService {
  constructor(
    private configService: ConfigService,
    private exchangeRateService: ExchangeRateService,
  ) {}

  async convertCurrency(dto: ConvertCurrency): Promise<Quote> {
    const { amount, from, to } = dto
    const expirationTime = this.configService.getExpiration()

    const rate = await this.exchangeRateService.getExchangeRate(from, to)
    const convertedAmount = amount * rate

    const response = {
      id: uuidv4(),
      from,
      to,
      amount,
      rate,
      convertedAmount,
      timestamp: new Date(),
      expiresAt: new Date(new Date().getTime() + expirationTime),
    }

    return Promise.resolve(response)
  }
}
