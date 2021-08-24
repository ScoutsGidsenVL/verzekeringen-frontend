<template>
  <form id="ClaimDetail" @submit.prevent="onSubmit">
    <p class="py-4" style="font-size: 30px">Overzicht</p>

    <div v-show="isEdit" class="mt-4">
      <navigation-arrow to="/home/schade-aangiftes" text="Terug naar overzicht" />
    </div>

    <div v-if="false">
      <p class="font-semibold">Administratie</p>
      <div class="md:ml-20">
        <custom-input class="xs:w-72 md:w-96" :type="InputTypes.TEXT" label="Dossiernummer" name="dossierNumber" />
        <custom-input class="xs:w-72 md:w-96" :type="InputTypes.TEXT_AREA" label="Administratieve commentaar" name="administrationComment" />
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Aangever</p>

      <div class="md:ml-20">
        <label-output v-if="claimState.group" label="Groep" :text="claimState.group.name + ' - ' + claimState.group.id" />

        <div v-if="claimState.declarant" class="mt-3">
          <responsible-member-detail title="Groepleidster" :responsible-member="claimState.declarant" />
        </div>
      </div>
    </div>

    <div v-if="claimState.file" class="mt-5">
      <p class="font-semibold">Bijlage</p>

      <div class="md:ml-20">
        <div @click="saveFile(claimState.file)" class="hover:text-lightGreen cursor-pointer">
          <p class="underline">{{ claimState.file.name }} {{ (claimState.file.size / (1024 * 1024)).toFixed(2) }} MB {{ claimState.file.type ? claimState.file.type : '' }}</p>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Slachtoffer</p>
      <!-- <pre>
      {{ claimState.victim }}
      </pre> -->
      <div v-if="claimState.victim" class="md:ml-20">
        <label-output :text="claimState.victim.firstName + ' ' + claimState.victim.lastName" />
        <label-output v-if="claimState.victim.country" :text="claimState.victim.country.name" />
        <label-output
          :text="
            claimState.victim.street +
            ' ' +
            claimState.victim.number +
            (claimState.victim.letterBox ? ' Bus ' + claimState.victim.letterBox : '') +
            ', ' +
            (claimState.victim.postcode ? claimState.victim.postcode : claimState.victim.postCodeCity.postalCode) +
            ' ' +
            (claimState.victim.city ? claimState.victim.city : claimState.victim.postCodeCity.city)
          "
        />
        <label-output :text="claimState.victim.email" />
        <label-output class="mt-1" label="Geboortedatum" :text="claimState.victim.birthDate" />
        <label-output class="mt-1" label="Geslacht" :text="claimState.victim.sex" />
        <label-output v-if="claimState.victim.membershipNumber" label="Lidnummer" :text="claimState.victim.membershipNumber" />
        <label-output v-if="claimState.bankAccount" label="Bankrekeningnummer" :text="claimState.bankAccount" />
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Gegevens van het ongeval</p>
      <div class="md:ml-20">
        <label-output class="mt-1" label="Datum ongeval" :text="claimState.dateOfAccident" />
        <label-output class="mt-1" label="Tijdens welke activiteit het ongeval plaatsvond" :text="claimState.activity" />
        <div class="mt-2">
          <strong>Tijdens welke soort ongeval de activiteit plaatsvond</strong>
        </div>

        <div v-if="claimState.activityTypes" class="mt-2">
          <p v-show="claimState.activityTypes.includes(ActivityTypes.REGULAR)">Tijdens een activiteit van de hiervoor vermelde scoutsgroep</p>
          <div v-show="claimState.activityTypes.includes(ActivityTypes.TRANSPORT)">
            Verplaatsing van of naar activiteit
            <p v-show="claimState.usedTransport">Gebruikt voertuig: {{ claimState.usedTransport }}</p>
          </div>

          <p v-show="claimState.activityTypes.includes(ActivityTypes.IRREGULAR_LOCATION)">Tijdens een activiteit op verplaatsing</p>
        </div>

        <div v-show="claimState.isDamage">
          <strong>Schade aan medisch hulpmiddel</strong>
          <div>
            <label class="block" v-show="claimState.damage">{{ claimState.damage }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <p class="font-semibold">Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade</p>
      <div class="md:ml-20">
        <p style="max-width: 725px !important; text-align: justify">{{ claimState.description }}</p>
      </div>
    </div>

    <div v-if="claimState.involvedPartyDescription || claimState.officialReportDescription || claimState.witnessDescription || claimState.leadershipDescription" class="mt-5">
      <p class="font-semibold">Betrokkenheid andere partijen</p>

      <div class="md:ml-20 mb-5" v-if="claimState.involvedPartyDescription">
        <strong>Is het ongeval te wijten aan een fout van een andere verzekerde of derde?</strong>
        <div>
          <label-output v-if="claimState.involvedPartyName" class="mt-1" :text="claimState.involvedPartyName" />
          <label-output v-if="claimState.involvedPartyDescription" class="mt-1" :text="claimState.involvedPartyDescription" />
          <label-output v-if="claimState.involvedPartyBirthdate" class="mt-1" label="Geboortedatum" :text="claimState.involvedPartyBirthdate" />
        </div>
      </div>

      <div class="md:ml-20 mb-5" v-if="claimState.officialReportDescription">
        <strong>Werd er een vastelling gedaan door een verbaliserende autoriteit?</strong>
        <div>
          <label-output v-if="claimState.officialReportDescription" class="mt-1" :text="claimState.officialReportDescription" />
          <label-output v-if="claimState.pvNumber" class="mt-1" label="Nummer van proces-verbaal" :text="claimState.pvNumber" />
        </div>
      </div>

      <div class="md:ml-20 mb-5" v-if="claimState.witnessName">
        <strong>Waren er getuigen van het ongeval?</strong>
        <div>
          <label-output v-if="claimState.witnessName" class="mt-1" :text="claimState.witnessName" />
        </div>
        <div>
          <label-output v-if="claimState.witnessDescription" class="mt-1" :text="claimState.witnessDescription" />
        </div>
      </div>

      <div class="md:ml-20 mb-5" v-if="claimState.leadershipDescription">
        <strong>Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?</strong>
        <div>
          <label-output v-if="claimState.leadershipDescription" class="mt-1" :text="claimState.leadershipDescription" />
        </div>
      </div>
    </div>

    <div v-if="!isDetailPage">
      <div>
        <div class="md:flex md:gap-5">
          <div class="mt-4">
            <strong>Opgemaakt te <span class="text-red ml-1">*</span></strong>
            <custom-input class="xs:w-72 md:w-96" :type="InputTypes.TEXT" rules="required" name="declarantCity" />
          </div>
          <div class="mt-4">
            <strong>Op <span class="text-red ml-1">*</span></strong>
            <custom-input class="xs:w-72 md:w-96" :type="InputTypes.DATE" rules="required" name="DECLARANT_DATE" />
          </div>
        </div>

        <div class="mt-4">
          <label-output label="Identiteit van de aangever (Achternaam en voornaam)" class="mt-1" :text="userData.lastName + ' ' + userData.firstName" />
        </div>
      </div>
    </div>

    <div v-show="!isEdit" class="flex gap-3 mt-5 items-center">
      <back-button stateName="setClaimHolderState" :backToState="ClaimHolderStates.THREE" />
      <custom-button text="Verstuur je aanvraag" />
    </div>
  </form>
</template>

<script lang="ts">
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ClaimRepository } from '@/repositories/claims/claimRepository'
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import FileRepository from '@/repositories/fileRepository'
import CustomButton from '@/components/CustomButton.vue'
import { ActivityTypes } from '@/enums/activityTypes'
import { defineComponent, computed, ref } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { DamageTypes } from '@/enums/damageTypes'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { saveAs } from 'file-saver'
import { useStore } from 'vuex'
import moment from 'moment'

