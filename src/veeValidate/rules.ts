import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import moment from 'moment'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'

export const defineRules = (store: any) => {
  defineRule('required', required)

  defineRule('startDateBeforeEndDate', (value: string, target: any, ctx: any) => {
    const endDate: number = Number(moment(value).format('YYYYMMDD'))
    const startDate: number = Number(moment(ctx.form[target]).format('YYYYMMDD'))
    if (startDate >= endDate) {
      return 'Start datum moet voor eind datum zijn'
    }

    return true
  })

  defineRule('maximumDateTerm', (value: string, target: any, ctx: any) => {
    const insuranceTypeState = store.getters.insuranceTypeState
    const endDate = moment(value)
    const startDate = moment(ctx.form[target])
    const diff = endDate.diff(startDate, 'days')

    if (insuranceTypeState === InsuranceTypes.EENMALIGE_ACTIVITEIT && diff > 4) {
      return 'Deze verzekering heeft een maximumtermijn van 5 dagen.'
    }

    if (insuranceTypeState === InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN && diff > 30) {
      return 'Deze verzekering heeft een maximumtermijn van 31 dagen.'
    }

    if (insuranceTypeState === InsuranceTypes.EVENEMENTEN_VERZEKERING && diff > 29) {
      return 'Deze verzekering heeft een maximumtermijn van 30 dagen.'
    }

    if (insuranceTypeState === InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING && diff > 29) {
      return 'Deze verzekering heeft een maximumtermijn van 30 dagen.'
    }
    return true
  })
}
