import { ClaimDeserializer, ClaimSerializer } from '@/serializer/claims/claim'
import { BaseRepository } from '@/repositories/baseRepository'

export class ClaimRepository extends BaseRepository {
  id = '/insurances_claims/'
  endpoint = '/insurances_claims/'
  deserializer = ClaimDeserializer
  serializer = ClaimSerializer
}
