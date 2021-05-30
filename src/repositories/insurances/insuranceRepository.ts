import { insuranceDeserializer, insuranceSerializer } from '@/serializer/Insurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class InsuranceRepository extends BaseRepository {
  id = '/insurances/'
  endpoint = '/insurances/'
  deserializer = insuranceDeserializer
  serializer = insuranceSerializer
}
