<template>
  <div v-if="options" class="pt-4">
    <strong>
      <label>{{ label }}</label>
    </strong>
    <div class="min-w-0">
      <Field v-slot="{ field }" :name="id" :rules="rules" :label="label">
        <multi-select
          v-model="input"
          :name="id"
          :value-prop="valueProp"
          v-bind="field"
          :filter-results="false"
          :min-chars="1"
          :resolve-on-load="false"
          :delay="0"
          :placeholder="placeholder"
          :track-by="trackBy"
          :label="trackBy"
          :searchable="searchable"
          :search="true"
          :options="
            searchable
              ? async function (query) {
                  return fetchSearchData(query)
                }
              : options
          "
        />
      </Field>
      <error-message class="text-red font-light ml-1 mt-1 text-sm inline-block" :name="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Field, ErrorMessage } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { PropType, ref, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
export default defineComponent({
  name: 'AppMultiSelect',
  components: {
    'error-message': ErrorMessage,
    'multi-select': Multiselect,
    Field,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: 'required',
      required: false,
    },
    trackBy: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    repository: {
      type: Function as unknown as PropType<new () => BaseRepository>,
      required: false,
      default: Function as unknown as PropType<new () => BaseRepository>,
    },
    valueProp: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const input = ref<any>(props.value)
    const fetchSearchData = async (query: string) => {
      const data: any = []
      await RepositoryFactory.get(props.repository)
        .search(query)
        .then((res: any) => {
          data.value = res
        })

      return data.value
    }
    watch(
      () => input.value,
      () => {
        context.emit('onChange', input.value)
      }
    )
    return {
      input,
      fetchSearchData,
    }
  },
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
