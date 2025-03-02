import { IsInt, IsString, Matches, Min } from 'class-validator'
import { CURRENCY_REGEX } from '../../common/common.constants'

export class ConvertCurrencyDto {
  @IsInt()
  @Min(1)
  amount: number

  @IsString()
  @Matches(CURRENCY_REGEX, { message: `It's not a valid currency` })
  from: string

  @IsString()
  @Matches(CURRENCY_REGEX, { message: `It's not a valid currency` })
  to: string
}
