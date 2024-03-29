import { Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class VehicleRepository extends BaseRepository {
  id = '/vehicles/'
  endpoint = '/vehicles/'
  deserializer = VehicleDeserializer
  serializer = VehicleSerializer

  search(query: string, group_admin_id: string ): Promise<any> {
    return this.get(this.endpoint + '?term=' + query + '&group=' + group_admin_id, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: Vehicle) => {
        result = VehicleDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
