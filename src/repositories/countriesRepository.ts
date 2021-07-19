import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'
import { Country, CountryDeserializer, CountrySerializer } from '@/serializer/Country'

export class CountryRepository extends BaseRepository {
  id = '/countries_by_type/'
  endpoint = '/countries_by_type/'
  deserializer = CountryDeserializer
  serializer = CountrySerializer

  search(query: string, insuranceTypeId?: string): Promise<any> {
    return this.get(this.endpoint + insuranceTypeId + '/?page_size=1000&term=' + query, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: Country) => {
        result = CountryDeserializer(result)
        array.push(result)
      })
      return array
    })
  }

  getArray(pagination: string): Promise<any> {
    const paginationUrl = pagination.split(this.endpoint)[1]

    return this.get(this.endpoint + paginationUrl, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        const country = this.deserializer(result)
        array.push(country)
      })
      response.results = array
      return response
    })
  }
}
