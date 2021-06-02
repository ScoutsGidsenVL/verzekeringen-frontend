import { NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'
import { BaseRepository } from '@/repositories/baseRepository'

export class NonMemberRepository extends BaseRepository {
  id = '/non_member/'
  endpoint = '/non_member/'
  deserializer = NonMemberDeserializer
  serializer = NonMemberSerializer
}
