import { Group, GroupDeserializer } from './Group'

export interface ResponsibleMember {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly birthDate: string
  readonly email: string
  readonly membershipNumber: number
  readonly phoneNumber: string
  readonly scoutsGroups: Group[]
}

export const ResponsibleMemberDeserializer = (input: any): ResponsibleMember => {
  const single: ResponsibleMember = {
    id: input.id,
    firstName: input.first_name,
    lastName: input.last_name,
    birthDate: input.birth_date,
    email: input.email,
    membershipNumber: input.membership_number,
    phoneNumber: input.phone_number,
    scoutsGroups: input.scouts_groups.map((group: any) => GroupDeserializer(group)),
  }

  return single
}

export const ResponsibleMemberSerializer = (input: any): any => {
  const single: any = {
    first_name: input.firstName,
    last_name: input.lastName,
    birth_date: input.birthDate,
    email: input.email,
    membership_number: input.membershipNumber,
    responsible_phone_number: input.phoneNumber ? input.phoneNumber : undefined,
  }

  return single
}
