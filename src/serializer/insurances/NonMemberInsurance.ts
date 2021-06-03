import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { NonMember, NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Type, TypeDeserializer } from '@/serializer/Type'

export interface NonMemberInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly createdOn?: string
  readonly comment?: string
  readonly group?: Group
  readonly postCodeCity?: Location
  readonly nature?: string
  readonly responsibleMember?: ResponsibleMember
  readonly status?: Status
  readonly totalCost?: string
  readonly type?: Type
  readonly vvksComment?: string
  readonly nonMembers?: NonMember[]
  readonly country?: string
}

export const nonMemberInsuranceDeserializer = (input: any): NonMemberInsurance => {
  const single: NonMemberInsurance = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment,
    group: GroupDeserializer(input.group),
    postCodeCity: LocationDeserializer(input.postcode_city),
    nature: input.nature,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    status: StatusDeserializer(input.status),
    totalCost: input.total_cost,
    type: TypeDeserializer(input.type),
    vvksComment: input.vvks_comment,
    nonMembers: input.non_members.map((nonMember: any) => NonMemberDeserializer(nonMember)),
    country: input.country,
  }

  return single
}

export const nonMemberInsuranceSerializer = (input: NonMemberInsurance): NonMemberInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    created_on: input.createdOn,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    postcode_city: LocationSerializer(input.postCodeCity),
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
    non_members: input.nonMembers ? input.nonMembers.map((nonMember: any) => NonMemberSerializer(nonMember)) : undefined,
    country: input.country,
  }

  return single
}
