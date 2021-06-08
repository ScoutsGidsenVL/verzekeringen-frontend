import { BaseRepository } from '@/repositories/baseRepository'
import { Location, LocationDeserializer } from '@/serializer/Location'

export class BelgianCitySearchRepository extends BaseRepository {
  id = '/belgian_city_search/'
  endpoint = '/belgian_city_search/'
  deserializer = null
  serializer = null

  search(query: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query, {}).then((response: Location[]) => {
      const array: any[] = []
      response.forEach((result: Location) => {
        result = LocationDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
