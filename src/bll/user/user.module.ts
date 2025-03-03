import { Module } from '@nestjs/common'
import { ConfigModule } from '../../config/config.module'
import { RepositoryModule } from '../../dal/repository/repository.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [ConfigModule, RepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
