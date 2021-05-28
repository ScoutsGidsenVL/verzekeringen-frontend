import { Insurance, insuranceSerializer } from '@/serializer/Insurance'
import BaseApiRepository from '@/repositories/baseApiRepository'

export class InsuranceRepository extends BaseApiRepository {
  id = '/insurances/'
  endpoint = '/insurances/'

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
      const array: Insurance[] = []
      response.results.forEach((result: any) => {
        array.push(insuranceSerializer(result))
      })
      return array
    })
  }

  getById(id: number): Promise<any> {
    return this.get(this.endpoint + id, {}).then((response: any) => {
      const array: Insurance[] = []
      response.results.forEach((result: any) => {
        array.push(insuranceSerializer(result))
      })
      return array
    })
  }
}
