import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Country } from './Country'

export interface Victim {
  id?: string
  lastName?: string
  firstName?: string
  phoneNumber?: string
  email?: string
  birthDate?: string
  groupAdminId?: string
  street?: string
  number?: string
  letterBox?: string
  postCodeCity?: Location
  comment?: string
  isChecked?: boolean
  membershipNumber?: string
  country?: Country
  bankAccount?: string
  gender?: string
}

export const VictimDeserializer = (input: any): Victim => {
  const single: Victim = {
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

export const VictimSerializer = (input: any): any => {
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