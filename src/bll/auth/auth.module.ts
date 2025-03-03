import { Module } from '@nestjs/common'
import { RepositoryModule } from '../../dal/repository/repository.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
    RepositoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