export default defineComponent({
  name: 'ClaimDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'navigation-arrow': NavigationArrow,
    'custom-button': CustomButton,
    'label-output': LabelOutput,
    'custom-input': CustomInput,
    'back-button': BackButton,
  },
  props: {
    isDetailPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const details = ref<Claim>({})
    const userData = ref<ResponsibleMember>(store.getters.user)

    const saveFile = (file: any) => {
      saveAs(file, file.name)
    }

    if (isEdit) {
      RepositoryFactory.get(ClaimRepository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          details.value = result
          store.dispatch('setClaimState', details.value)
          if (details.value.attachment) {
            RepositoryFactory.get(FileRepository)
              .downloadFile(details.value.attachment.id)
              .then((res) => {
                details.value.file = res
              })
          }
        })
    }

    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>({
      initialValues: {
        victim: details.value.victim,
        activityTypes: details.value.activityTypes,
        DECLARANT_DATE: moment().format('YYYY-MM-DD'),
        declarantCity: userData.value.city,
      },
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          declarantCity: values.declarantCity ? values.declarantCity : undefined,
          DECLARANT_DATE: values.DECLARANT_DATE ? values.DECLARANT_DATE : undefined,
        })

        store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value }).then(async () => {
          await postClaim()
        })
      })()
    }

    const postClaim = async () => {
      await RepositoryFactory.get(ClaimRepository)
        .create(claimState.value)
        .then((res) => {
          if (claimState.value.file) {
            console.log('CHECK')
            RepositoryFactory.get(FileRepository)
              .uploadFile(claimState.value.file, res.id)
              .then(() => {
                store.dispatch('setClaimHolderState', ClaimHolderStates.FIVE)
              })
          } else {
            store.dispatch('setClaimHolderState', ClaimHolderStates.FIVE)
          }
        })
    }

    scrollToTopOfPage()

    return {
      BelgianCitySearchRepository,
      ClaimHolderStates,
      ActivityTypes,
      isSubmitting,
      DamageTypes,
      InputTypes,
      claimState,
      onSubmit,
      userData,
      saveFile,
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
