import { TrailerDeserializer, TrailerSerializer } from '@/serializer/Trailer'
import { BaseRepository } from '@/repositories/baseRepository'

export class TrailerRepository extends BaseRepository {
  id = '/vehicle_trailer_options/'
  endpoint = '/vehicle_trailer_options/'
  deserializer = TrailerDeserializer
  serializer = TrailerSerializer

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
