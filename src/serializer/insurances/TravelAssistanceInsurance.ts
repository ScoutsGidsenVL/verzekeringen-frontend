import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'
import { Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { ResponsibleMember, ResponsibleMemberDeserializer } from '@/serializer/ResponsibleMember'

export interface TravelAssistanceInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsiblePhoneNumber?: string
  readonly country?: Country
  readonly group?: Group
  readonly vehicle?: Vehicle
  readonly participants?: Member[]
  readonly responsibleMember?: ResponsibleMember
}

export const TravelAssistanceInsuranceDeserializer = (input: any): TravelAssistanceInsurance => {
  const single: TravelAssistanceInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date,
    endDate: input.end_date,
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    country: input.country ? CountryDeserializer(input.country) : undefined,
    group: GroupDeserializer(input.group),
    vehicle: VehicleDeserializer(input.vehicle),
    participants: input.participants.map((member: any) => MemberDeserializer(member)),
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
  }

  return single
}

export const TravelAssistanceInsuranceSerializer = (input: TravelAssistanceInsurance): TravelAssistanceInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    comment: input.comment,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    country: input.country ? CountrySerializer(input.country).id : undefined,
    group: GroupSerializer(input.group).name,
    vehicle: VehicleSerializer(input.vehicle),
    participants: input.participants ? input.participants.map((member: any) => MemberSerializer(member)) : undefined,
  }

  return single
}
