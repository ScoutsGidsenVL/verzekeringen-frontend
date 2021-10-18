import { VehicleType, VehicleTypeDeserializer, VehicleTypeSerializer } from '@/serializer/VehicleType'
import { Trailer, TrailerDeserializer, TrailerSerializer } from '@/serializer/Trailer'
import moment from 'moment'

export interface Vehicle {
  readonly id?: string
  type?: VehicleType
  brand?: string
  licensePlate?: string
  constructionYear?: string
  chassisNumber?: string
  trailer?: Trailer
  group?: string
}

export const VehicleDeserializer = (input: any): Vehicle => {
  const single: Vehicle = {
    id: input.id ? input.id : undefined,
    type: input.type ? (typeof input.type === 'object' ? VehicleTypeDeserializer(input.type) : { id: input.type }) : undefined,
    brand: input.brand ? input.brand : undefined,
    licensePlate: input.license_plate ? input.license_plate : undefined,
    constructionYear: input.construction_year ? moment(input.construction_year).format('YYYY') : undefined,
    chassisNumber: input.chassis_number ? input.chassis_number : undefined,
    trailer: input.trailer ? (typeof input.trailer === 'object' ? TrailerDeserializer(input.trailer) : { id: input.trailer }) : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const VehicleSerializer = (input: any): any => {
  const single: any = {
    type: input.type ? VehicleTypeSerializer(input.type).value : undefined,
    brand: input.brand ? input.brand : undefined,
    license_plate: input.licensePlate ? input.licensePlate : undefined,
    construction_year: input.constructionYear ? input.constructionYear : undefined,
    chassis_number: input.chassisNumber ? input.chassisNumber : undefined,
    trailer: input.trailer ? TrailerSerializer(input.trailer).value : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const DraftVehicleSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    type: input.type ? VehicleTypeSerializer(input.type) : undefined,
    brand: input.brand ? input.brand : undefined,
    license_plate: input.licensePlate ? input.licensePlate : undefined,
    construction_year: input.constructionYear ? input.constructionYear : undefined,
    chassis_number: input.chassisNumber ? input.chassisNumber : undefined,
    trailer: input.trailer ? TrailerSerializer(input.trailer) : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}
