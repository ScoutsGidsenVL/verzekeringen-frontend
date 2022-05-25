import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'
import { DraftVehicleSerializer, Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { ResponsibleMember, ResponsibleMemberDeserializer } from '@/serializer/ResponsibleMember'
import moment from 'moment'

export interface TravelAssistanceInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsiblePhoneNumber?: string
  country?: Country
  readonly group?: Group
  readonly vehicle?: Vehicle
  readonly participants?: Member[]
  readonly responsibleMember?: ResponsibleMember
  totalCost?: string
  readonly vvksComment?: string
  forbiddenCountriesVehicle?: Array<Country>
}

export const TravelAssistanceInsuranceDeserializer = (input: any): TravelAssistanceInsurance => {
  const single: TravelAssistanceInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    // country: input.country ? CountryDeserializer(input.country) : undefined, USED TO BE LIKE THIS...
    country: input.country ? input.country.toString() : undefined,
    group: input.scouts_group ? GroupDeserializer(input.scouts_group) : undefined,
    vehicle: input.vehicle && input.vehicle.license_plate ? VehicleDeserializer(input.vehicle) : undefined,
    participants: input.participants ? input.participants.map((member: any) => MemberDeserializer(member)) : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    totalCost: input.total_cost ? input.total_cost.toString().replace(".", ",") : undefined,
    vvksComment: input.vvksm_comment && input.vvksm_comment.length > 0 ? input.vvksm_comment : '',
  }

  return single
}

export const TravelAssistanceInsuranceSerializer = (input: TravelAssistanceInsurance): TravelAssistanceInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    country: input.country ? CountrySerializer(input.country).id : undefined,
    group_group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    vehicle: input.vehicle && input.vehicle.licensePlate ? VehicleSerializer(input.vehicle) : undefined,
    participants: input.participants ? input.participants.map((member: any) => MemberSerializer(member)) : undefined,
    total_cost: input.totalCost ? input.totalCost : undefined,
    vvksm_comment: input.vvksComment ? input.vvksComment : undefined
  }

  return single
}

export const DraftTravelAssistanceInsuranceSerializer = (input: TravelAssistanceInsurance): TravelAssistanceInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    country: input.country ? CountrySerializer(input.country) : undefined,
    group: input.group ? GroupSerializer(input.group).id : undefined,
    scouts_group: input.group ? GroupSerializer(input.group) : undefined, // DRAFT
    vehicle: input.vehicle && input.vehicle.licensePlate ? DraftVehicleSerializer(input.vehicle) : undefined,
    participants: input.participants ? input.participants.map((member: any) => MemberSerializer(member)) : undefined,
    total_cost: input.totalCost ? input.totalCost : undefined,
    vvksm_comment: input.vvksComment ? input.vvksComment : undefined
  }

  return single
}
