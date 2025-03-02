import { QuoteEntity } from '../../models/entities/quota.entity'

export type CreateQuoteEntity = Omit<QuoteEntity, 'id'>
