<template>
  <div>
    <info-alert>
      <div>
        <p>
          Meer info over
          <a class="underline" target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/reisbijstand">reisbijstand</a>
          en
          <a class="underline" target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/reisbijstand-met-de-auto">reisbijstand met auto</a>
        </p>
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
