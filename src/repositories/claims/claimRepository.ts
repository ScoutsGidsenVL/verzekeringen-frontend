import { ClaimDeserializer, ClaimSerializer } from '@/serializer/claims/claim'
import { BaseRepository } from '@/repositories/baseRepository'

export class InsuranceRepository extends BaseRepository {
  id = '/claims/'
  endpoint = '/claims/'
  deserializer = ClaimDeserializer
  serializer = ClaimSerializer
}
