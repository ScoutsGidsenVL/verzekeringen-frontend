<template>
  <div>
    <info-alert>
      <div>
        <p>
          Meer info over de <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/autoverzekering">tijdelijke autoverzekering.</a>
        </p>
      </div>
    </info-alert>
  </div>
</template>

<script lang="ts">
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipTempVehicle',
  components: {
    'info-alert': InfoAlert,
  },
  setup() {
    return {}
  },
})
</script>
