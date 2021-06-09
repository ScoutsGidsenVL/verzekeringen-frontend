import { TemporaryVehicleDeserializer, TemporaryVehicleSerializer } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class TemporaryVehicleRepository extends BaseRepository {
  id = '/insurances/temporary_vehicle/'
  endpoint = '/insurances/temporary_vehicle/'
  deserializer = TemporaryVehicleDeserializer
  serializer = TemporaryVehicleSerializer
}
