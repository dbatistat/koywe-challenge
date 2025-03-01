import { Injectable } from '@nestjs/common'
import { ConfigService as ConfigNestService } from '@nestjs/config'

@Injectable()
export class ConfigService {
  constructor(private configService: ConfigNestService) {}

  getPort(): string {
    return this.configService.get<string>('PORT')
  }
}
