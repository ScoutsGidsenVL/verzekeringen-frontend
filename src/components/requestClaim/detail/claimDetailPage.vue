<template>
  <div class="container">
    
    <claim-detail :isDetailPage="true">
    </claim-detail>

  </div>
</template>

<script lang="ts">
import ClaimDetail from '@/components/requestClaim/detail/claimDetail.vue'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClaimDetailPage',
  components: {
    'claim-detail': ClaimDetail,
  },
  setup() {

    return {
      InputTypes,
    }
  }
})
</script>
