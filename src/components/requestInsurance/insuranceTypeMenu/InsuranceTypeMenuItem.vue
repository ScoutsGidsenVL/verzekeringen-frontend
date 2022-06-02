<template>
  <input type="radio" :id="label" :name="label" :value="label" />
  <label :for="label">{{ label }}</label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InsuranceTypeMenuItem',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
})
</script>
