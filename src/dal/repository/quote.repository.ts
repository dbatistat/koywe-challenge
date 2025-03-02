import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { QuoteEntity } from '../../models/entities/quota.entity'
import { CreateQuoteEntity } from '../type/create-quote-entity.type'

@Injectable()
export class QuoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(quoteEntity: CreateQuoteEntity): Promise<QuoteEntity> {
    const result = await this.prisma.quote.create({
      data: quoteEntity,
    })

    return {
      ...result,
      convertedAmount: result.convertedAmount.toNumber(),
      amount: result.amount.toNumber(),
      rate: result.rate.toNumber(),
    }
  }
}
