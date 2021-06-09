import { EventSizeDeserializer, EventSizeSerializer } from '@/serializer/EventSize'
import { BaseRepository } from '@/repositories/baseRepository'
import { ref } from 'vue'
import { EventSize } from '@/serializer/EventSize'

export class EventSizeRepository extends BaseRepository {
  id = '/insurance_event_sizes/'
  endpoint = '/insurance_event_sizes/'
  deserializer = EventSizeDeserializer
  serializer = EventSizeSerializer

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
      const array: any[] = []
      response.forEach((result: any) => {
        const data = ref<EventSize>(this.deserializer(result))
        array.push(data.value)
      })
      return array
    })
  }
}
