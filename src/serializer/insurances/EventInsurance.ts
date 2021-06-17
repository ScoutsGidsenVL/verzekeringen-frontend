import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { EventSize, EventSizeDeserializer, EventSizeSerializer } from '@/serializer/EventSize'
import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import moment from 'moment'

export interface EventInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsibleMember?: ResponsibleMember
  readonly responsiblePhoneNumber?: string
  readonly group?: Group
  readonly nature?: string
  readonly eventSize?: EventSize
  readonly location?: Location
  totalCost?: string
}

export const EventInsuranceDeserializer = (input: any): EventInsurance => {
  const single: EventInsurance = {
    id: input.id ? input.id : undefined,
    startDate: moment(input.start_date).format('YYYY-MM-DD'),
    endDate: moment(input.end_date).format('YYYY-MM-DD'),
    comment: input.comment ? input.comment : undefined,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: GroupDeserializer(input.group),
    totalCost: input.total_cost,
    nature: input.nature,
    location: LocationDeserializer(input.location),
    eventSize: input.event_size ? EventSizeDeserializer(input.event_size) : undefined,
  }

  return single
}

export const EventInsuranceSerializer = (input: EventInsurance): EventInsurance => {
  const single: any = {
    start_date: moment(input.startDate).format(),
    end_date: moment(input.endDate).format(),
    comment: input.comment,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    group: GroupSerializer(input.group).name,
    total_cost: input.totalCost,
    nature: input.nature,
    location: LocationSerializer(input.location),
    event_size: input.eventSize ? EventSizeSerializer(input.eventSize).value : undefined,
  }

  return single
}
