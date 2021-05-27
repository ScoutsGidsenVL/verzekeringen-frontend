// import { fetcherFn, revalidateOptions } from 'swrv/dist/types'
// import masterConfig from '@/models/config/masterConfig'
// import { sanitizeUrl } from '@/composable/urlHelpers'
// import { useAxios } from '@vue-composable/axios'
// import { computed, inject, ref, Ref } from 'vue'
// import { useStore } from 'vuex'
// import useSWRV from 'swrv'

// const useGetFromApi = <T>(
//   urlInput: string,
//   serializer: (_input: any) => T,
//   doCallDirectInput: boolean = true
// ): {
//   data: Ref<T | undefined>
//   error: Ref<any>
//   mutate: (data?: fetcherFn<T> | undefined, opts?: revalidateOptions | undefined) => Promise<void>
//   updateUrl: (input: string) => void
//   setDoCallDirect: () => void
// } => {
//   const { exec, result, error: axiosError } = useAxios()
//   const url = ref<string>(sanitizeUrl(urlInput))
//   const doCallDirect = ref<boolean>(doCallDirectInput)

//   const store = useStore()
//   const config = computed((): masterConfig => {
//     return store.state.config.config
//   })
//   // Get the token from the auth plugin and return Axios call
//   const fetcher = async () => {
//     await exec({
//       method: 'GET',
//       url: config.value.api.baseUrl + url.value,
//       headers: {
//         Authorization: `Bearer ${store.getters.accessToken}`,
//       },
//     })

//     // Axios has error
//     if (axiosError && axiosError.value) {
//       throw axiosError
//     }
//     //Serialize output
//     try {
//       return serializer(result.value)
//     } catch (error) {
//       throw error
//     }
//   }

//   // Do the api call, SWRV provides a caching layer https://github.com/Kong/swrv
//   const { data, error, mutate } = useSWRV(() => (doCallDirect.value ? url.value : null), fetcher)

//   const setDoCallDirect = () => {
//     doCallDirect.value = true
//   }

//   return {
//     data,
//     error,
//     mutate,
//     updateUrl,
//     setDoCallDirect,
//   }
// }

// export default useGetFromApi
