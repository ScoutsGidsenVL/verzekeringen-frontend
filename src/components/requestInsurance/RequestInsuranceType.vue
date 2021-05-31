<template>
  <one-time-activity />
</template>

<script lang="ts">
import OneTimeActivity from '@/components/insurances/oneTimeActivity/oneTimeActivity.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'one-time-activity': OneTimeActivity,
  },
})
</script>
