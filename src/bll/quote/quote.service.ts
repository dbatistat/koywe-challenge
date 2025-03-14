import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateQuote } from './types/create-quote.type'
import { Quote } from './types/quote.type'
import { ConfigService } from '../../config/config.service'
import { ExchangeRateService } from '../../facades/exchange-rate/exchange-rate.service'
import { QuoteRepository } from '../../dal/repository/quote.repository'

@Injectable()
export class QuoteService {
  constructor(
    private configService: ConfigService,
    private quoteRepository: QuoteRepository,
    private exchangeRateService: ExchangeRateService,
  ) {}

  async getById(id: string): Promise<Quote> {
    const quote = await this.quoteRepository.getById(id)

    if (!quote) {
      throw new NotFoundException(`Quote doesn't exist with id: ${id}`)
    }

    if (new Date().getTime() >= quote.expiresAt.getTime()) {
      throw new BadRequestException(`Quote expired with id: ${id}`)
    }

    return quote
  }

  async createQuote(dto: CreateQuote): Promise<Quote> {
    const { amount, from, to } = dto
    const expirationTime = this.configService.getExpiration()

    const rate = await this.exchangeRateService.getExchangeRate(from, to)
    const convertedAmount = amount * rate

    const quoteCreated = await this.quoteRepository.create({
      from,
      to,
      amount,
      rate,
      convertedAmount,
      timestamp: new Date(),
      expiresAt: new Date(new Date().getTime() + expirationTime),
    })

    const response: Quote = {
      ...quoteCreated,
      convertedAmount,
    }

    return response
  }
}
