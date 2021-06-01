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
}
