export interface ResponsibleMember {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly birthDate: string
  readonly email: string
  readonly membershipNumber: number
  readonly phoneNumber: string
}

export const ResponsibleMemberSerializer = (input: any): ResponsibleMember => {
  const single: ResponsibleMember = {
    id: input.id,
    firstName: input.first_name,
    lastName: input.last_name,
    birthDate: input.birth_date,
    email: input.email,
    membershipNumber: input.membership_number,
    phoneNumber: input.phone_number,
  }

  return single
}
