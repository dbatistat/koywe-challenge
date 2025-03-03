import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configValidationSchema } from './config/config-validation'
import { QuoteModule } from './bll/quote/quote.module'
import { UserModule } from './bll/user/user.module'
import { AuthModule } from './bll/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    QuoteModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
