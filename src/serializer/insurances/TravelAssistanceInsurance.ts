import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { Country, CountryDeserializer, CountrySerializer } from '../Country'

export interface TravelAssistanceInsurance {
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
  readonly participants?: Member[]
  readonly country?: Country
}

export const TravelAssistanceInsuranceDeserializer = (input: any): TravelAssistanceInsurance => {
  const single: TravelAssistanceInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date,
    endDate: input.end_date,
    createdOn: input.created_on,
    comment: input.comment ? input.comment : undefined,
    group: GroupDeserializer(input.group),
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    nature: input.nature,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    status: StatusDeserializer(input.status),
    totalCost: input.total_cost,
    type: TypeDeserializer(input.type),
    vvksComment: input.vvks_comment,
    participants: input.participants.map((member: any) => MemberDeserializer(member)),
    country: input.country ? CountryDeserializer(input.country) : undefined,
  }

  return single
}

export const TravelAssistanceInsuranceSerializer = (input: TravelAssistanceInsurance): TravelAssistanceInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    created_on: input.createdOn,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    postcode_city: input.country ? undefined : LocationSerializer(input.postCodeCity),
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
    participants: input.participants ? input.participants.map((member: any) => MemberSerializer(member)) : undefined,
    country: input.country ? CountrySerializer(input.country).id : undefined,
  }

  return single
}
