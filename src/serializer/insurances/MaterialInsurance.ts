import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'
import { Equipment, EquipmentDeserializer, EquipmentSerializerToPostInsurance } from '@/serializer/Equipment'
import moment from 'moment'

export interface MaterialInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly group?: Group
  readonly nature?: string
  readonly responsibleMember?: ResponsibleMember
  readonly status?: Status
  totalCost?: string
  readonly type?: Type
  readonly vvksComment?: string
  readonly country?: Country
  readonly postCodeCity?: Location
  readonly equipment?: Equipment[]
}

export const MaterialInsuranceDeserializer = (input: any): MaterialInsurance => {
  const single: MaterialInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    comment: input.comment ? input.comment : undefined,
    group: input.scouts_group ? GroupDeserializer(input.scouts_group) : undefined,
    nature: input.nature ? input.nature : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    status: input.status ? StatusDeserializer(input.status) : undefined,
    totalCost: input.total_cost ? input.total_cost.replace(".", ",") : undefined,
    type: input.type ? TypeDeserializer(input.type) : undefined,
    vvksComment: input.vvks_comment && input.vvks_comment.length > 0 ? input.vvks_comment : '',
    country: input.country ? CountryDeserializer(input.country) : undefined,
    postCodeCity: LocationDeserializer({ city: input.city, postal_code: input.postal_code }),
    equipment: input.equipment ? input.equipment.map((equipment: any) => EquipmentDeserializer(equipment)) : undefined,
  }

  return single
}

export const MaterialInsuranceSerializer = (input: MaterialInsurance): MaterialInsurance => {
  console.log("MATERIAL INSURANCE SERIALIZER INPUT: ", input)
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    comment: input.comment ? input.comment : undefined,
    group_group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    nature: input.nature ? input.nature : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    country: input.country && input.country.name !== 'België' ? CountrySerializer(input.country).id : undefined,
    postal_code: input.postCodeCity ? LocationSerializer(input.postCodeCity).postal_code : undefined,
    city: input.postCodeCity ? LocationSerializer(input.postCodeCity).city : undefined,
    equipment: input.equipment ? input.equipment.map((equipment: any) => EquipmentSerializerToPostInsurance(equipment)) : undefined,
  }
  console.log("MATERIAL INSURANCE SERIALIZER OUTPUT: ", single)

  return single
}
