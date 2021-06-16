import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { GroupSize, GroupSizeDeserializer, GroupSizeSerializer } from '@/serializer/GroupSize'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'

export interface MaterialInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly createdOn?: string
  readonly comment?: string
  readonly group?: Group
  readonly groupSize?: GroupSize
  readonly nature?: string
  readonly responsibleMember?: ResponsibleMember
  readonly status?: Status
  totalCost?: string
  readonly type?: Type
  readonly vvksComment?: string
  readonly country?: Country
  readonly postCodeCity?: Location
}

export const MaterialInsuranceDeserializer = (input: any): MaterialInsurance => {
  const single: MaterialInsurance = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment,
    group: GroupDeserializer(input.group),
    groupSize: GroupSizeDeserializer(input.group_size),
    nature: input.nature,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    status: StatusDeserializer(input.status),
    totalCost: input.total_cost,
    type: TypeDeserializer(input.type),
    vvksComment: input.vvks_comment,
    country: input.country ? CountryDeserializer(input.country) : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
  }

  return single
}

export const MaterialInsuranceSerializer = (input: MaterialInsurance): MaterialInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    created_on: input.createdOn,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    group_size: GroupSizeSerializer(input.groupSize).id,
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
    country: input.country && input.country.name !== 'België' ? CountrySerializer(input.country).id : undefined,
    postcode_city: input.country && input.country.name !== 'België' ? undefined : LocationSerializer(input.postCodeCity),
  }

  return single
}
