import { LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Member } from '@/serializer/Member'

export interface Driver extends Member {}

export const DriverDeserializer = (input: any): Driver => {
  const single: Driver = {
    id: input.id ? input.id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    email: input.email ? input.email : undefined,
    birthDate: input.birth_date,
    groupAdminId: input.group_admin_id,
    street: input.addresses && input.addresses[0].street ? input.addresses[0].street : undefined,
    number: input.addresses && input.addresses[0].number ? input.addresses[0].number : undefined,
    letterBox: input.letter_box ? input.letter_box : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    comment: input.comment,
    isChecked: false,
  }

  return single
}

export const DriverSerializer = (input: any): any => {
  const single: any = {
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
    birth_date: input.birthDate,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    comment: input.comment ? input.comment : undefined,
    postcode_city: input.postCodeCity ? LocationSerializer(input.postCodeCity) : undefined,
  }

  return single
}
