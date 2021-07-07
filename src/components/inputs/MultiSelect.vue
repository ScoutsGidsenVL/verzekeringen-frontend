<template>
  <div v-if="options" class="pt-4">
    <strong>
      <label>{{ label }}</label>
      <required v-if="label" :rules="rules" />
    </strong>
    <div
      class="min-w-0"
      :class="{
        'text-lightGray animate-pulse2 bg-lightGray': loadingSubmit,
      }"
    >
      <multi-select
        :id="id"
        ref="multiselect"
        v-model="inputValue"
        :name="id"
        :value-prop="valueProp"
        :disabled="disabled || loadingSubmit || isSubmitting"
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="true"
        :delay="500"
        :placeholder="placeholder"
        :track-by="trackBy"
        :label="trackBy"
        :searchable="searchable"
        :search="true"
        :object="object"
        :options="
          searchable
            ? async function (query) {
                return fetchSearchData(query)
              }
            : options
        "
        no-options-text="-geen resultaten-"
      />
      <error-message class="text-red font-light ml-1 mt-1 text-sm inline-block" :name="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { computed, PropType, ref, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import Required from '@/components/semantic/Required.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AppMultiSelect',
  components: {
    'error-message': ErrorMessage,
    'multi-select': Multiselect,
    Required,
  },
  emits: ['fetchedOptions', 'addSelection'],
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
    object: {
      type: Boolean,
      default: false,
      required: false,
    },
    extraOption: {
      type: Object as PropType<any>,
      required: false,
    },
    loadingSubmit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, context) {
    const multiselect = ref()
    const { value: inputValue } = useField(props.id, props.rules, {
      initialValue: props.value,
    })

    const fetchSearchData = async (query: string) => {
      let data: any = []

      if (query) {
        await RepositoryFactory.get(props.repository)
          .search(query, props.insuranceTypeId)
          .then((res: any) => {
            data = props.extraOption ? [...[props.extraOption], ...res] : res
            context.emit('fetchedOptions', data)
          })
      } else {
        if (props.resolveOnLoad) {
          data = props.options
        }
      }

      return data
    }

    const store = useStore()

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    watch(
      () => inputValue.value,
      () => {
        context.emit('addSelection', inputValue.value)
      }
    )

    return {
      inputValue,
      multiselect,
      fetchSearchData,
      isSubmitting,
    }
  },
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
