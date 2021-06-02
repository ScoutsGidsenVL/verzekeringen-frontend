import { BaseRepository } from '@/repositories/baseRepository'
import { insuranceGroupSizeDeserializer, insuranceGroupSizeSerializer } from '@/serializer/InsuranceGroupSizes'

export class InsuranceGroupSizesRepository extends BaseRepository {
  id = '/insurance_group_sizes/'
  endpoint = '/insurance_group_sizes/'
  deserializer = insuranceGroupSizeDeserializer
  serializer = insuranceGroupSizeSerializer

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }
}
