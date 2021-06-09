import { VehicleType, VehicleTypeDeserializer, VehicleTypeSerializer } from '@/serializer/VehicleType'
import { BaseRepository } from '@/repositories/baseRepository'

export class VehicleTypeRepository extends BaseRepository {
  id = '/vehicle_types/'
  endpoint = '/vehicle_types/'
  deserializer = VehicleTypeDeserializer
  serializer = VehicleTypeSerializer

  getArray(pagination?: string): Promise<any> {
    return this.get(this.endpoint, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }
}
