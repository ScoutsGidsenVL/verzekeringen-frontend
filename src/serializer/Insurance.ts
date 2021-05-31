import { ResponsibleMember, ResponsibleMemberDeserializer } from '@/serializer/ResponsibleMember'
import { Group, GroupDeserializer } from '@/serializer/Group'
import { Status, StatusDeserializer } from '@/serializer/Status'
import { Type, TypeDeserializer } from '@/serializer/Type'

export interface Insurance {
  readonly id: number
  readonly startDate: string
  readonly endDate: string
  readonly responsibleMember: ResponsibleMember
  readonly group: Group
  readonly status: Status
  readonly type: Type
}

export const insuranceDeserializer = (input: any): Insurance => {
  const single: Insurance = {
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

export const insuranceSerializer = (input: any): Insurance => {
  const single: Insurance = {
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
