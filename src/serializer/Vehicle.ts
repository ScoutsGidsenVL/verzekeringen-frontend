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

const setObjectType = (type: string) => {
  if (type === 'PERSONENWAGEN') {
    return VehicleTypeDeserializer({
        "id": "PERSONENWAGEN",
        "value": "PERSONENWAGEN",
        "label": "Personenwagen (maximum 5 inzittenden)"
    })
  }

  if (type === 'MINIBUS') {
    return VehicleTypeDeserializer({
        "id": "MINIBUS",
        "value": "MINIBUS",
        "label": "Minibus (maximum 8 inzittenden)"
    })
  }

  if (type === 'VRACHTWAGEN') {
    return VehicleTypeDeserializer({
        "id": "VRACHTWAGEN",
        "value": "VRACHTWAGEN",
        "label": "Vrachtwagen tot 3.5 ton (maximum 8 inzittenden)"
    })
  }

  return VehicleTypeDeserializer({
      "id": "PERSONENWAGEN",
      "value": "PERSONENWAGEN",
      "label": "Personenwagen (maximum 5 inzittenden)"
  }) 
}

const setObjectTrailer = (trailerId: string) => {
  if (trailerId === '0') {
   return TrailerDeserializer({
        "id": "0",
        "value": "0",
        "label": "Geen"
    })
  }

  if (trailerId === '1') {
    return TrailerDeserializer({
         "id": "1",
         "value": "1",
         "label": "Aanhangwagen (zonder meerprijs)"
     })
   }

  if (trailerId === '2') {
    return TrailerDeserializer({
      "id": "2",
      "value": "2",
      "label": "<750kg"
  })
   }
   if (trailerId === '3') {
    return TrailerDeserializer({
      "id": "3",
      "value": "3",
      "label": ">750kg"
  })
   }
   return TrailerDeserializer({
    "id": "0",
    "value": "0",
    "label": "Geen"
})
}

export const VehicleDeserializer = (input: any): Vehicle => {
  const single: Vehicle = {
    id: input.id ? input.id : undefined,
    type: input.type ? 
    ((typeof input.type === 'object') ? VehicleTypeDeserializer(input.type) : setObjectType(input.type)) 
    : undefined,
    brand: input.brand ? input.brand : undefined,
    licensePlate: input.license_plate ? input.license_plate : undefined,
    constructionYear: input.construction_year ? moment(input.construction_year.toString()).format('YYYY') : undefined,
    chassisNumber: input.chassis_number ? input.chassis_number : undefined,
    trailer: input.trailer !== null ? (typeof input.trailer === 'object' ? TrailerDeserializer(input.trailer) : setObjectTrailer(input.trailer.toString())) : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const VehicleSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    type: input.type ? VehicleTypeSerializer(input.type).value : undefined,
    brand: input.brand ? input.brand : undefined,
    license_plate: input.licensePlate ? input.licensePlate : undefined,
    construction_year: input.constructionYear ? input.constructionYear : undefined,
    chassis_number: input.chassisNumber ? input.chassisNumber : undefined,
    trailer: input.trailer ? TrailerSerializer(input.trailer).value : undefined,
    group_group_admin_id: input.group ? input.group : undefined,
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
