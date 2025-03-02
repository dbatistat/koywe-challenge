import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { QuoteRepository } from './quote.repository'

@Module({
  providers: [PrismaService, QuoteRepository],
  exports: [QuoteRepository],
})
export class RepositoryModule {}
