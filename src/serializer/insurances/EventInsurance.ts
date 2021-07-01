import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { EventSize, EventSizeDeserializer, EventSizeSerializer } from '@/serializer/EventSize'
import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import moment from 'moment'

export interface EventInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly startTime?: string
  readonly endDate?: string
  readonly endTime?: string
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
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    startTime: input.start_date ? moment(input.start_date).format('HH:mm') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    endTime: input.end_date ? moment(input.end_date).format('HH:mm') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: input.group ? GroupDeserializer(input.group) : undefined,
    totalCost: input.total_cost ? input.total_cost : undefined,
    nature: input.nature ? input.nature : undefined,
    location: input.location ? LocationDeserializer(input.location) : undefined,
    eventSize: input.event_size ? (typeof input.event_size === 'object' ? EventSizeDeserializer(input.event_size) : { id: input.event_size }) : undefined,
  }

  return single
}

export const EventInsuranceSerializer = (input: EventInsurance): EventInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate + 'T' + input.startTime).format() : undefined,
    end_date: input.endDate ? moment(input.endDate + 'T' + input.endTime).format() : undefined,
    comment: input.comment ? input.comment : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    group: input.group ? GroupSerializer(input.group).id : undefined,
    total_cost: input.totalCost ? input.totalCost : undefined,
    nature: input.nature ? input.nature : undefined,
    location: input.location ? LocationSerializer(input.location) : undefined,
    event_size: input.eventSize ? EventSizeSerializer(input.eventSize).id : undefined,
  }

  return single
}
