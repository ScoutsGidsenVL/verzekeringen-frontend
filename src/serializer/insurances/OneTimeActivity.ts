import { ResponsibleMember, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer } from '@/serializer/Location'
import { Group, GroupSerializer } from '@/serializer/Group'
import { Status, StatusSerializer } from '@/serializer/Status'
import { Type, TypeSerializer } from '@/serializer/Type'
export interface OneTimeActivity {
  readonly id: number
  readonly startDate: string
  readonly endDate: string
  readonly createdOn: string
  readonly comment: string
  readonly group: Group
  readonly groupAmount: number
  readonly location: Location
  readonly nature: string
  readonly responsibleMember: ResponsibleMember
  readonly status: Status
  readonly totalCost: string
  readonly type: Type
  readonly vvksComment: string
}

export const oneTimeActivityDeserializer = (input: any): OneTimeActivity => {
  const single: OneTimeActivity = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment,
    group: GroupSerializer(input.group),
    groupAmount: input.group_amount,
    location: LocationDeserializer(input.location),
    nature: input.nature,
    responsibleMember: ResponsibleMemberSerializer(input.responsible_member),
    status: StatusSerializer(input.status),
    totalCost: input.total_cost,
    type: TypeSerializer(input.type),
    vvksComment: input.vvks_comment,
  }

  return single
}

export const oneTimeActivitySerializer = (input: any): OneTimeActivity => {
  const single: OneTimeActivity = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment,
    group: GroupSerializer(input.group),
    groupAmount: input.group_amount,
    location: LocationDeserializer(input.location),
    nature: input.nature,
    responsibleMember: ResponsibleMemberSerializer(input.responsible_member),
    status: StatusSerializer(input.status),
    totalCost: input.total_cost,
    type: TypeSerializer(input.type),
    vvksComment: input.vvks_comment,
  }

  return single
}
