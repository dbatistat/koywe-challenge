import { SetMetadata } from '@nestjs/common'
import * as Joi from 'joi'

export const ResponseSchema = (schema: Joi.ObjectSchema) => SetMetadata('response-schema', schema)
export const ArrayResponseSchema = (schema: Joi.ArraySchema) =>
  SetMetadata('response-schema', schema)
