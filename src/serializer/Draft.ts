import { ResponsibleMember, ResponsibleMemberDeserializer } from '@/serializer/ResponsibleMember'
import { Group, GroupDeserializer } from '@/serializer/Group'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Type, TypeDeserializer } from '@/serializer/Type'

export interface Draft {
  readonly id: number
  readonly startDate: string
  readonly endDate: string
  readonly responsibleMember: ResponsibleMember | undefined
  readonly group: Group | undefined
  readonly status: Status | undefined
  readonly type: Type | undefined
  readonly createdOn: string
}

export const draftDeserializer = (input: any): Draft => {
  const single: Draft = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    group: input.scouts_group ? GroupDeserializer(input.scouts_group) : undefined,
    status: input.status ? StatusDeserializer({ label: input.status }) : StatusDeserializer({ label: 'draft' }),
    type: input.type ? TypeDeserializer(input.type) : undefined,
    createdOn: input.created_on ? input.created_on : undefined,
  }
  return single
}

export const draftSerializer = (input: any): Draft => {
  const single: any = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
    group: GroupDeserializer(input.group),
    status: StatusDeserializer(input.status),
    type: TypeDeserializer(input.type),
  }

  return single
}
