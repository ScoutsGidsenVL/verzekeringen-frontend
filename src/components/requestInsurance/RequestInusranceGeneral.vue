<template>
  <div class="mb-5">
    <custom-headline-2 text="Welke" />
    <insurance-type-menu />
  </div>

  <div class="mb-5">
    <custom-headline-2 text="Wanneer" />
    <div class="px-5 flex gap-4">
      <custom-input :type="InputTypes.DATE" text="Start datum" />
      <custom-input :type="InputTypes.DATE" text="Eind datum" />
    </div>
  </div>

  <div class="mb-5">
    <custom-headline-2 text="Groep" />
    <div class="px-5">
      <p>De factuur wordt naar de financieel verantwoordelijke van deze groep gestuurd.</p>
    </div>
  </div>

  <div class="mb-5">
    <custom-headline-2 text="Aanvrager" />
    <div class="px-5">
      <insurance-applicant />
    </div>
  </div>

  <div class="mb-5">
    <div class="px-5">
      <custom-button text="Volgende" @click="setHolderState()" />
    </div>
  </div>
</template>

<script lang="ts">
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import InsuranceApplicant from './insuranceApplicant/insuranceApplicant.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'insurance-type-menu': InsuranceTypeMenu,
    'insurance-applicant': InsuranceApplicant,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.TYPE)
    }
    return {
      setHolderState,
      InputTypes,
    }
  },
})
</script>
