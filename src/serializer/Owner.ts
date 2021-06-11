import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'

export interface Owner {
  readonly id: string
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber: string
  readonly email: string
  birthDate: string
  readonly groupAdminId?: string
  readonly street?: string
  readonly number?: string
  readonly letterBox?: string
  readonly postCodeCity?: Location
  readonly comment: string
  isChecked?: boolean
  readonly companyName?: string
}

export const OwnerDeserializer = (input: any): Owner => {
  const single: Owner = {
    id: input.id ? input.id : undefined,
    lastName: input.last_name,
    firstName: input.first_name,
    phoneNumber: input.phone_number,
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
    phone_number: input.phoneNumber ? input.phoneNumber : '/',
    email: input.email ? input.email : undefined,
    birth_date: input.birthDate,
    group_admin_id: input.groupAdminId,
    street: input.street ? input.street : undefined,
    number: input.number ? input.number : undefined,
    group: input.group ? input.group : null,
    comment: input.comment ? input.comment : undefined,
    postcode_city: input.postCodeCity ? LocationSerializer(input.postCodeCity) : undefined,
    company_name: input.companyName ? input.companyName : undefined,
  }

  return single
}
