import { Body, Controller, Get, UseInterceptors } from '@nestjs/common'
import { JoiResponseValidationInterceptor } from '../../common/interceptors/joi-response-validation.interceptor'
import { ResponseSchema } from '../../common/decorators/response-schema.decorator'

import { AuthService } from './auth.service'
import { AuthResponse, AuthSchema, RegisterUserSchema } from '../../models/schemas/auth.schema'
import {
  PublicUserResponse,
  PublicUserSchema,
} from '../../models/schemas/public-user-response.schema'
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe'
import { RegisterUserDto } from '../../models/dtos/register-user.dto'
import { LoginDto } from '../../models/dtos/login.dto'

@Controller('auth')
@UseInterceptors(JoiResponseValidationInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @ResponseSchema(AuthSchema)
  async login(
    @Body(new JoiValidationPipe(RegisterUserSchema)) { email, password }: LoginDto,
  ): Promise<AuthResponse> {
    return this.authService.login(email, password)
  }

  @Get('register')
  @ResponseSchema(PublicUserSchema)
  async register(
    @Body(new JoiValidationPipe(RegisterUserSchema)) { name, email, password }: RegisterUserDto,
  ): Promise<PublicUserResponse> {
    return this.authService.register(email, password, name)
  }
}
