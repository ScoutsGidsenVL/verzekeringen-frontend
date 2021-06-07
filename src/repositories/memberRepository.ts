import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class MemberRepository extends BaseRepository {
  id = '/member/'
  endpoint = '/member/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push({ value: result, name: result.firstName + ' ' + result.lastName })
      })
      return array
    })
  }
}
