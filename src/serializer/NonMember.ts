import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface NonMember {
  readonly id?: string
  inuitsNonMemberId?: string
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber: string
  readonly birthDate: string | undefined
  readonly street: string
  readonly number: string
  readonly letterBox: string
  readonly comment: string
  readonly postCodeCity: Location
  readonly group?: string
  isChecked?: boolean
  isMember?: boolean
}

export const NonMemberDeserializer = (input: any): NonMember => {
  const single: NonMember = {
    id: input.id ? input.id : undefined,
    inuitsNonMemberId: input.inuits_non_member_id ? input.inuits_non_member_id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    birthDate: input.birth_date,
    street: input.street,
    number: input.number,
    letterBox: input.letter_box,
    comment: input.comment,
    postCodeCity: LocationDeserializer({ city: input.city, postal_code: input.postal_code }),
    isChecked: false,
  }

  return single
}

export const NonMemberSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    inuits_non_member_id: input.inuitsNonMemberId ? input.inuitsNonMemberId : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
    birth_date: input.birthDate ? input.birthDate : undefined,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postal_code: LocationSerializer(input.postCodeCity).postal_code,
    city: LocationSerializer(input.postCodeCity).city,
    group_group_admin_id: input.group ? input.group : null,
  }

  return single
}
