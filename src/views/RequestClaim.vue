<template>
  <div class="container">
    <request-bread-crumb />
  </div>
  <div class="container">
    <state-claim-form-holder />
  </div>
</template>

<script lang="ts">
import RequestBreadCrumb from '@/components/requestClaim/requestBreadCrumb/RequestBreadCrumbClaim.vue'
import StateClaimFormHolder from '@/components/semantic/HolderStateClaimForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RequestClaim',
  components: {
    'request-bread-crumb': RequestBreadCrumb,
    'state-claim-form-holder': StateClaimFormHolder,
  },
  setup() {
    return {}
  },
})
</script>
