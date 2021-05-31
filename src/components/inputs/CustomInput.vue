<template>
  <form>
    <strong>
      <label>{{ label }}</label>
    </strong>
    <br />
    <Field v-slot="{ field }" :name="name" :type="type" :value="input" :rules="rules">
      <input v-if="type !== InputTypes.TEXT_AREA" v-model="input" class="bg-lightGray p-2 w-80 min-w-0" :type="type" :name="name" :value="input" v-bind="field" @input="emit" />
      <textarea v-if="type === InputTypes.TEXT_AREA" v-model="input" class="bg-lightGray p-2 w-80 min-w-0" :type="'text'" :name="name" v-bind="field" :disabled="disabled" @input="emit" />
    </Field>
    <ErrorMessage :name="name" class="text-red text-sm block" />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'
import { InputTypes } from '@/enums/inputTypes'

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
