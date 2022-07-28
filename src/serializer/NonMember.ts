import { Location, LocationDeserializer, LocationSerializer } from '@/serializer/Location'
import { GroupSerializer } from './Group'

export interface NonMember {
  id?: string
  inuitsId?: string
  readonly lastName: string
  readonly firstName: string
  readonly phoneNumber: string
  readonly birthDate: string | undefined
  readonly street: string
  readonly number: string
  readonly letterBox: string
  readonly comment: string
  readonly postCodeCity: Location
  group?: string
  isChecked?: boolean
  isMember?: boolean
}

export const NonMemberDeserializer = (input: any): NonMember => {
  const single: NonMember = {
    inuitsId: input.inuits_id ? input.inuits_id : undefined,
    id: input.id ? input.id : undefined,
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
    group: input.group_admin_id ? input.group_admin_id : input.group_group_admin_id ? input.group_group_admin_id : undefined,
  }

  return single
}

export const NonMemberSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    last_name: input.lastName,
    first_name: input.firstName,
    phone_number: input.phoneNumber ? input.phoneNumber.replace(/ /g, '') : '',
    birth_date: input.birthDate ? input.birthDate : undefined,
    street: input.street,
    number: input.number,
    letter_box: input.letterBox,
    comment: input.comment,
    postal_code: LocationSerializer(input.postCodeCity).postal_code,
    city: LocationSerializer(input.postCodeCity).city,
    group_group_admin_id: input.group ? input.group : null,
    group_admin_id: input.group ? input.group : null,
    inuits_id: input.inuitsId ? input.inuitsId : null,
    scouts_group: input.group ? GroupSerializer(input.group) : undefined, // DRAFT
  }

  return single
}
