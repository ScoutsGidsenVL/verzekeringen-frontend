import { IS_NO_DRIVER, SelectDriver } from '@/serializer/selectDriver'
import { localize, setLocale } from '@vee-validate/i18n'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import moment from 'moment'

import { configure } from 'vee-validate'

export const defineRules = (store: any) => {
  defineRule('required', required)

  configure({
    // Generates an English message locale generator
    // https://vee-validate.logaretm.com/v4/guide/i18n#global-message-generator

    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
        },
      },
      nl: {
        messages: {
          required: 'Dit veld is verplicht',
        },
      },
    }),
  })

  setLocale('nl')

  defineRule('RequiredDrivers', (value: SelectDriver) => {
    if (value.drivers.length === 0) {
      return 'Bestuurders zijn vereist.'
    }
    return true
  })

  defineRule('RequiredVehicle', (value: any) => {
    if (value.brand === undefined || value.brand === null) {
      return 'Voertuig is vereist.'
    }
    return true
  })

  defineRule('customRequired', (value: string) => {
    const isDriverOwnerState = store.getters.getIsDriverOwnerState
    if ((value === undefined || value === '' || !value) && isDriverOwnerState === IS_NO_DRIVER) {
      return 'Dit veld mag niet leeg blijven.'
    }

    return true
  })

  defineRule('startDateBeforeEndDate', (value: string, target: any, ctx: any) => {
    const endDate: number = Number(moment(value).add(1, 'days').format('YYYYMMDD'))
    const startDate: number = Number(moment(ctx.form[target]).format('YYYYMMDD'))

    if (startDate >= endDate) {
      return 'Startdatum moet voor einddatum zijn'
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

  // @ts-ignore
  defineRule('isGroupOwnerOrOwner', (isGroupOwner: boolean, [member, nonMember]) => {
    if (isGroupOwner === false && member === undefined && nonMember === undefined) {
      return 'Gelieve een eigenaar te selecteren.'
    }
    return true
  })

  // @ts-ignore
  defineRule('checkEventDate', (endTime: string, [endDate, startDate, startTime]) => {
    const end: any = moment(endDate + 'T' + endTime + ':00.000Z')
    const start: any = moment(startDate + 'T' + startTime + ':00.000Z')
    const result = (end - start) / 1000

    if (result < 86400) {
      scrollTo()
      return 'De startdatum en einddatum mogen niet minder dan 24 uur bedragen.'
    }

    return true
  })
}

export const scrollTo = () => {
  window.scrollTo(0, 300)
}
