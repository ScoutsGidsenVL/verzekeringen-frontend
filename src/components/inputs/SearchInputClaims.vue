<template>
  <div class="flex gap-3 ">
    <div
      class="flex"
      :class="{
        'text-lightGray animate-pulse2 bg-lightGray': loadingSubmit,
      }"
    >
      <input
        v-model="year"
        :placeholder="'Zoek op jaar'"
        type="text"
        :disabled="loadingSubmit || loading_1"
        :class="{ 'opacity-0': loadingSubmit }"
        class="appearance-none border rounded xs:w-72 md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        @input="search_2()"
      />
      <div v-if="loading_2" style="margin-left: -2em" class="mt-2">
        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <path class="opacity-20" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    <div
    class="flex"
    :class="{
      'text-lightGray animate-pulse2 bg-lightGray': loadingSubmit,
    }"
    > 
      <input
        v-model="query"
        :placeholder="placeholder"
        type="text"
        :disabled="loadingSubmit || loading_2"
        :class="{ 'opacity-0': loadingSubmit }"
        class="appearance-none border rounded xs:w-72 md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        @input="search_1()"
      />
      <div v-if="loading_1" style="margin-left: -2em" class="mt-2">
        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <path class="opacity-20" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseRepository } from '@/repositories/baseRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SearchInputClaims',
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Zoek...',
    },
    repository: {
      type: Function as unknown as PropType<new () => BaseRepository>,
      required: false,
      default: Function as unknown as PropType<new () => BaseRepository>,
    },
    loading: Boolean,
    loadingSubmit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, context) {
    let debounce: any
    const query = ref<string>('')
    const year = ref<string>('')
    const options = ref<any>([])
    const loading_1 = ref<boolean>(false)
    const loading_2 = ref<boolean>(false)

    const search_1 = () => {
      loading_1.value = true
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        if (query.value) {
          RepositoryFactory.get(props.repository)
            .search(query.value, year.value)
            .then((results: any) => {
              options.value = results
              context.emit('fetchedOptions', options.value)
              loading_1.value = false
            })
        }
      }, 1000)
    }

    const search_2 = () => {
      loading_2.value = true
      clearTimeout(debounce)
      debounce = setTimeout(() => {
          RepositoryFactory.get(props.repository)
            .search(query.value, year.value)
            .then((results: any) => {
              options.value = results
              context.emit('fetchedOptions', options.value)
              loading_2.value = false
            })
      }, 1000)
    }

    watch(() => query.value, () => {
      if (query.value === '') {
        loading_1.value = true
        RepositoryFactory.get(props.repository)
            .search(query.value, year.value)
            .then((results: any) => {
              options.value = results
              context.emit('fetchedOptions', options.value)
              loading_1.value = false
            })
      }
    })

    return {
      options,
      search_1,
      query,
      year,
      search_2,
      loading_1,
      loading_2
    }
  },
})
</script>
