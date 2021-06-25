import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { GroupSize, GroupSizeDeserializer, GroupSizeSerializer } from '../GroupSize'
import moment from 'moment'

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
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    comment: input.comment ? input.comment : undefined,
    group: input.group ? GroupDeserializer(input.group) : undefined,
    groupSize: input.group_size ? GroupSizeDeserializer(input.group_size) : undefined,
    location: input.location ? LocationDeserializer(input.location) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    status: input.status ? StatusDeserializer(input.status) : undefined,
    totalCost: input.total_cost ? input.total_cost : undefined,
    type: input.type ? TypeDeserializer(input.type) : undefined,
    vvksComment: input.vvks_comment ? input.vvks_comment : undefined,
  }

  return single
}

export const oneTimeActivitySerializer = (input: OneTimeActivity): OneTimeActivity => {
  const single: any = {
    start_date: moment(input.startDate).format('YYYY-MM-DDTh:mm:ss'),
    end_date: moment(input.endDate).format('YYYY-MM-DDTh:mm:ss'),
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
