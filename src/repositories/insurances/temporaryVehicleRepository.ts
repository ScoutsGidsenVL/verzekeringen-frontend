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

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + 'temporary_vehicle/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: TemporaryVehicleInsurance) => {
    return this.post(this.endpoint + 'temporary_vehicle/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost
    })
  }
}
