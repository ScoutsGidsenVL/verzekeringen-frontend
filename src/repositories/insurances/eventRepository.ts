import { EventInsuranceDeserializer, EventInsuranceSerializer } from '@/serializer/insurances/EventInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class EventRepository extends BaseRepository {
  id = '/event-insurance/'
  endpoint = '/event/'
  deserializer = EventInsuranceDeserializer
  serializer = EventInsuranceSerializer
}
