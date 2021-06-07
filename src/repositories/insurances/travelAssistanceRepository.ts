import { TravelAssistanceInsurance, TravelAssistanceInsuranceDeserializer, TravelAssistanceInsuranceSerializer } from '@/serializer/insurances/TravelAssistanceInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class NonMemberInsuranceRepository extends BaseRepository {
  id = '/insurances/travel_assistance/'
  endpoint = '/insurances/'
  deserializer = TravelAssistanceInsuranceDeserializer
  serializer = TravelAssistanceInsuranceSerializer

  create(data: TravelAssistanceInsurance) {
    return this.post(this.endpoint + 'travel_assistance/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
