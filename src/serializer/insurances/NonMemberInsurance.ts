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
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
    comment: input.comment ? input.comment : undefined,
    group: input.scouts_group ? GroupDeserializer(input.scouts_group) : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    status: input.status ? StatusDeserializer(input.status) : undefined,
    totalCost: input.total_cost ? input.total_cost.replace(".", ",") : undefined,
    type: input.type ? TypeDeserializer(input.type) : undefined,
    nonMembers: input.non_members ? input.non_members.map((nonMember: any) => NonMemberDeserializer(nonMember)) : undefined,
    country: input.country ? CountryDeserializer(input.country) : undefined,
    vvksComment: input.vvks_comment && input.vvks_comment.length > 0 ? input.vvks_comment : '',
  }

  return single
}

export const nonMemberInsuranceSerializer = (input: NonMemberInsurance): NonMemberInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    created_on: input.createdOn ? input.createdOn : undefined,
    comment: input.comment ? input.comment : undefined,
    group_group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    postcode_city: input.country && input.country.name !== 'België' ? undefined : input.postCodeCity ? LocationSerializer(input.postCodeCity) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    total_cost: input.totalCost ? input.totalCost : undefined,
    non_members: input.nonMembers ? input.nonMembers.map((nonMember: any) => NonMemberSerializer(nonMember)) : undefined,
    country: input.country && input.country.name !== 'België' ? CountrySerializer(input.country).id : undefined,
  }

  return single
}
