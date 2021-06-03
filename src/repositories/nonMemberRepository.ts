import { NonMember, NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class NonMemberRepository extends BaseRepository {
  id = '/non_member/'
  endpoint = '/non_member/'
  deserializer = NonMemberDeserializer
  serializer = NonMemberSerializer

  search(query: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query, {}).then((response: ArrayResult) => {
      const array: any[] = []
      console.log('response: ', response)
      response.results.forEach((result: NonMember) => {
        result = NonMemberDeserializer(result)
        array.push({ value: result, name: result.firstName + ' ' + result.lastName })
      })
      return array
    })
  }
}
