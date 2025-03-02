import * as Joi from 'joi'

export type ExtractType<T> = T extends Joi.ObjectSchema<infer U> ? U : never
