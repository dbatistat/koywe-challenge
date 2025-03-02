import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { Reflector } from '@nestjs/core'
import * as Joi from 'joi'

@Injectable()
export class JoiResponseValidationInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const schema = this.reflector.get<Joi.ObjectSchema>('response-schema', context.getHandler())

    if (!schema) {
      return next.handle()
    }

    return next.handle().pipe(
      tap((response) => {
        const { error } = schema.validate(response)
        if (error) {
          throw new BadRequestException('Response validation failed: ' + error.message)
        }
      }),
    )
  }
}
