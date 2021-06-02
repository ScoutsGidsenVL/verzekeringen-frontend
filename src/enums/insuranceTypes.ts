import { BaseRepository } from '@/repositories/baseRepository'
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'

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
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: 'NonMemberState',
  REIS_BIJSTAND: 'REIS_BIJSTAND',
  TIJDELIJKE_AUTO_VERZEKERING: 'TIJDELIJKE_AUTO_VERZEKERING',
  EVENEMENTEN_VERZEKERING: 'EVENEMENTEN_VERZEKERING',
  MATERIAAL_VERZEKERING: 'MATERIAAL_VERZEKERING',
}

export const InsuranceTypeRepos: Record<InsuranceTypes, new (...params: any[]) => BaseRepository> = {
  EENMALIGE_ACTIVITEIT: OneTimeActivityRepository,
  TIJDELIJKE_VERZEKERING_NIET_LEDEN: OneTimeActivityRepository,
  REIS_BIJSTAND: OneTimeActivityRepository,
  TIJDELIJKE_AUTO_VERZEKERING: OneTimeActivityRepository,
  EVENEMENTEN_VERZEKERING: OneTimeActivityRepository,
  MATERIAAL_VERZEKERING: OneTimeActivityRepository,
}
