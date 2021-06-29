import { LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { Member } from './Member'

export interface Owner extends Member {
  readonly companyName?: string
}

export const OwnerDeserializer = (input: any): Owner => {
  const single: Owner = {
    id: input.id ? input.id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
    email: input.email ? input.email : undefined,
    birthDate: input.birth_date,
    groupAdminId: input.group_admin_id,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    letterBox: input.letter_box ? input.letter_box : undefined,
    postCodeCity: input.postcode_city ? LocationDeserializer(input.postcode_city) : undefined,
    comment: input.comment,
    isChecked: false,
    companyName: input.company_name ? input.company_name : undefined,
  }

  return single
}

export const OwnerSerializer = (input: any): any => {
  const single: any = {
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '/',
    email: input.email ? input.email : undefined,
    birth_date: input.birthDate ? input.birthDate : '2000-01-01',
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    letter_box: input.letterBox ? input.letterBox : undefined,
    comment: input.comment ? input.comment : undefined,
    postcode_city: input.postCodeCity ? LocationSerializer(input.postCodeCity) : undefined,
    company_name: input.companyName ? input.companyName : undefined,
  }

  return single
}
