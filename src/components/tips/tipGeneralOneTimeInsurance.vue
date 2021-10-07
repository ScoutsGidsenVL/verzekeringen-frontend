<template>
  <div>
    <info-alert>
      <div>
        <p>
         Meer info over <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/verzekering-voor-een-eenmalige-activiteit">de verzekering voor een eenmalige activiteit.</a>
        </p>
      </div>
    </info-alert>
  </div>
</template>

<script lang="ts">
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipGeneralEVentInsurance',
  components: {
    'info-alert': InfoAlert,
  },
  setup() {
    return {}
  },
})
</script>
