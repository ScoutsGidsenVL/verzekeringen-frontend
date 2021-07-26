import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { BaseRepository } from '@/repositories/baseRepository'

export class PersonRepository extends BaseRepository {
  id = '/person/'
  endpoint = '/persons/'
  deserializer = MemberDeserializer
  serializer = MemberSerializer

  search(query: string): Promise<any> {
    return this.get('/persons/' + '?term=' + query, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: Member) => {
        result = MemberDeserializer(result)
        array.push(result)
      })
      return array
    })
  }
}
