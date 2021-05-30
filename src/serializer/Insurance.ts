import { ResponsibleMember, ResponsibleMemberSerializer } from '@/serializer/ResponsibleMember'
import { Group, GroupSerializer } from '@/serializer/Group'
import { Status, StatusSerializer } from '@/serializer/Status'
import { Type, TypeSerializer } from '@/serializer/Type'

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
    responsibleMember: ResponsibleMemberSerializer(input.responsible_member),
    group: GroupSerializer(input.group),
    status: StatusSerializer(input.status),
    type: TypeSerializer(input.type),
  }

  return single
}

export const insuranceSerializer = (input: any): Insurance => {
  const single: Insurance = {
    id: input.id,
    startDate: input.start_date,
    endDate: input.end_date,
    responsibleMember: ResponsibleMemberSerializer(input.responsible_member),
    group: GroupSerializer(input.group),
    status: StatusSerializer(input.status),
    type: TypeSerializer(input.type),
  }

  return single
}
