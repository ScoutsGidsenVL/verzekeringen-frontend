import { VehicleType, VehicleTypeDeserializer, VehicleTypeSerializer } from './VehicleType'

export interface Vehicle {
  readonly id?: string
  readonly type?: VehicleType
  readonly brand?: string
  readonly licensePlate?: string
  readonly constructionYear?: string
  readonly chassisNumber?: string
  trailer?: boolean
}

export const VehicleDeserializer = (input: any): Vehicle => {
  const single: Vehicle = {
    type: VehicleTypeDeserializer(input.type),
    brand: input.brand,
    licensePlate: input.license_plate,
    constructionYear: input.construction_year,
    chassisNumber: input.chassis_number,
    trailer: input.trailer,
  }

  return single
}

export const VehicleSerializer = (input: any): any => {
  const single: any = {
    type: VehicleTypeSerializer(input.type),
    brand: input.brand,
    license_plate: input.licensePlate,
    construction_year: input.constructionYear,
    chassis_number: input.chassisNumber,
    trailer: input.trailer,
  }

  return single
}
