import { nonMemberInsuranceDeserializer, nonMemberInsuranceSerializer } from '@/serializer/insurances/NonMemberInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class NonMemberInsuranceRepository extends BaseRepository {
  id = '/non_member/'
  endpoint = '/non_member/'
  deserializer = nonMemberInsuranceDeserializer
  serializer = nonMemberInsuranceSerializer
}
