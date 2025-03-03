import * as Joi from 'joi'

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000).required(),
  EXPIRATION: Joi.number().required(),
  CRYPTOMKT_API_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
})
