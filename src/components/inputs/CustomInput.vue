<template>
  <form>
    <strong>
      <label>{{ label }}</label>
    </strong>
    <br />
    <Field v-slot="{ field }" :name="name" :type="type" :value="input" :rules="rules">
      <input v-if="type !== InputTypes.TEXT_AREA" v-model="input" class="bg-lightGray p-2 min-w-0 w-100" :min="min" :type="type" :name="name" :value="input" v-bind="field" @input="emit" />
      <textarea
        v-if="type === InputTypes.TEXT_AREA"
        v-model="input"
        class="bg-lightGray p-2 w-96 h-32 min-w-0"
        :type="'text'"
        :name="name"
        v-bind="field"
        :disabled="disabled"
        maxlength="500"
        @input="emit"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red text-sm block mt-1 w-80" />
  </form>
</template>

<script lang="ts">
import { Field, ErrorMessage, useField } from 'vee-validate'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  components: {
    Field,
    ErrorMessage,
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
  },
  setup(props, context) {
    const input = ref<any>(props.value)
    const emit = () => {
      context.emit('onChange', input.value)
    }
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    })

    return {
      InputTypes,
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
      input,
      emit,
    }
  },
})
</script>
