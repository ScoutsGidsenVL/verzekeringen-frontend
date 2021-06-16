import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Type, TypeDeserializer } from '@/serializer/Type'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'
import { Equipment, EquipmentDeserializer, EquipmentSerializer } from '@/serializer/Equipment'

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
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    comment: input.comment,
    group: GroupDeserializer(input.group),
    nature: input.nature,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    status: StatusDeserializer(input.status),
    totalCost: input.total_cost,
    type: TypeDeserializer(input.type),
    vvksComment: input.vvks_comment,
    country: input.country ? CountryDeserializer(input.country) : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    equipment: input.equipment ? input.equipment.map((equipment: any) => EquipmentDeserializer(equipment)) : undefined, 
  }

  return single
}

export const MaterialInsuranceSerializer = (input: MaterialInsurance): MaterialInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    comment: input.comment,
    group: GroupSerializer(input.group).name,
    nature: input.nature,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    total_cost: input.totalCost,
    country: input.country && input.country.name !== 'België' ? CountrySerializer(input.country).id : undefined,
    postcode_city: input.country && input.country.name !== 'België' ? undefined : LocationSerializer(input.postCodeCity),
    equipment: input.equipment ? input.equipment.map((equipment: any) => EquipmentSerializer(equipment)) : undefined,
  }

  return single
}
