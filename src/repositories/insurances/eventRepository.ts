import { EventInsurance, EventInsuranceDeserializer, EventInsuranceSerializer } from '@/serializer/insurances/EventInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class EventRepository extends BaseRepository {
  id = '/event-insurance/'
  endpoint = '/insurances/'
  deserializer = EventInsuranceDeserializer
  serializer = EventInsuranceSerializer

  create(data: EventInsurance) {
    return this.post(this.endpoint + 'event/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + 'event/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: EventInsurance) => {
    return this.post(this.endpoint + 'event/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost.toString().replace(".", ",")
    })
  }
}
