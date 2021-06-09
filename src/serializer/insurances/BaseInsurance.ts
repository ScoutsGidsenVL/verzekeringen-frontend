import { ResponsibleMember } from '../ResponsibleMember'
import { Group } from '@/serializer/Group'
import { Coverage } from '@/serializer/Coverage'

export interface BaseInsurance {
  startDate?: string
  endDate?: string
  group?: Group
  responsibleMember?: ResponsibleMember
  totalCost?: string
  insuranceOptions?: Array<number>
  maxCoverage?: Coverage
}
