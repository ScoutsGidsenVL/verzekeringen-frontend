import { VehicleType, VehicleTypeDeserializer, VehicleTypeSerializer } from '@/serializer/VehicleType'
import { Trailer, TrailerDeserializer, TrailerSerializer } from '@/serializer/Trailer'
import moment from 'moment'

export interface Vehicle {
  readonly id?: string
  readonly type?: VehicleType
  readonly brand?: string
  readonly licensePlate?: string
  readonly constructionYear?: string
  readonly chassisNumber?: string
  readonly trailer?: Trailer
  readonly group?: string
}

export const VehicleDeserializer = (input: any): Vehicle => {
  const single: Vehicle = {
    type: VehicleTypeDeserializer(input.type),
    brand: input.brand,
    licensePlate: input.license_plate,
    constructionYear: moment(input.construction_year).format('YYYY'),
    chassisNumber: input.chassis_number,
    trailer: input.trailer ? TrailerDeserializer(input.trailer) : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const VehicleSerializer = (input: any): any => {
  const single: any = {
    type: VehicleTypeSerializer(input.type).value,
    brand: input.brand,
    license_plate: input.licensePlate,
    construction_year: input.constructionYear,
    chassis_number: input.chassisNumber,
    trailer: input.trailer ? TrailerSerializer(input.trailer).value : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}
