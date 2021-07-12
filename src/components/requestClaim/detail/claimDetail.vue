<template>
  <form id="ClaimDetail" @submit.prevent="onSubmit">
    <p class="py-4" style="font-size: 30px">Overzicht <strong class="font-semibold">schade aangifte</strong></p>

    <div>
      <p class="font-semibold">Identiteit van de verzekeringsnemer</p>

      <div class="px-5">
        <label-output label="Groep" :text="claimState.group.fullInfo" />
        <div class="mt-3">
          <responsible-member-detail title="Groepleidster" :responsible-member="claimState.groupLeader" />
        </div>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Identiteit van het slachtoffer</p>
      <div class="px-5">
        <label-output :text="claimState.victim.firstName + ' ' + claimState.victim.lastName" />
        <label-output :text="claimState.victim.country.name" />
        <label-output
          :text="
            claimState.victim.street +
            ' ' +
            claimState.victim.number +
            (claimState.victim.letterBox ? ' Bus ' + claimState.victim.letterBox : '') +
            ', ' +
            claimState.victim.postCodeCity.postalCode +
            ' ' +
            claimState.victim.postCodeCity.city
          "
        />
        <label-output :text="claimState.victim.email" />
        <label-output class="mt-1" label="Geboortedatum" :text="claimState.victim.birthDate" />
        <label-output label="Lidnummer" :text="claimState.victim.membershipNumber" />
        <label-output label="Bankrekeningnummer" :text="claimState.victim.bankNumber" />
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Gegevens van het ongeval</p>
      <div class="px-5">
        <label-output class="mt-1" label="Datum ongeval" :text="claimState.dateOfAccident" />
        <label-output class="mt-1" label="Tijdens welke activiteit het ongeval plaatsvond" :text="claimState.activity" />
        <div class="mt-2">
          <strong>Tijdens welke soort ongeval de activiteit plaatsvond</strong>
        </div>
        <div class="mt-2">
          <form>
            <div>
              <input
                :disabled="true"
                :id="ActivityTypes.REGULAR"
                v-model="claimState.activityTypes"
                class="cursor-pointer"
                type="checkbox"
                :name="ActivityTypes.REGULAR"
                :value="ActivityTypes.REGULAR"
              />
              <label :for="ActivityTypes.REGULAR" class="ml-1">Tijdens een activiteit van de hierdoor vermelde scoutsgroep</label>
            </div>

            <div>
              <input
                :disabled="true"
                :id="ActivityTypes.IRREGULAR_LOCATION"
                v-model="claimState.activityTypes"
                class="cursor-pointer"
                type="checkbox"
                :name="ActivityTypes.IRREGULAR_LOCATION"
                :value="ActivityTypes.IRREGULAR_LOCATION"
              />
              <label :for="ActivityTypes.IRREGULAR_LOCATION" class="ml-1">Tijdens een activiteit op verplaatsing</label>
            </div>

            <div>
              <input
                :disabled="true"
                :id="ActivityTypes.TRANSPORT"
                v-model="claimState.activityTypes"
                class="cursor-pointer"
                type="checkbox"
                :name="ActivityTypes.TRANSPORT"
                :value="ActivityTypes.TRANSPORT"
              />
              <label :for="ActivityTypes.TRANSPORT" class="ml-1">Verplaatsing van of naar activiteit</label>
            </div>
          </form>
        </div>
        <strong>Schade aan medisch hulpmiddel</strong>

        <label-output class="mt-1" :text="claimState.damageType === DamageTypes.GLASSES ? 'Bril schade' : 'Materiële schade'" />
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade</p>
      <div class="px-5">
        <p style="max-width: 725px !important; text-align: justify">{{ claimState.officialReportDescription }}</p>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Betrokkenheid andere partijen</p>
      <div class="px-5 w-96">
        <div class="flex">
          <label-output class="mt-1 w-72" label="Opgemaakt te" :text="claimState.madeUpAtCountry.postalCode + ' ' + claimState.madeUpAtCountry.city" />
          <label-output class="mt-1 w-48" label="Op" :text="claimState.madeUpOnDate" />
        </div>
        <label-output class="mt-1" label="Identiteit van de aangever" :text="claimState.identityDeclarant" />
      </div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Bevestig" />
    </div>
  </form>
</template>

<script lang="ts">
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, computed, ref } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { ActivityTypes } from '@/enums/activityTypes'
import { DamageTypes } from '@/enums/damageTypes'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'custom-button': CustomButton,
    'label-output': LabelOutput,
    'responsible-member-detail': ResponsibleMemberDetail,
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
          victimMemberGroupAdminId: values,
        })

        store.dispatch('setClaimState', newClaimState)
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
      ActivityTypes,
      DamageTypes,
    }
  },
})
</script>

<style lang="scss" scoped>
.input {
  width: 288px !important;
}
</style>
