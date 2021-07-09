<template>
  <form id="RequestClaimIdentities" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Identiteit van de verzekeringsnemer" />

      <div class="flex px-5" style="margin-top: -2em">
        <div style="width: 40%">
          <multi-select
            id="group"
            :object="true"
            :disabled="isEdit"
            rules="required"
            placeholder="Groep"
            track-by="fullInfo"
            value-prop="id"
            :options="userData.scoutsGroups"
            label="Selecteer de verzekerde scoutsgroep"
            :loading-submit="isSubmitting"
          />
        </div>
      </div>

      <div class="px-5 mt-5">
        <strong>
          <label>Groepleidster</label>
        </strong>
        <insurance-applicant :applicant="userData" />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Identiteit van het slachtoffer" />
      <div class="px-5 w-96">
        <custom-input :type="InputTypes.TEXT" rules="required" name="bankrekeningnummer" label="Bankrekeningnummer" :maxlength="19" />
      </div>
    </div>

    <div class="px-5">
      <question-disclaimer>
        Ethias beperkt technisch voorlopig de keuze tot 'M' of 'V'; Scouts en Gidsen Vlaanderen gaat hierover met hen in dialoog om een oplossing te vinden zodat we genderneutraal binnen scouting
        kunnen communiceren.
      </question-disclaimer>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import InsuranceApplicant from '@/components/requestInsurance/insuranceApplicant/insuranceApplicant.vue'
import QuestionDisclaimer from '@/components/disclaimers/questionDisclaimer.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, computed, ref } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestClaimIdentities',
  components: {
    'question-disclaimer': QuestionDisclaimer,
    'insurance-applicant': InsuranceApplicant,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const userData = ref<ResponsibleMember>(store.getters.user)

    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>({
      initialValues: {},
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const claimState = ref<Claim>({
          id: values.id,
          group: values.group,
        })
        console.log(values)

        store.dispatch('setClaimState', claimState)
        store.dispatch('setClaimHolderState', ClaimHolderStates.TWO)
      })()
    }

    scrollToTopOfPage()

    return {
      isSubmitting,
      InputTypes,
      claimState,
      userData,
      onSubmit,
      isEdit,
      values,
    }
  },
})
</script>
