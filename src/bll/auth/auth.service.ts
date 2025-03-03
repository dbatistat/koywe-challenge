import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from '../../dal/repository/user.repository'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Auth } from './types/auth.type'
import { PublicUser } from '../user/types/user.type'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundException(`User doesn't exist with email: ${email}`)
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const { password: _, ...rest } = user

    const token = this.jwtService.sign({ id: user.id, email: user.email })
    console.log({ token })
    return {
      ...rest,
      token,
    }
  }

  async register(email: string, password: string, name: string): Promise<PublicUser> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userCreated = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    })

    const { password: _, ...rest } = userCreated

    return rest
  }
}
