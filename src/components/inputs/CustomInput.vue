<template>
  <div>
    <strong v-if="!hideInput">
      <label>{{ label }}</label>
      <required :rules="rules" />
    </strong>
    <div v-if="extraInfo" style="font-size: 13px">
      <label>{{ extraInfo }}</label>
    </div>
    <div>
      <slot />
    </div>
    <input v-if="type !== InputTypes.TEXT_AREA && !hideInput" v-model="inputValue" class="bg-lightGray p-2 min-w-0 w-100" :min="min" :type="type" step="1" :maxlength="maxlength" :name="name" />
    <textarea v-if="type === InputTypes.TEXT_AREA && !hideInput" v-model="inputValue" class="bg-lightGray p-2 w-96 h-32 min-w-0" :type="'text'" :name="name" :disabled="disabled" maxlength="500" />
    <ErrorMessage :name="name" class="text-red text-sm block mt-1 w-80" />
  </div>
</template>

<script lang="ts">
import { ErrorMessage, useField } from 'vee-validate'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent } from 'vue'
import Required from '@/components/semantic/Required.vue'

export default defineComponent({
  name: 'CustomInput',
  components: {
    ErrorMessage,
    Required,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      required: false,
      default: '',
    },
    maxlength: {
      type: String,
      required: false,
      default: '1000',
    },
    extraInfo: {
      type: String,
      required: false,
    },
    hideInput: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props) {
    const { value: inputValue } = useField(props.name, props.rules, {
      initialValue: props.value,
    })

    return {
      InputTypes,
      inputValue,
    }
  },
})
</script>
