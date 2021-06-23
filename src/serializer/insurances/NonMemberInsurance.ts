import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { NonMember, NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { Country, CountryDeserializer, CountrySerializer } from '../Country'
import moment from 'moment'

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
  totalCost?: string
  readonly type?: Type
  readonly vvksComment?: string
  readonly nonMembers?: NonMember[]
  readonly country?: Country
}

export const nonMemberInsuranceDeserializer = (input: any): NonMemberInsurance => {
  const single: NonMemberInsurance = {
    id: input.id ? input.id : undefined,
    startDate: moment(input.start_date).format('YYYY-MM-DD'),
    endDate: moment(input.end_date).format('YYYY-MM-DD'),
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
    nonMembers: input.non_members.map((nonMember: any) => NonMemberDeserializer(nonMember)),
    country: input.country ? CountryDeserializer(input.country) : undefined,
  }

  return single
}

export const nonMemberInsuranceSerializer = (input: NonMemberInsurance): NonMemberInsurance => {
  const single: any = {
    start_date: moment(input.startDate).format('YYYY-MM-DDTh:mm:ss'),
    end_date: moment(input.endDate).format('YYYY-MM-DDTh:mm:ss'),
    created_on: input.createdOn,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    postcode_city: input.country && input.country.name !== 'België' ? undefined : LocationSerializer(input.postCodeCity),
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
    non_members: input.nonMembers ? input.nonMembers.map((nonMember: any) => NonMemberSerializer(nonMember)) : undefined,
    country: input.country && input.country.name !== 'België' ? CountrySerializer(input.country).id : undefined,
  }

  return single
}
