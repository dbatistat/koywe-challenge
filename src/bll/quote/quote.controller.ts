import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common'
import { QuoteService } from './quote.service'
import { CreateQuoteJoiSchema } from '../../models/schemas/create-quote.schema'
import { ConvertCurrencyDto } from '../../models/dtos/convert-currency.dto'
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe'
import { JoiResponseValidationInterceptor } from '../../common/interceptors/joi-response-validation.interceptor'
import { ResponseSchema } from '../../common/decorators/response-schema.decorator'
import { QuoteResponse, QuoteResponseJoiSchema } from '../../models/schemas/quote-response.schema'
import Decimal from 'decimal.js'

@Controller('quote')
@UseInterceptors(JoiResponseValidationInterceptor)
export class QuoteController {
  constructor(private readonly currencyService: QuoteService) {}

  @Post()
  @ResponseSchema(QuoteResponseJoiSchema)
  async createQuote(
    @Body(new JoiValidationPipe(CreateQuoteJoiSchema)) dto: ConvertCurrencyDto,
  ): Promise<QuoteResponse> {
    const result = await this.currencyService.createQuote(dto)

    return {
      ...result,
      convertedAmount: new Decimal(result.convertedAmount).toFixed(),
      amount: new Decimal(result.amount).toFixed(),
      rate: new Decimal(result.rate).toFixed(),
      timestamp: result.timestamp.toISOString(),
      expiresAt: result.expiresAt.toISOString(),
    }
  }

  @Get(':id')
  @ResponseSchema(QuoteResponseJoiSchema)
  async getById(@Param('id') id: string): Promise<QuoteResponse> {
    const result = await this.currencyService.getById(id)

    return {
      ...result,
      convertedAmount: new Decimal(result.convertedAmount).toFixed(),
      amount: new Decimal(result.amount).toFixed(),
      rate: new Decimal(result.rate).toFixed(),
      timestamp: result.timestamp.toISOString(),
      expiresAt: result.expiresAt.toISOString(),
    }
  }
}
