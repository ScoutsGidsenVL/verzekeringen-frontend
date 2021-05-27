import masterConfig from '@/models/config/masterConfig'
import { sanitizeUrl } from '@/composable/urlHelpers'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const api = '/api'

export const get = <T>(urlInput: string, serializer: (_input: any) => T): Promise<any> => {
  const store = useStore()
  const config = computed((): masterConfig => {
    return store.state.config.config
  })
  axios.defaults.headers = {
    Authorization: `Bearer ${store.getters.accessToken}`,
  }
  const url = ref<string>(config.value.api.baseUrl + api + sanitizeUrl(urlInput))
  return axios.get(url.value).then((obj: any) => {
    const results = ref<Array<any>>([])
    obj.data.results.forEach((result: any) => {
      results.value.push(serializer(result))
    })
    return results.value
  })
}
