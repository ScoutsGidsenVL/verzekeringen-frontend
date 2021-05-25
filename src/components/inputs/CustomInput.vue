<template>
  <form>
    <strong>
      <label :for="type">{{ label }}</label>
    </strong>
    <br />
    <input :id="type" :type="type" :name="type" @input="handleChange" @blur="handleBlur" class="bg-lightGray p-2 w-80 min-w-0" />
    <p class="text-sm text-red" v-show="errorMessage || meta.valid">{{ errorMessage || successMessage }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'CustomInput',
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
    successMessage: {
      type: String,
      default: '',
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
