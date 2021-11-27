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
  isMember?: boolean
  gender?: string
}

export const MemberDeserializer = (input: any): Member => {
  const single: Member = {
    id: input.group_admin_id ? input.group_admin_id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    email: input.email ? input.email : undefined,
    birthDate: input.birth_date,
    groupAdminId: input.group_admin_id ? input.group_admin_id : undefined,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    letterBox: input.letter_box ? input.letter_box : undefined,
    postCodeCity: LocationDeserializer({ city: input.city, postal_code: input.postal_code }),
    comment: input.comment,
    isChecked: false,
    membershipNumber: input.membership_number ? input.membership_number : undefined,
    isMember: input.is_member ? input.is_member : false,
    gender: input.gender === 'M' || input.gender === 'F' ? input.gender : '',
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
    postal_code: input.postCodeCity ? LocationSerializer(input.postCodeCity).postal_code : undefined,
    city: input.postCodeCity ? LocationSerializer(input.postCodeCity).city : undefined,
    membership_number: input.membershipNumber ? input.membershipNumber : undefined,
  }

  return single
}
