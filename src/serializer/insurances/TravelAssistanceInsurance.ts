import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'
import { Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { ResponsibleMember, ResponsibleMemberDeserializer } from '@/serializer/ResponsibleMember'
import moment from 'moment'

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
  totalCost?: string
}

export const TravelAssistanceInsuranceDeserializer = (input: any): TravelAssistanceInsurance => {
  const single: TravelAssistanceInsurance = {
    id: input.id ? input.id : undefined,
    startDate: moment(input.start_date).format('YYYY-MM-DD'),
    endDate: moment(input.end_date).format('YYYY-MM-DD'),
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    country: input.country ? CountryDeserializer(input.country) : undefined,
    group: GroupDeserializer(input.group),
    vehicle: input.vehicle && input.vehicle.license_plate ? VehicleDeserializer(input.vehicle) : undefined,
    participants: input.participants.map((member: any) => MemberDeserializer(member)),
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    totalCost: input.total_cost,
  }

  return single
}

export const TravelAssistanceInsuranceSerializer = (input: TravelAssistanceInsurance): TravelAssistanceInsurance => {
  const single: any = {
    start_date: moment(input.startDate).format('YYYY-MM-DDTh:mm:ss'),
    end_date: moment(input.endDate).format('YYYY-MM-DDTh:mm:ss'),
    comment: input.comment,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    country: input.country ? CountrySerializer(input.country).id : undefined,
    group: GroupSerializer(input.group).name,
    vehicle: input.vehicle && input.vehicle.licensePlate ? VehicleSerializer(input.vehicle) : undefined,
    participants: input.participants ? input.participants.map((member: any) => MemberSerializer(member)) : undefined,
    total_cost: input.totalCost,
  }

  return single
}
