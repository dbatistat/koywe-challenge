import { Test, TestingModule } from '@nestjs/testing'
import { QuoteService } from './quote.service'
import { QuoteRepository } from '../../dal/repository/quote.repository'
import { ExchangeRateService } from '../../facades/exchange-rate/exchange-rate.service'
import { ConfigService } from '../../config/config.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'

jest.mock('../../dal/repository/quote.repository')
jest.mock('../../facades/exchange-rate/exchange-rate.service')
jest.mock('../../config/config.service')

describe('QuoteService', () => {
  let quoteService: QuoteService
  let quoteRepository: jest.Mocked<QuoteRepository>
  let exchangeRateService: jest.Mocked<ExchangeRateService>
  let configService: jest.Mocked<ConfigService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService, QuoteRepository, ExchangeRateService, ConfigService],
    }).compile()

    quoteService = module.get<QuoteService>(QuoteService)
    quoteRepository = module.get(QuoteRepository)
    exchangeRateService = module.get(ExchangeRateService)
    configService = module.get(ConfigService)
  })

  describe('getById', () => {
    it('debería lanzar NotFoundException si la cotización no existe', async () => {
      quoteRepository.getById.mockResolvedValue(null)

      await expect(quoteService.getById('123')).rejects.toThrow(NotFoundException)
    })

    it('debería lanzar BadRequestException si la cotización está expirada', async () => {
      quoteRepository.getById.mockResolvedValue({
        id: '123',
        from: 'ARS',
        to: 'ATH',
        amount: 1,
        rate: 10,
        convertedAmount: 100,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() - 1000), // Expirada
      })

      await expect(quoteService.getById('123')).rejects.toThrow(BadRequestException)
    })

    it('debería devolver la cotización si existe y no está expirada', async () => {
      const quote = {
        id: '123',
        from: 'ARS',
        to: 'ATH',
        amount: 1,
        rate: 10,
        convertedAmount: 100,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 10000), // No expirada
      }
      quoteRepository.getById.mockResolvedValue(quote)

      await expect(quoteService.getById('123')).resolves.toEqual(quote)
    })
  })

  describe('createQuote', () => {
    it('debería calcular el monto convertido correctamente', async () => {
      const dto = { amount: 100, from: 'USD', to: 'EUR' }
      const exchangeRate = 0.85
      const expirationTime = 60000 // 1 minuto
      const convertedAmount = dto.amount * exchangeRate

      exchangeRateService.getExchangeRate.mockResolvedValue(exchangeRate)
      configService.getExpiration.mockReturnValue(expirationTime)
      quoteRepository.create.mockResolvedValue({
        id: '123',
        from: dto.from,
        to: dto.to,
        amount: dto.amount,
        rate: exchangeRate,
        convertedAmount,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + expirationTime),
      })

      const result = await quoteService.createQuote(dto)

      expect(result.convertedAmount).toBeCloseTo(convertedAmount)
      expect(result.from).toBe(dto.from)
      expect(result.to).toBe(dto.to)
    })
  })
})
