import { TemporaryVehicleDeserializer, TemporaryVehicleInsurance, TemporaryVehicleSerializer } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class TemporaryVehicleRepository extends BaseRepository {
  id = '/insurances/temporary_vehicle/'
  endpoint = '/insurances/'
  deserializer = TemporaryVehicleDeserializer
  serializer = TemporaryVehicleSerializer

  create(data: TemporaryVehicleInsurance) {
    return this.post(this.endpoint + 'temporary_vehicle/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
