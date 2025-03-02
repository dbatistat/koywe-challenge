import * as Joi from 'joi'

import { CURRENCY_REGEX } from '../../common/common.constants'

export const CreateQuoteJoiSchema = Joi.object({
  amount: Joi.number().integer().min(1).required(),
  from: Joi.string().regex(CURRENCY_REGEX).required(),
  to: Joi.string().regex(CURRENCY_REGEX).required(),
})
