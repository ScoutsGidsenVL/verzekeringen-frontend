import { oneTimeActivityDeserializer, oneTimeActivitySerializer } from '@/serializer/insurances/OneTimeActivity'
import { BaseRepository } from '@/repositories/baseRepository'

export class OneTimeActivityRepository extends BaseRepository {
  id = '/one-time-activity-insurance/'
  endpoint = '/insurances/'
  deserializer = oneTimeActivityDeserializer
  serializer = oneTimeActivitySerializer
}
