<template>
  <Form v-slot="{ values }" @submit="setHolderState(values)">
    {{ values }}
    <div class="mb-5">
      <custom-headline-2 text="Welke" />

      <insurance-type-menu />

      <div class="px-5">
        <info-alert v-show="insuranceTypeState === InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN">
          <strong>OPGELET! Via deze verzekering kan je geen nieuwe leden verzekeren. </strong>
          <p>Gelieve dit via de groepsadministratie te doen.</p>
        </info-alert>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Wanneer" />
      <div class="px-5 flex gap-4">
        <custom-input :type="InputTypes.DATE" rules="required" name="start" label="Start datum" />
        <custom-input :type="InputTypes.DATE" rules="required" name="end" label="Eind datum" />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Groep" />
      <div class="px-5">
        <p>De factuur wordt naar de financieel verantwoordelijke van deze groep gestuurd.</p>
        <multi-select id="group" track-by="value" :options="fetchGroups()" label="Selecteer groep" rules="required" placeholder="Group" />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Aanvrager" />
      <div class="px-5">
        <insurance-applicant />
      </div>
    </div>

    <div class="mt-5 px-5">
      <custom-button text="Volgende" />
    </div>
  </Form>
</template>

<script lang="ts">
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import InsuranceApplicant from './insuranceApplicant/insuranceApplicant.vue'
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent, computed } from 'vue'
import { Form, useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'insurance-type-menu': InsuranceTypeMenu,
    'insurance-applicant': InsuranceApplicant,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'info-alert': InfoAlert,
    Form,
  },
  setup() {
    const store = useStore()

    const { handleSubmit } = useForm<any>()
    const onSubmit = handleSubmit(async (values: any) => {
      console.log('values:', values)
    })

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const setHolderState = (values: any) => {
      console.log('values:', values)
      store.dispatch('setHolderState', HolderStates.TYPE)
    }

    const fetchGroups = () => {
      return [{ value: 'Group 1' }, { value: 'Group 2' }]
    }

    return {
      insuranceTypeState,
      InsuranceTypes,
      setHolderState,
      fetchGroups,
      InputTypes,
      onSubmit,
    }
  },
})
</script>
