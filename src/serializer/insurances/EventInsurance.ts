import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '../ResponsibleMember'
import { EventSize, EventSizeDeserializer, EventSizeSerializer } from '@/serializer/EventSize'
import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { FileDeserializer, FileItem } from '../FileItem'
import { Status, StatusDeserializer } from '../Status'
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
  readonly vvksComment?: string
  status?: Status
  participant_list_file?: FileItem
}

export const EventInsuranceDeserializer = (input: any): EventInsurance => {
  console.log('INPUT: ', input)
  const single: EventInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    startTime: input.start_date ? moment(input.start_date).format('HH:mm') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    endTime: input.end_date ? moment(input.end_date).format('HH:mm') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: input.scouts_group ? GroupDeserializer(input.scouts_group) : undefined,
    totalCost: input.total_cost ? input.total_cost.toString().replace(".", ",") : undefined,
    nature: input.nature ? input.nature : undefined,
    location: input.city && input.postal_code ? LocationDeserializer({ city: input.city, postal_code: input.postal_code }) : undefined,
    eventSize: input.event_size ? (typeof input.event_size === 'object' ? EventSizeDeserializer(input.event_size) : { id: input.event_size }) : undefined,
    vvksComment: input.vvksm_comment && input.vvksm_comment.length > 0 ? input.vvksm_comment : '',
    status: input.status ? StatusDeserializer(input.status) : undefined,
    participant_list_file: input.participant_list_file ? FileDeserializer(input.participant_list_file) : undefined
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
    group_group_admin_id: input.group ? GroupSerializer(input.group).id : undefined,
    scouts_group: input.group ? GroupSerializer(input.group) : undefined, // DRAFT
    total_cost: input.totalCost ? input.totalCost : undefined,
    nature: input.nature ? input.nature : undefined,
    postal_code: input.location ? LocationSerializer(input.location).postal_code : undefined,
    city: input.location ? LocationSerializer(input.location).city : undefined,
    event_size: input.eventSize ? EventSizeSerializer(input.eventSize).id : undefined,
    vvksm_comment: input.vvksComment ? input.vvksComment : undefined
  }

  return single
}
