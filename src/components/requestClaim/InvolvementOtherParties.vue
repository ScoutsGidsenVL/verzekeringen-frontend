<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Betrokkenheid andere partijen" />
      <custom-headline-3 style="margin-top: -3.5em" text="Vul deze gegevens enkel in indien van toepassing. Je mag dit ook leeg laten." />

      <div>
        <div>
          <display-content-checkbox text="Is het ongeval te wijten aan een fout van een andere verzekerde of derde?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="involvedPartyName" label="Naam" rules="fillInCheck:@involvedPartyDescription" />
              <custom-input :type="InputTypes.TEXT" name="involvedPartyDescription" label="Adres" rules="fillInCheck:@involvedPartyBirthdate" />
              <custom-input class="mt-1" :type="InputTypes.DATE" name="involvedPartyBirthdate" label="Geboortedatum" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Werd er een vastelling gedaan door een verbaliserende autoriteit?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="officialReportDescription" label="Welke" rules="fillInCheck:@pvNumber" />
              <custom-input class="mt-1" :type="InputTypes.TEXT" name="pvNumber" label="Nummer van proces-verbaal" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Waren er getuigen van het ongeval?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="witnessName" label="Naam" />
            </div>
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="witnessDescription" label="Adres" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="leadershipDescription" label="Voornaam en achternaam" />
            </div>
          </display-content-checkbox>
        </div>
      </div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import CustomHeadline3 from '@/components/customHeadlines/CustomHeadline3.vue'

import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, computed, ref } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import DisplayContentCheckBox from '@/components/semantic/displayContentCheckbox.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-headline-3': CustomHeadline3,
    'custom-button': CustomButton,
    'display-content-checkbox': DisplayContentCheckBox,
    'custom-input': CustomInput,
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>({
      initialValues: {},
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          involvedPartyName: values.involvedPartyName ? values.involvedPartyName : undefined,
          involvedPartyDescription: values.involvedPartyDescription ? values.involvedPartyDescription : undefined,
          involvedPartyBirthdate: values.involvedPartyBirthdate ? values.involvedPartyBirthdate : undefined,
          officialReportDescription: values.officialReportDescription ? values.officialReportDescription : undefined,
          pvNumber: values.pvNumber ? values.pvNumber : undefined,
          witnessName: values.witnessName ? values.witnessName : undefined,
          witnessDescription: values.witnessDescription ? values.witnessDescription : undefined,
          leadershipDescription: values.leadershipDescription ? values.leadershipDescription : undefined,
        })

        store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value })
        store.dispatch('setClaimHolderState', ClaimHolderStates.FOUR)
      })()
    }

    scrollToTopOfPage()

    return {
      BelgianCitySearchRepository,
      isSubmitting,
      InputTypes,
      claimState,
      onSubmit,
      isEdit,
      values,
    }
  },
})
</script>

<style lang="scss" scoped>
.input {
  width: 288px !important;
}
</style>
