<template>
  <div class="mb-1" v-if="(phoneNumber && phoneNumber === '') || phoneNumber === '/'">
    <p>(Gsm kan toegevoegd worden op de groepsadmin.)</p>
  </div>
  <div class="mb-1" v-else-if="(phoneNumber && phoneNumber !== '') || phoneNumber !== '/'">
    <p>{{ phoneNumber }}</p>
  </div>
  <div class="mb-1" v-if="!phoneNumber">
    <p>(Gsm kan toegevoegd worden op de groepsadmin.)</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhoneNumber',
  props: {
    phoneNumber: String,
  },
})
</script>
