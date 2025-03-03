import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { QuoteRepository } from './quote.repository'
import { UserRepository } from './user.repository'

@Module({
  providers: [PrismaService, UserRepository, QuoteRepository],
  exports: [UserRepository, QuoteRepository],
})
export class RepositoryModule {}
