import { BaseRepository } from '@/repositories/baseRepository'
import { GroupSize, GroupSizeDeserializer, GroupSizeSerializer } from '@/serializer/GroupSize'
import { ref } from 'vue'

export class InsuranceGroupSizesRepository extends BaseRepository {
  id = '/insurance_group_sizes/'
  endpoint = '/insurance_group_sizes/'
  deserializer = GroupSizeDeserializer
  serializer = GroupSizeSerializer

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
      const array: any[] = []
      response.forEach((result: any) => {
        const data = ref<GroupSize>(this.deserializer(result))
        array.push({ id: data.value.id, value: data.value.value, label: data.value.label })
      })
      return array
    })
  }
}
