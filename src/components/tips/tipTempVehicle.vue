<template>
  <div>
    <info-alert>
      <p>Als de bestuurder geen lid is van Scouts en Gidsen Vlaanderen, vraag dan een tijdelijke verzekering niet-leden aan en je ontvangt een tijdelijk lidnummer.</p>
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
