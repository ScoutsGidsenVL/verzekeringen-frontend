<template>
  <vee-form @submit="setHolderState(values)" :validation-schema="schema">
    <!-- <custom-input :type="InputTypes.TEXT" name="test" label="test" success-message="Nice to meet you!" /> -->

    <div class="mb-5">
      <custom-headline-2 text="Welke" />
      <insurance-type-menu />
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Wanneer" />
      <div class="px-5 flex gap-4">
        <custom-input :type="InputTypes.DATE" name="start" label="Start datum" />
        <custom-input :type="InputTypes.DATE" name="end" label="Eind datum" />
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
        <custom-button text="Volgende" />
      </div>
    </div>
  </vee-form>
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

import { Form } from 'vee-validate'
import * as Yup from 'yup'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'insurance-type-menu': InsuranceTypeMenu,
    'insurance-applicant': InsuranceApplicant,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'vee-form': Form,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.TYPE)
    }

    const schema = Yup.object().shape({
      start: Yup.string().required(),
      end: Yup.string().required(),
      gsm: Yup.string().required(),
    })

    return {
      setHolderState,
      InputTypes,
      schema,
    }
  },
})
</script>
