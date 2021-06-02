import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface NonMember {
  readonly id: number
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber: string
  readonly birthDate: string
  readonly street: string
  readonly number: string
  readonly letterBox: string
  readonly comment: string
  readonly postCodeCity: Location
  readonly group: string
}

export const NonMemberDeserializer = (input: any): NonMember => {
  const single: NonMember = {
    id: input.id,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number,
    birthDate: input.birth_date,
    street: input.street,
    number: input.number,
    letterBox: input.letter_box,
    comment: input.comment,
    postCodeCity: LocationDeserializer(input.postcode_city),
    group: input.group,
  }

  return single
}

export const NonMemberSerializer = (input: any): any => {
  const single: any = {
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber,
    birth_date: input.birthDate,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postcode_city: LocationSerializer(input.postCodeCity),
    group: input.group,
  }

  return single
}
