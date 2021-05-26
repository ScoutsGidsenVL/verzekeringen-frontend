<template>
  <div v-if="options" class="pt-4">
    <strong>
      <label>{{ label }}</label>
    </strong>
    <div class="w-80 min-w-0">
      <vee-field v-slot="{ field }" :name="id" :rules="rules" :label="label">
        <multi-select
          :name="id"
          value-prop="value"
          v-bind="field"
          :filter-results="false"
          :min-chars="1"
          :resolve-on-load="false"
          :delay="0"
          :placeholder="placeholder"
          :track-by="trackBy"
          :label="trackBy"
          :search="true"
          :options="options"
        />
      </vee-field>
      <error-message class="text-red font-light ml-1 mt-1 text-sm inline-block" :name="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Field, ErrorMessage } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue'

export default defineComponent({
  name: 'AppMultiSelect',
  components: {
    'error-message': ErrorMessage,
    'multi-select': Multiselect,
    'vee-field': Field,
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
  },
  setup() {
    const selected = ref<any>()
    return { selected }
  },
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
