import { OneTimeActivity, oneTimeActivityDeserializer, oneTimeActivitySerializer } from '@/serializer/insurances/OneTimeActivity'
import { BaseRepository } from '@/repositories/baseRepository'
export class OneTimeActivityRepository extends BaseRepository {
  id = '/one-time-activity-insurance/'
  endpoint = '/insurances/'
  deserializer = oneTimeActivityDeserializer
  serializer = oneTimeActivitySerializer

  create(data: OneTimeActivity) {
    return this.post(this.endpoint + 'activity/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + 'activity/' + id + '/', this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  getCalculatedCost = (data: OneTimeActivity) => {
    return this.post(this.endpoint + 'activity/cost/', this.serializer(data)).then((response: any) => {
      return response.total_cost
    })
  }
}
