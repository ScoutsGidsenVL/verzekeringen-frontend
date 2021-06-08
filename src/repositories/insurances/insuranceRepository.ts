import { insuranceDeserializer, insuranceSerializer } from '@/serializer/Insurance'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class InsuranceRepository extends BaseRepository {
  id = '/insurances/'
  endpoint = '/insurances/'
  deserializer = insuranceDeserializer
  serializer = insuranceSerializer

  getArray(pagination: string): Promise<any> {
    const paginationUrl = pagination.split(this.endpoint)[1]

    return this.get(this.endpoint + paginationUrl, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      response.results = array
      return response
    })
  }
}
