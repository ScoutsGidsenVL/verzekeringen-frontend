import { HolderStates } from '@/enums/holderStates'
import { InsuranceTypes } from '@/enums/insuranceTypes'

export const displayCorrectTypeLabel = (type: string): string => {
  switch (type) {
    case InsuranceTypes.EENMALIGE_ACTIVITEIT:
      return 'Verzekering eenmalige activiteit'
    case InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN:
      return 'Tijdelijke verzekering niet-leden'
    case InsuranceTypes.REIS_BIJSTAND:
      return 'Reisbijstand'
    case InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING:
      return 'Tijdelijke autoverzekering'
    case InsuranceTypes.EVENEMENTEN_VERZEKERING:
      return 'Evenementenverzekering'
    case InsuranceTypes.MATERIAAL_VERZEKERING:
      return 'Materiaalverzekering'
    default:
      return 'No correct type selected'
  }
}

export const isCurrentType = (type: string, state: HolderStates): boolean => {
  if (type === state) {
    return true
  } else {
    return false
  }
}
