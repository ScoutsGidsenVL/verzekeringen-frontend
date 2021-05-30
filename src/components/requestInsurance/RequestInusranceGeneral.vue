<template>
  <Form @submit="setHolderState()">
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
        <custom-input :value="startDate" :type="InputTypes.DATE" rules="required" name="start" label="Start datum" @onChange="startDateChanged($event)" />
        <custom-input :value="endDate" :type="InputTypes.DATE" rules="required" name="end" label="Eind datum" @onChange="endDateChanged($event)" />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Groep" />
      <div class="px-5">
        <p>De factuur wordt naar de financieel verantwoordelijke van deze groep gestuurd.</p>
        <multi-select id="group" rules="required" placeholder="Group" :value="group" track-by="value" :options="fetchGroups()" label="Selecteer groep" @onChange="groupChanged($event)" />
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
import { defineComponent, computed, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { Form } from 'vee-validate'
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

    const startDate = ref<string>('')
    const endDate = ref<string>('')
    const group = ref<string>('')

    const startDateChanged = (event: any) => {
      startDate.value = event
    }

    const endDateChanged = (event: any) => {
      endDate.value = event
    }

    const groupChanged = (event: any) => {
      group.value = event
    }

    const fetchGroups = () => {
      return [{ value: 'X9002G' }, { value: 'ASDFGEH' }]
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const setHolderState = () => {
      store.dispatch('setOneTimeActivityState', {
        startDate: startDate.value,
        endDate: endDate.value,
        group: group.value,
      })

      store.dispatch('setHolderState', HolderStates.TYPE)
    }

    return {
      insuranceTypeState,
      InsuranceTypes,
      setHolderState,
      fetchGroups,
      InputTypes,
      startDate,
      endDate,
      group,
      startDateChanged,
      endDateChanged,
      groupChanged,
    }
  },
})
</script>
