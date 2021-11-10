import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '@/repositories/baseRepository'

export class MemberRepository extends BaseRepository {
  id = '/member/'
  endpoint = '/ga/members/info/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string, group?: string): Promise<any> {
    return this.get('/members_search/' + '?term=' + query + '&group=' + group, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
