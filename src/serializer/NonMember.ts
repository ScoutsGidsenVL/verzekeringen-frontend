import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface NonMember {
  readonly id?: string
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
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    birthDate: input.birth_date,
    street: input.street,
    number: input.number,
    letterBox: input.letter_box,
    comment: input.comment,
    postCodeCity: LocationDeserializer(input.postcode_city),
    isChecked: false,
  }

  return single
}

export const NonMemberSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
    birth_date: input.birthDate ? input.birthDate : undefined,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postcode_city: LocationSerializer(input.postCodeCity),
    group: input.group ? input.group : null,
  }

  return single
}
