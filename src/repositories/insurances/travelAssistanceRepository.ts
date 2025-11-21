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
    return this.patch(this.endpoint + 'travel_assistance/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: TravelAssistanceInsurance) => {
    const start = new Date(data.startDate || Date.now())
    const end = new Date(data.endDate || Date.now())
    const days = end.getDate() - start.getDate()
    const values = {
      "days_amount": days,
      "person_amount": data.participants? data.participants.length : 0,
      "vehicle_amount": data.vehicle ? 1 : 0,
    }
    return this.post(this.endpoint + 'travel_assistance/cost/', values).then((response: any) => {
      return response.total_cost.toString().replace(".", ",")
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
