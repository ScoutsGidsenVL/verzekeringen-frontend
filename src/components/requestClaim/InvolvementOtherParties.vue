<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Betrokkenheid andere partijen" />
      <div>
        <div>
          <display-content-checkbox text="Is het ongeval te wijten aan een fout van een andere verzekerde/ of derde?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT_AREA" name="involvedPartyDescription" label="Naam en adres" rules="fillInCheck:@involvedPartyBirthdate" />
              <custom-input class="mt-1" :type="InputTypes.DATE" name="involvedPartyBirthdate" label="Geboortedatum" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Werd er een vastelling gedaan door een verbaliserende autoriteit?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="legalRepresentative" label="Welke" rules="fillInCheck:@pvNumber" />
              <custom-input class="mt-1" :type="InputTypes.TEXT" name="pvNumber" label="Eventueel nummer van proces-verbaal" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Waren er getuigen van het ongeval?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT_AREA" name="witnessName" label="Naam en adres van getuigen" />
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
          involvedPartyDescription: values.involvedPartyDescription ? values.involvedPartyDescription : undefined,
          involvedPartyBirthdate: values.involvedPartyBirthdate ? values.involvedPartyBirthdate : undefined,
          legalRepresentative: values.legalRepresentative ? values.legalRepresentative : undefined,
          pvNumber: values.pvNumber ? values.pvNumber : undefined,
          witnessName: values.witnessName ? values.witnessName : undefined,
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
