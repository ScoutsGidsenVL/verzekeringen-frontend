import { Driver } from '@/serializer/Driver'

export const IS_NO_DRIVER = 'IS_NO_DRIVER'

export interface SelectDriver {
  drivers: Driver[]
  isDriverOwner: String
}
