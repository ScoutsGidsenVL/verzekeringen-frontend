import {
  DraftTravelAssistanceInsuranceSerializer,
  TravelAssistanceInsurance,
  TravelAssistanceInsuranceDeserializer,
  TravelAssistanceInsuranceSerializer,
} from '@/serializer/insurances/TravelAssistanceInsurance'
import { BaseRepository } from '@/repositories/baseRepository'
import { InsuranceTypeId, InsuranceTypes } from '@/enums/insuranceTypes'
import { draft } from '@/repositories/baseRepository'

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
      return response.total_cost.replace(".", ",")
    })
  }

  createDraft(data: any, type: InsuranceTypes) {
    const draft: draft = { insurance_type: InsuranceTypeId[type], data: DraftTravelAssistanceInsuranceSerializer(data) }
    if (draft.data.vehicle) {
      draft.insurance_type = '4'
    }
    return this.post('/insurance_drafts/', draft).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
