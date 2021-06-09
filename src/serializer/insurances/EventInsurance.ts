import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface EventInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsiblePhoneNumber?: string
  readonly group?: Group
  readonly nature?: string
  readonly eventSize?: string
  readonly location?: Location
  readonly totalCost?: string
}

export const EventInsuranceDeserializer = (input: any): EventInsurance => {
  const single: EventInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date,
    endDate: input.end_date,
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: GroupDeserializer(input.group),
    totalCost: input.total_cost,
    nature: input.nature,
    location: LocationDeserializer(input.location),
  }

  return single
}

export const EventInsuranceSerializer = (input: EventInsurance): EventInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    comment: input.comment,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    group: GroupSerializer(input.group).name,
    total_cost: input.totalCost,
    nature: input.nature,
    location: LocationSerializer(input.location),
  }

  return single
}
