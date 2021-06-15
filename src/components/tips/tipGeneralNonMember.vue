<template>
  <div>
    <info-alert>
      <strong>OPGELET! Via deze verzekering kan je geen nieuwe leden verzekeren.</strong>
      <p>Gelieve dit via de groepsadministratie te doen.</p>
      <div class="mt-3">
        <strong>
          <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/tijdelijke-verzekering-niet-leden">Meer info --></a>
        </strong>
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
