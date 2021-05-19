<template>
  <custom-headline-2 text="Welke" />
  <div class="px-5">
    <insurance-type-menu />
  </div>
  <custom-headline-2 text="Wanneer" />
  <custom-input :type="InputTypes.DATE" text="Start datum: " />
  <custom-headline-2 text="Groep" />
  <custom-headline-2 text="Aanvrager" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { InputTypes } from '@/enums/inputTypes'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'insurance-type-menu': InsuranceTypeMenu,
    'custom-headline-2': CustomHeadline2,
    'custom-input': CustomInput,
  },
  setup() {
    return {
      InputTypes,
    }
  },
})
</script>
