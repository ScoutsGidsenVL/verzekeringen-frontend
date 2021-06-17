import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'
import { Equipment, EquipmentDeserializer, EquipmentSerializer } from '@/serializer/Equipment'

export class EquipmentRepository extends BaseRepository {
  id = '/equipment_search/'
  endpoint = '/equipment/'
  deserializer = EquipmentDeserializer
  serializer = EquipmentSerializer

  search(query: string): Promise<any> {
    return this.get(this.endpoint + '?page_size=1000&term=' + query, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: Equipment) => {
        result = EquipmentDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
