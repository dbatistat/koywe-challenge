import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { ConvertCurrency } from './types/create-quote.type'
import { Quote } from './types/quote.type'
import { ConfigService } from '../../config/config.service'

@Injectable()
export class QuoteService {
  constructor(private configService: ConfigService) {}

  async convertCurrency(dto: ConvertCurrency): Promise<Quote> {
    const { amount, from, to } = dto
    const expirationTime = this.configService.getExpiration()

    const rate = 0.0000023
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
