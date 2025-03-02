export type QuoteEntity = {
  id: string
  from: string
  to: string
  amount: number
  rate: number
  convertedAmount: number
  timestamp: Date
  expiresAt: Date
}
