import { NonMemberInsurance, nonMemberInsuranceDeserializer, nonMemberInsuranceSerializer } from '@/serializer/insurances/NonMemberInsurance'
import { BaseRepository } from '@/repositories/baseRepository'

export class NonMemberInsuranceRepository extends BaseRepository {
  id = '/insurances/temporary/'
  endpoint = '/insurances/'
  deserializer = nonMemberInsuranceDeserializer
  serializer = nonMemberInsuranceSerializer

  create(data: NonMemberInsurance) {
    return this.post(this.endpoint + 'temporary/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.patch(this.endpoint + 'temporary/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: NonMemberInsurance) => {
    return this.post(this.endpoint + 'temporary/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost.toString().replace(".", ",")
    })
  }
}
