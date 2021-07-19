<template>
  <div class="container">
    <claim-detail :isDetailPage="true" />
  </div>
</template>

<script lang="ts">
import ClaimDetail from '@/components/requestClaim/detail/claimDetail.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClaimDetailPage',
  components: {
    'claim-detail': ClaimDetail,
  },
})
</script>
