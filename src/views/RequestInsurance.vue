<template>
  <div>
    <request-bread-crumb insuranceType="Eenmalige activiteit" />
  </div>
  <div>
    <request-insurance-general />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RequestBreadCrumb from '@/components/requestInsurance/requestBreadCrumb/RequestBreadCrumb.vue'
import RequestInsuranceGeneral from '@/components/requestInsurance/RequestInusranceGeneral.vue'

export default defineComponent({
  name: 'Request Insurance',
  components: {
    'request-bread-crumb': RequestBreadCrumb,
    'request-insurance-general': RequestInsuranceGeneral,
  },
})
</script>
