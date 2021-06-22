import { CoverageDeserializer, CoverageSerializer } from '@/serializer/Coverage'
import { BaseRepository } from '@/repositories/baseRepository'

export class MaxCoverageRepository extends BaseRepository {
  id = '/vehicle_insurance_coverage_options/'
  endpoint = '/vehicle_insurance_coverage_options/'
  deserializer = CoverageDeserializer
  serializer = CoverageSerializer

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: Array<any>) => {
      const array: any[] = []
      response.forEach((result: any) => {
        if (result.label === '247,89 EUR') {
          result.label = '250 EUR'
        }
        if (result.label === '495,79 EUR') {
          result.label = '500 EUR'
        }
        if (result.label === '743,68 EUR') {
          result.label = '750 EUR'
        }
        array.push(this.deserializer(result))
      })
      return array
    })
  }
}
