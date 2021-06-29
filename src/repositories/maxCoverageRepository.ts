import { CoverageDeserializer, CoverageSerializer, roundLabel } from '@/serializer/Coverage'
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
        array.push(this.deserializer(roundLabel(result)))
      })
      return array
    })
  }
}
