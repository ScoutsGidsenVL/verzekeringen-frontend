import { draftDeserializer, draftSerializer } from '@/serializer/Draft'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class DraftRepository extends BaseRepository {
  id = '/insurance_drafts/'
  endpoint = '/insurance_drafts/'
  deserializer = draftDeserializer
  serializer = draftSerializer

  getArray(pagination: string): Promise<any> {
    const paginationUrl = pagination.split(this.endpoint)[1]

    return this.get(this.endpoint + paginationUrl, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        const draft = this.deserializer({ ...result.data, ...{ type: result.insurance_type } })
        array.push(draft)
      })
      response.results = array
      return response
    })
  }
}
