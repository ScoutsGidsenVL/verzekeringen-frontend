import { NonMember, NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class NonMemberRepository extends BaseRepository {
  id = '/non_member/'
  endpoint = '/non_member/'
  deserializer = NonMemberDeserializer
  serializer = NonMemberSerializer

  search(query: string, group_admin_id: string, start?: string, end?: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query + '&group=' + group_admin_id + (start ? '&start=' + start : '') + (end ? '&end=' + end : ''), {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: NonMember) => {
        result = NonMemberDeserializer(result)
        result.inuitsId = result.id
        array.push({ value: result, name: result.firstName + ' ' + result.lastName })
      })
      return array
    })
  }
}
