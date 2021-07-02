import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface Member {
  readonly id?: string
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber?: string
  readonly email?: string
  birthDate?: string
  readonly groupAdminId?: string
  readonly street?: string
  readonly number?: string
  readonly letterBox?: string
  readonly postCodeCity?: Location
  readonly comment?: string
  isChecked?: boolean
  readonly membershipNumber?: string
}

export const MemberDeserializer = (input: any): Member => {
  const single: Member = {
    id: input.id ? input.id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    email: input.email ? input.email : undefined,
    birthDate: input.birth_date,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    letterBox: input.letter_box ? input.letter_box : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    comment: input.comment,
    isChecked: false,
    membershipNumber: input.membership_number ? input.membership_number : undefined,
  }

  return single
}

export const MemberSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
    email: input.email ? input.email : undefined,
    birth_date: input.birthDate,
    group_admin_id: input.groupAdminId ? input.groupAdminId : undefined,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    group: input.group ? input.group : null,
    comment: input.comment ? input.comment : undefined,
    postcode_city: input.postCodeCity ? LocationSerializer(input.postCodeCity) : undefined,
    membership_number: input.membershipNumber ? input.membershipNumber : undefined,
  }

  return single
}
