import { TemporaryVehicleDeserializer, TemporaryVehicleInsurance, TemporaryVehicleSerializer, DraftTemporaryVehicleSerializer } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { BaseRepository } from '@/repositories/baseRepository'
import { InsuranceTypeId, InsuranceTypes } from '@/enums/insuranceTypes'
import { draft } from '@/repositories/baseRepository'

export class TemporaryVehicleRepository extends BaseRepository {
  id = '/insurances/temporary_vehicle/'
  endpoint = '/insurances/'
  deserializer = TemporaryVehicleDeserializer
  serializer = TemporaryVehicleSerializer

  create(data: TemporaryVehicleInsurance) {
    return this.post(this.endpoint + 'temporary_vehicle/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + 'temporary_vehicle/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: TemporaryVehicleInsurance) => {
    return this.post(this.endpoint + 'temporary_vehicle/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost.replace(".", ",")
    })
  }

  createDraft(data: any, type: InsuranceTypes) {
    const draft: draft = { insurance_type: InsuranceTypeId[type], data: DraftTemporaryVehicleSerializer(data) }

    return this.post('/insurance_drafts/', draft).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
