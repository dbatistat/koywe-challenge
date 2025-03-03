import * as Joi from 'joi'
import { ExtractType } from '../../common/utils'

export const AuthSchema = Joi.object({
  id: Joi.string().uuid().required(), // Asumiendo que el ID es un UUID
  email: Joi.string().email().required(),
  name: Joi.string().min(1).required(),
  token: Joi.string().required(),
  createdAt: Joi.date().iso().required(),
})

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
})

export const RegisterUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
})

export type AuthResponse = ExtractType<typeof AuthSchema>
