import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import moment from 'moment'

export const defineRules = () => {
  defineRule('required', required)

  defineRule('startDateBeforeEndDate', (value: string, target: any, ctx: any) => {
    const endDate: number = Number(moment(value).format('YYYYMMDD'))
    const startDate: number = Number(moment(ctx.form[target]).format('YYYYMMDD'))
    if (startDate >= endDate) {
      return 'Start datum moet voor eind datum zijn'
    }

    return true
  })

  defineRule('maximumDateTermOneTimeActivity', (value: string, target: any, ctx: any) => {
    const endDate = moment(value)
    const startDate = moment(ctx.form[target])
    const diff = endDate.diff(startDate, 'days')
    if (diff > 4) {
      return 'Deze verzekering heeft een maximumtermijn van 5 dagen.'
    }
    return true
  })
}
