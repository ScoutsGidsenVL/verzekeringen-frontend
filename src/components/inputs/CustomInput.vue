<template>
  <form>
    <strong>
      <label :for="type">{{ label }}</label>
    </strong>
    <br />
    <Field :type="type" :name="name" :label="label" :rules="rules" class="bg-lightGray p-2 w-80 min-w-0" />
    <ErrorMessage :name="name" class="text-red text-sm block" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

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
      default: 'required',
      required: false,
    },
  },
  setup(props) {
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
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    }
  },
})
</script>
