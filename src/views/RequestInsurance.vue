<template>
  <div class="container">
    <request-bread-crumb />
  </div>
  <div class="container">
    <state-form-holder />
  </div>
</template>

<script lang="ts">
import RequestBreadCrumb from '@/components/requestInsurance/requestBreadCrumb/RequestBreadCrumb.vue'
import StateFormHolder from '@/components/semantic/HolderStateForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RequestInsurance',
  components: {
    'request-bread-crumb': RequestBreadCrumb,
    'state-form-holder': StateFormHolder,
  },
})
</script>
