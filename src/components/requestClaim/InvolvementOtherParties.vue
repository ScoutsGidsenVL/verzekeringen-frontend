<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Betrokkenheid andere partijen" />
      <div>
        <div>
          <display-content-checkbox text="Is het ongeval te wijten aan een fout van een andere verzekerde/ of derde?" @changeBoolean="changeBoolean($event, 0)">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT_AREA" name="involvedPartyDescription" label="Naam en adres" />
              <custom-input class="mt-1" :type="InputTypes.DATE" name="involvedPartyBirthdate" label="Geboortedatum" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Werd er een vastelling gedaan door een verbaliserende autoriteit?" @changeBoolean="changeBoolean($event, 1)">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" name="authorityDescription" label="Welke" />
              <custom-input class="mt-1" :type="InputTypes.TEXT" name="pvNumber" label="Eventueel nummer van proces-verbaal" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Waren er getuigen van het ongeval?" @changeBoolean="changeBoolean($event, 2)">
            <div>
              <custom-input :type="InputTypes.TEXT_AREA" name="witnessDescription" label="Naam en adres van getuigen" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?" @changeBoolean="changeBoolean($event, 3)">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" name="leadershipDescription" label="Naam en voornaam" />
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
      initialValues: {
        involvedPartiesChoices: [false, false, false, false],
      },
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          madeUpAtCountry: values.madeUpAtCountry,
          madeUpOnDate: values.madeUpOnDate,
          identityDeclarant: values.identityDeclarant,
          involvedPartiesChoices: values.involvedPartiesChoices,
          involvedPartyDescription: values.involvedPartiesChoices[0] ? values.involvedPartyDescription : undefined,
          involvedPartyBirthdate: values.involvedPartiesChoices[0] ? values.involvedPartyBirthdate : undefined,
          authorityDescription: values.involvedPartiesChoices[1] ? values.authorityDescription : undefined,
          pvNumber: values.involvedPartiesChoices[1] ? values.pvNumber : undefined,
          witnessDescription: values.involvedPartiesChoices[2] ? values.witnessDescription : undefined,
          leadershipDescription: values.involvedPartiesChoices[3] ? values.leadershipDescription : undefined,
        })

        store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value })
        store.dispatch('setClaimHolderState', ClaimHolderStates.FOUR)
      })()
    }

    scrollToTopOfPage()

    const changeBoolean = (bool: boolean, pos: number) => {
      if (values.involvedPartiesChoices) {
        values.involvedPartiesChoices[pos] = bool
      }
    }

    return {
      BelgianCitySearchRepository,
      changeBoolean,
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
