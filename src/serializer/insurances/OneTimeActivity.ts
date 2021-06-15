import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { GroupSize, GroupSizeDeserializer, GroupSizeSerializer } from '../GroupSize'
export interface OneTimeActivity {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly createdOn?: string
  readonly comment?: string
  readonly group?: Group
  readonly groupSize?: GroupSize
  readonly location?: Location
  readonly nature?: string
  readonly responsibleMember?: ResponsibleMember
  readonly status?: Status
  totalCost?: string
  readonly type?: Type
  readonly vvksComment?: string
}

export const oneTimeActivityDeserializer = (input: any): OneTimeActivity => {
  const single: OneTimeActivity = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment,
    group: GroupDeserializer(input.group),
    groupSize: GroupSizeDeserializer(input.group_size),
    location: LocationDeserializer(input.location),
    nature: input.nature,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    status: StatusDeserializer(input.status),
    totalCost: input.total_cost,
    type: TypeDeserializer(input.type),
    vvksComment: input.vvks_comment,
  }

  return single
}

export const oneTimeActivitySerializer = (input: OneTimeActivity): OneTimeActivity => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    created_on: input.createdOn,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    group_size: GroupSizeSerializer(input.groupSize).id,
    location: LocationSerializer(input.location),
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
  }

  return single
}
