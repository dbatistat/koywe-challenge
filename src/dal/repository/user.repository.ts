import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserEntity } from '../../models/entities/user.entity'
import { CreateUserEntity } from '../type/auth-repository.type'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserEntity: CreateUserEntity): Promise<UserEntity> {
    const { email, password, name } = createUserEntity
    const result = await this.prisma.user.create({
      data: { email, password, name },
    })

    return result
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const result = await this.prisma.user.findUnique({ where: { email } })

    return result
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.prisma.user.findMany()
  }

  async getById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }
}
