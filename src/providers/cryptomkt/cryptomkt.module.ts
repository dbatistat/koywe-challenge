import { Module } from '@nestjs/common'
import { ConfigModule } from '../../config/config.module'
import { CryptomktService } from './cryptomkt.service'

@Module({
  imports: [ConfigModule],
  providers: [CryptomktService],
  exports: [CryptomktService],
})
export class CryptomktModule {}
