<template>
  <div v-if="hasWarning">
    <div v-if="(phoneNumber && phoneNumber === '') || phoneNumber === '/'" class="mb-1">
      <p>(Gsm kan toegevoegd worden op de groepsadmin.)</p>
    </div>
  </div>
  <div v-if="(phoneNumber && phoneNumber !== '') || phoneNumber !== '/'">
    <p>{{ phoneNumber }}</p>
  </div>
  <div v-if="hasWarning">
    <div v-if="!phoneNumber" class="mb-1">
      <p>(Gsm kan toegevoegd worden op de groepsadmin.)</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhoneNumber',
  props: {
    phoneNumber: String,
    hasWarning: Boolean,
  },
})
</script>
