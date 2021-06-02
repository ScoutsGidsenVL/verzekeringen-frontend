import { InsuranceTypes } from '@/enums/insuranceTypes'
import moment from 'moment'

export const formatDate = (startDate: string, endDate: string): string => {
  return moment(startDate).format('DD MMM YYYY') + ' - ' + moment(endDate).format('DD MMM YYYY')
}

export const dateRuleToInsuranceType = (name: string, insuranceTypeState: InsuranceTypes): string => {
  switch (insuranceTypeState) {
    case InsuranceTypes.EENMALIGE_ACTIVITEIT:
      return 'required|startDateBeforeEndDate:' + name + '|maximumDateTermOneTimeActivity:' + name

    case InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN:
      return 'required|startDateBeforeEndDate:' + name + '|maximumDateTermNonMember:' + name

    default:
      return 'required|startDateBeforeEndDate:' + name + '|maximumDateTermOneTimeActivity:' + name
  }
}
