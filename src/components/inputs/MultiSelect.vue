<template>
  <div v-if="options" class="pt-4">
    <strong>
      <label>{{ label }}</label>
    </strong>
    <div class="min-w-0">
      <multi-select
        v-model="inputValue"
        :value="inputValue"
        :name="id"
        :value-prop="valueProp"
        v-bind="field"
        :disabled="disabled"
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="false"
        :delay="0"
        :placeholder="placeholder"
        :track-by="trackBy"
        :label="trackBy"
        :searchable="searchable"
        :search="true"
        :resolveOnLoad="resolveOnLoad"
        :options="
          searchable
            ? async function (query) {
                return fetchSearchData(query)
              }
            : options
        "
      />
      <error-message class="text-red font-light ml-1 mt-1 text-sm inline-block" :name="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/runtime-core'
import { ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { PropType } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
export default defineComponent({
  name: 'AppMultiSelect',
  components: {
    'error-message': ErrorMessage,
    'multi-select': Multiselect,
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
      type: Array as PropType<Array<any>>,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: '',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    insuranceTypeId: {
      type: String,
      default: '',
      required: false,
    },
    resolveOnLoad: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, context) {
    const { value: inputValue } = useField(props.id, props.rules, {
      initialValue: props.value,
    })

    const fetchSearchData = async (query: string) => {
      let data: any = []

      if (query) {
        await RepositoryFactory.get(props.repository)
          .search(query, props.insuranceTypeId)
          .then((res: any) => {
            data = res
          })
      } else {
        if (props.resolveOnLoad) {
          data = props.options
        }
      }

      return data
    }

    const addSelection = (inputValue: any) => {
      context.emit('addSelection', inputValue)
    }

    watch(
      () => inputValue.value,
      () => {
        context.emit('addSelection', inputValue.value)
      }
    )

    return {
      inputValue,
      fetchSearchData,
      addSelection,
    }
  },
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
