import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { ConfigService } from '../../config/config.service'
import { CryptomktResponse } from './types/cryptomkt-response.type'
import { CryptomktRate } from './types/cryptomkt-rate.type'

@Injectable()
export class CryptomktService {
  constructor(private configService: ConfigService) {}

  async getRate(from: string, to: string): Promise<CryptomktRate> {
    try {
      const apiUrl = this.configService.getCryptoMktApiUrl()
      const response = await axios.get<CryptomktResponse>(
        `${apiUrl}/api/3/public/price/rate?from=${from}&to=${to}`,
      )
      const rateData = response.data[from]

      if (!rateData) {
        throw new Error(`No information found for the coin  ${from}`)
      }

      return rateData
    } catch (error) {
      throw new Error(`Error when querying the exchange rate API: ${error.message}`)
    }
  }
}
