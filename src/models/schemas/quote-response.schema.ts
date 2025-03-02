import * as Joi from 'joi'
import { CURRENCY_REGEX, DECIMAL_REGEX } from '../../common/common.constants'
import { ExtractType } from '../../common/utils'

export const QuoteResponseJoiSchema = Joi.object({
  id: Joi.string().guid().required(),
  from: Joi.string().regex(CURRENCY_REGEX).required(),
  to: Joi.string().regex(CURRENCY_REGEX).required(),
  amount: Joi.string().pattern(DECIMAL_REGEX).required(),
  rate: Joi.string().pattern(DECIMAL_REGEX).required(),
  convertedAmount: Joi.string().pattern(DECIMAL_REGEX).required(),
  timestamp: Joi.string().isoDate().required(),
  expiresAt: Joi.string().isoDate().required(),
})

export type QuoteResponse = ExtractType<typeof QuoteResponseJoiSchema>
