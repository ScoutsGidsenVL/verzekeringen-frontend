import { TravelAssistanceInsurance, TravelAssistanceInsuranceDeserializer, TravelAssistanceInsuranceSerializer } from '@/serializer/insurances/TravelAssistanceInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class TravelAssistanceRepository extends BaseRepository {
  id = '/insurances/travel_assistance/'
  endpoint = '/insurances/'
  deserializer = TravelAssistanceInsuranceDeserializer
  serializer = TravelAssistanceInsuranceSerializer

  create(data: TravelAssistanceInsurance) {
    return this.post(this.endpoint + 'travel_assistance/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + 'travel_assistance/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: TravelAssistanceInsurance) => {
    return this.post(this.endpoint + 'travel_assistance/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost
    })
  }
}
