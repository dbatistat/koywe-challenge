import { BadRequestException, Injectable } from '@nestjs/common'
import { CryptomktService } from '../../providers/cryptomkt/cryptomkt.service'

@Injectable()
export class ExchangeRateService {
  constructor(private readonly cryptomktService: CryptomktService) {}

  async getExchangeRate(from: string, to: string): Promise<number> {
    try {
      const rate = await this.cryptomktService.getRate(from, to)
      return rate.price
    } catch (error) {
      throw new BadRequestException(`Error in obtaining the exchange rate: ${error.message}`)
    }
  }
}
