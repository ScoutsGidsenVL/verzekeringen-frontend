import { BaseRepository } from '@/repositories/baseRepository'
import { NonMemberInsuranceRepository } from '@/repositories/insurances/nonMemberInsuranceRepository'
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import { TravelAssistanceRepository } from '@/repositories/insurances/travelAssistanceRepository'

export enum InsuranceTypes {
  EENMALIGE_ACTIVITEIT = 'EENMALIGE_ACTIVITEIT',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN = 'TIJDELIJKE_VERZEKERING_NIET_LEDEN',
  REIS_BIJSTAND = 'REIS_BIJSTAND',
  TIJDELIJKE_AUTO_VERZEKERING = 'TIJDELIJKE_AUTO_VERZEKERING',
  EVENEMENTEN_VERZEKERING = 'EVENEMENTEN_VERZEKERING',
  MATERIAAL_VERZEKERING = 'MATERIAAL_VERZEKERING',
}

export const InsuranceTypeStoreNames: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: 'oneTimeActivityState',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'nonMemberState',
  REIS_BIJSTAND: 'travelAssistanceState',
  TIJDELIJKE_AUTO_VERZEKERING: 'TIJDELIJKE_AUTO_VERZEKERING',
  EVENEMENTEN_VERZEKERING: 'EVENEMENTEN_VERZEKERING',
  MATERIAAL_VERZEKERING: 'MATERIAAL_VERZEKERING',
}

export const InsuranceTypeStoreSetters: Record<InsuranceTypes, string> = {
  EENMALIGE_ACTIVITEIT: 'setOneTimeActivityState',
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'setNonMemberState',
  REIS_BIJSTAND: 'setTravelAssistanceState',
  TIJDELIJKE_AUTO_VERZEKERING: 'TIJDELIJKE_AUTO_VERZEKERING',
  EVENEMENTEN_VERZEKERING: 'EVENEMENTEN_VERZEKERING',
  MATERIAAL_VERZEKERING: 'MATERIAAL_VERZEKERING',
}

export const InsuranceTypeRepos: Record<InsuranceTypes, new (...params: any[]) => BaseRepository> = {
  EENMALIGE_ACTIVITEIT: OneTimeActivityRepository,
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: NonMemberInsuranceRepository,
  REIS_BIJSTAND: TravelAssistanceRepository,
  TIJDELIJKE_AUTO_VERZEKERING: OneTimeActivityRepository,
  EVENEMENTEN_VERZEKERING: OneTimeActivityRepository,
  MATERIAAL_VERZEKERING: OneTimeActivityRepository,
}
