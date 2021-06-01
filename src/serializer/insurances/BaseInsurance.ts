import { ResponsibleMember } from '../ResponsibleMember'
import { Group } from '@/serializer/Group'

export interface BaseInsurance {
  startDate?: string
  endDate?: string
  group?: Group
  responsibleMember?: ResponsibleMember
  totalCost?: string
}
