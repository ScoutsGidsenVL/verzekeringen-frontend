<template>
  <form id="ClaimDetail" @submit.prevent="onSubmit">
    <p class="py-4" style="font-size: 30px">Overzicht <strong class="font-semibold">schade aangifte</strong></p>

    <div>
      <p class="font-semibold">Identiteit van de verzekeringsnemer</p>

      <div class="ml-5">
        <label-output label="Groep" :text="claimState.group && claimState.group.fullInfo" />
        <div class="mt-3">
          <responsible-member-detail title="Groepleidster" :responsible-member="claimState.groupLeader" />
        </div>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Identiteit van het slachtoffer</p>
      <div class="ml-5">
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
      <div class="ml-5">
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
        <div>
          <input :disabled="true" :id="'damage'" v-model="claimState.isDamage" class="cursor-pointer" type="checkbox" :name="'damage'" :value="true" />
          <label :for="'damage'" class="ml-1">Bril-/materiële schade</label>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade</p>
      <div class="ml-5">
        <p style="max-width: 725px !important; text-align: justify">{{ claimState.officialReportDescription }}</p>
      </div>
    </div>

    <div v-if="claimState.involvedPartiesChoices.includes(true)" class="mt-5">
      <p class="font-semibold">Betrokkenheid andere partijen</p>

      <div class="ml-5 mb-5" v-if="claimState.involvedPartiesChoices[0] === true">
        <strong>Is het ongeval te wijten aan een fout van een andere verzekerde/ of derde?</strong>
        <div>
          <label-output v-if="claimState.involvedPartyDescription" class="mt-1" :text="claimState.involvedPartyDescription" />
          <label-output v-if="claimState.involvedPartyBirthdate" class="mt-1" label="Geboortedatum" :text="claimState.involvedPartyBirthdate" />
        </div>
      </div>

      <div class="ml-5 mb-5" v-if="claimState.involvedPartiesChoices[1] === true">
        <strong>Werd er een vastelling gedaan door een verbaliserende autoriteit?</strong>
        <div>
          <label-output v-if="claimState.authorityDescription" class="mt-1" :text="claimState.authorityDescription" />
          <label-output v-if="claimState.pvNumber" class="mt-1" label="Eventueel nummer van proces-verbaal" :text="claimState.pvNumber" />
        </div>
      </div>

      <div class="ml-5 mb-5" v-if="claimState.involvedPartiesChoices[2] === true">
        <strong>Waren er getuigen van het ongeval?</strong>
        <div>
          <label-output v-if="claimState.witnessDescription" class="mt-1" :text="claimState.witnessDescription" />
        </div>
      </div>

      <div class="ml-5 mb-5" v-if="claimState.involvedPartiesChoices[2] === true">
        <strong>Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?</strong>
        <div>
          <label-output v-if="claimState.leadershipDescription" class="mt-1" :text="claimState.leadershipDescription" />
        </div>
      </div>
    </div>

    <div>
      <div>
        <div class="md:flex md:gap-5">
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
          <div class="mt-4">
            <strong>Op <span class="text-red ml-1">*</span></strong>
            <custom-input class="w-96" style="margin-top: 0.5em" :type="InputTypes.DATE" rules="required" name="madeUpOnDate" />
          </div>
        </div>
        <custom-input class="mt-4 w-96" :type="InputTypes.TEXT" name="identityDeclarant" rules="required" label="Identiteit van de aangever (Naam en voornaam)" />
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
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'custom-button': CustomButton,
    'label-output': LabelOutput,
    'responsible-member-detail': ResponsibleMemberDetail,
    'multi-select': MultiSelect,
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
