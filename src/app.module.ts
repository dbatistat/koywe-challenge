import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configValidationSchema } from './config/config-validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
  ],
})
export class AppModule {}
