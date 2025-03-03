import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../../dal/repository/user.repository'
import { PublicUser } from './types/user.type'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string): Promise<PublicUser> {
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new NotFoundException(`User doesn't exist with id: ${id}`)
    }

    const { password, ...rest } = user

    return rest
  }

  async getAll(): Promise<PublicUser[]> {
    const users = await this.userRepository.getUsers()

    return users.map((user) => {
      const { password, ...rest } = user
      return rest
    })
  }
}
