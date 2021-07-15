import { ClaimDeserializer, ClaimSerializer } from '@/serializer/claims/claim'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class ClaimRepository extends BaseRepository {
  id = '/insurances_claims/'
  endpoint = '/insurances_claims/'
  deserializer = ClaimDeserializer
  serializer = ClaimSerializer

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
