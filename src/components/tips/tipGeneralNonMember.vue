<template>
  <div>
    <info-alert>
      <strong>OPGELET! Via deze verzekering kan je geen nieuwe leden verzekeren.</strong>
      <p>
        Je VGA moet dit via de
        <a target="_blank" class="underline" href="https://groepsadmin.scoutsengidsenvlaanderen.be/">Groepsadministratie</a>
        doen.
      </p>
      <div class="mt-3">
        <p>
          Meer info over de <a target="_blank" class="underline" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/tijdelijke-verzekering-niet-leden">tijdelijke verzekering niet-leden.</a>
        </p>
      </div>
    </info-alert>
  </div>
</template>

<script lang="ts">
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TipGeneralNonMember',
  components: {
    'info-alert': InfoAlert,
  },
  setup() {
    return {}
  },
})
</script>
