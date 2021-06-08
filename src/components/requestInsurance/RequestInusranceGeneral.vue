<template>
  <form @submit="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Welke" />

      <insurance-type-menu :disabled="isEdit" />

      <div class="px-5">
        <info-alert v-show="insuranceTypeState === InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN">
          <strong>OPGELET! Via deze verzekering kan je geen nieuwe leden verzekeren.</strong>
          <p>Gelieve dit via de groepsadministratie te doen.</p>
        </info-alert>
      </div>

      <div class="px-5">
        <info-alert v-show="insuranceTypeState === InsuranceTypes.REIS_BIJSTAND">
          <strong>Wat biedt de reisbijstandsverzekering meer dan de gewone ledenpolis?</strong>
          <p>Alleen geldig voor leden van Scouts en Gidsen Vlaanderen en personen die via een tijdelijke verzekering verzekerd zijn voor dezelfde periode.</p>
        </info-alert>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Wanneer" />
      <div class="px-5 flex gap-4">
        <div class="w-80">
          <custom-input :min="minDate" :type="InputTypes.DATE" rules="required" name="startDate" label="Start datum" />
        </div>
        <div class="w-80">
          <custom-input :min="minDate" :type="InputTypes.DATE" :rules="dateRuleToInsuranceType('start', insuranceTypeState)" name="endDate" label="Eind datum" />
        </div>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Groep" />
      <div class="px-5">
        <p>De factuur wordt naar de financieel verantwoordelijke van deze groep gestuurd.</p>
        <div style="width: 65%">
          <multi-select :disabled="isEdit" id="group" rules="required" placeholder="Group" track-by="fullInfo" value-prop="id" :options="user.scoutsGroups" label="Selecteer groep" />
        </div>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Aanvrager" />
      <div class="px-5">
        <insurance-applicant :applicant="values.responsibleMember" />
      </div>
    </div>

    <div class="mt-5 px-5">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import InsuranceApplicant from './insuranceApplicant/insuranceApplicant.vue'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import { dateRuleToInsuranceType } from '@/helpers/formatHelper'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { defineComponent, computed, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import moment from 'moment'
import { useRoute } from 'vue-router'

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
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const user = ref<ResponsibleMember>(store.getters.user)
    let data: any = store.getters.getCurrentInsuranceState

    const { handleSubmit, values } = useForm<BaseInsurance>({
      initialValues: {
        startDate: data.startDate ? data.startDate : '',
        endDate: data.endDate ? data.endDate : '',
        group: data.group ? data.group.id : '',
        responsibleMember: data.responsibleMember ? data.responsibleMember : user.value,
      },
    })

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const minDate = moment().add(1, 'days').format('YYYY-MM-DD')

    const onSubmit = handleSubmit(async (values: any) => {
      const generalInsuranceState = ref<BaseInsurance>({
        startDate: values.startDate,
        endDate: values.endDate,
        group: { name: values.group },
        responsibleMember: values.responsibleMember ? values.responsibleMember : user.value,
        totalCost: '1.00',
      })
      store.dispatch('setGeneralInsuranceState', generalInsuranceState)
      store.dispatch('setHolderState', HolderStates.TYPE)
    })

    return {
      dateRuleToInsuranceType,
      insuranceTypeState,
      InsuranceTypes,
      InputTypes,
      minDate,
      user,
      onSubmit,
      data,
      isEdit,
      values,
    }
  },
})
</script>
