<template>
  <div class="container">
    <claim-detail />
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
