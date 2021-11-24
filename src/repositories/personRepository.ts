import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '@/repositories/baseRepository'

export class PersonRepository extends BaseRepository {
  id = '/person/'
  endpoint = '/persons/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string, group_admin_id: string, start?: string, end?: string): Promise<any> {
    return this.get('/persons/' + '?term=' + query + '&group=' + group_admin_id + (start ? '&start=' + start : '') + (end ? '&end=' + end : '') , {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
