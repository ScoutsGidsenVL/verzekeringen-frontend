<template>
  <base-detail :repository="InsuranceRepository" title="Eenmalige activiteit">
    <template #default="{ details }">
      {{ details }}
    </template>
  </base-detail>
</template>
<script lang="ts">
import { InsuranceRepository } from '@/repositories/insuranceRepository'
import { defineComponent } from 'vue'
import BaseDetail from '@/components/semantic/BaseDetail.vue'

export default defineComponent({
  name: 'OneTimeActivityDetail',
  components: {
    'base-detail': BaseDetail,
  },
  setup() {
    return { InsuranceRepository }
  },
})
</script>
