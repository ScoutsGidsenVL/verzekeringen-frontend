<template>
  <div class="flex">
    <input
      @input="search()"
      v-model="query"
      :placeholder="placeholder"
      type="text"
      class="appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    <div v-if="loading" style="margin-left: -2em" class="mt-2">
      <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <path class="opacity-20" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseRepository } from '@/repositories/baseRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'SearchInput',
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
  },
  setup(props, context) {
    let debounce: any
    const query = ref<string>('')
    const options = ref<any>([])

    const search = () => {
      context.emit('update:loading', true)
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        if (query.value) {
          RepositoryFactory.get(props.repository)
            .search(query.value)
            .then((results: any) => {
              options.value = results
              context.emit('fetchedOptions', options.value)
            })
        }
      }, 300)
    }
    return {
      options,
      search,
      query,
    }
  },
})
</script>