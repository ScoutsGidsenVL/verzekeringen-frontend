<template>
  <div>
    <info-alert>
      <strong>Wat biedt de reisbijstandsverzekering meer dan de gewone ledenpolis?</strong>
      <p>Alleen geldig voor leden van Scouts en Gidsen Vlaanderen en personen die via een tijdelijke verzekering verzekerd zijn voor dezelfde periode.</p>

      <div class="mt-3">
        <strong>
          Meer info over
          <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/reisbijstand">reisbijstand</a>
          &
          <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/reisbijstand-met-de-auto">reisbijstand met auto</a>
        </strong>
      </div>
    </info-alert>
  </div>
</template>

<script lang="ts">
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipGeneralTravelAssistance',
  components: {
    'info-alert': InfoAlert,
  },
  setup() {
    return {}
  },
})
</script>
