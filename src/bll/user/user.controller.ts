import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common'
import { JoiResponseValidationInterceptor } from '../../common/interceptors/joi-response-validation.interceptor'
import {
  ArrayResponseSchema,
  ResponseSchema,
} from '../../common/decorators/response-schema.decorator'
import { UserService } from './user.service'
import {
  PublicUserArraySchema,
  PublicUserResponse,
  PublicUserSchema,
} from '../../models/schemas/public-user-response.schema'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(JoiResponseValidationInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ArrayResponseSchema(PublicUserArraySchema)
  async getAll(): Promise<PublicUserResponse[]> {
    return this.userService.getAll()
  }

  @Get(':id')
  @ResponseSchema(PublicUserSchema)
  async getById(@Param('id') id: string): Promise<PublicUserResponse> {
    return this.userService.getById(id)
  }
}
