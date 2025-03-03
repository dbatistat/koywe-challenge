import * as Joi from 'joi'
import { ExtractType } from '../../common/utils'

export const PublicUserSchema = Joi.object({
  id: Joi.string().uuid().required(), // Asumiendo que el ID es un UUID
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  createdAt: Joi.date().iso().required(),
})

export const PublicUserArraySchema = Joi.array().items(PublicUserSchema)

export type PublicUserResponse = ExtractType<typeof PublicUserSchema>
