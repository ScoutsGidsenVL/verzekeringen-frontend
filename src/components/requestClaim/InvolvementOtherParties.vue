<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      {{ claimState }}
      <custom-headline-2 text="Betrokkenheid andere partijen" />
      <div>
        <div>
          <display-content-checkbox text="Is het ongeval te wijten aan een fout van een andere verzekerde/ of derde?">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT_AREA" name="involvedPartyDescription" label="Naam en adres" />
              <custom-input class="mt-1" :type="InputTypes.DATE" name="involvedPartyBirthdate" label="Geboortedatum" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Werd er een vastelling gedaan door een verbaliserende autoriteit?">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" name="pvNumber" label="Welke" />
              <custom-input class="mt-1" :type="InputTypes.TEXT" name="pvNumber" label="Eventueel nummer van proces-verbaal" />
            </div>
          </display-content-checkbox>

          <display-content-checkbox text="Waren er getuigen van het ongeval?">
            <div></div>
          </display-content-checkbox>

          <display-content-checkbox text="Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" name="leadershipdescription" label="Naam en voornaam" />
            </div>
          </display-content-checkbox>
        </div>

        <div>
          <div>
            <div class="flex gap-5">
              <div class="w-96">
                <multi-select
                  id="madeUpAtCountry"
                  :object="true"
                  track-by="label"
                  value-prop="label"
                  :repository="BelgianCitySearchRepository"
                  :resolve-on-load="true"
                  :options="[]"
                  :searchable="true"
                  label="Opgemaakt te"
                  rules="required"
                  placeholder="Zoek op naam/postcode"
                />
              </div>

              <custom-input class="mt-4 w-96" :type="InputTypes.DATE" rules="required" name="madeUpOnDate" label="Op" />
            </div>
            <custom-input class="mt-4 w-96" :type="InputTypes.TEXT" name="identityDeclarant" rules="required" label="Identiteit van de aangever (Naam en voornaam)" />
          </div>
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
import MultiSelect from '@/components/inputs/MultiSelect.vue'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'display-content-checkbox': DisplayContentCheckBox,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
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
          madeUpAtCountry: values.madeUpAtCountry,
          madeUpOnDate: values.madeUpOnDate,
          identityDeclarant: values.identityDeclarant,
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
