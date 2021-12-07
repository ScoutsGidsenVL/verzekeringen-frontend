import { MaterialInsurance, MaterialInsuranceDeserializer, MaterialInsuranceSerializer } from '@/serializer/insurances/MaterialInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class MaterialInsuranceRepository extends BaseRepository {
  id = '/material-insurance/'
  endpoint = '/insurances/'
  deserializer = MaterialInsuranceDeserializer
  serializer = MaterialInsuranceSerializer

  create(data: MaterialInsurance) {
    return this.post(this.endpoint + 'equipment/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.patch(this.endpoint + 'equipment/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: MaterialInsurance) => {
    return this.post(this.endpoint + 'equipment/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost.toString().replace(".", ",")
    })
  }
}
