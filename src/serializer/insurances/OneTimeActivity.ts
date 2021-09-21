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
    groupSize: input.group_size ? (typeof input.group_size === 'object' ? GroupSizeDeserializer(input.group_size) : { id: input.group_size }) : undefined,
    location: input.location ? LocationDeserializer(input.location) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    status: input.status ? StatusDeserializer(input.status) : undefined,
    totalCost: input.total_cost ? input.total_cost.replace(".", ",") : undefined,
    type: input.type ? TypeDeserializer(input.type) : undefined,
    vvksComment: input.vvks_comment && input.vvks_comment.length > 0 ? input.vvks_comment : '',
  }

  return single
}

export const oneTimeActivitySerializer = (input: OneTimeActivity): OneTimeActivity => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    created_on: input.createdOn ? input.createdOn : undefined,
    comment: input.comment ? input.comment : undefined,
    group: input.group ? GroupSerializer(input.group).id : undefined,
    group_size: input.groupSize ? GroupSizeSerializer(input.groupSize).id : undefined,
    location: input.location ? LocationSerializer(input.location) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    total_cost: input.totalCost ? input.totalCost : undefined,
  }

  return single
}
