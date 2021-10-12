<template>
  <form id="ClaimDetail" @submit.prevent="onSubmit">

    <div v-show="isEdit" class="mt-4 mb-4">
      <navigation-arrow to="/home/schadeaangiftes" text="Terug naar overzicht" />
    </div>

    <div v-if="isEdit">
      <p class="font-semibold">Administratie</p>
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <custom-input :value="claimState.dossierNumber" class="xs:w-72 md:w-96" :type="InputTypes.TEXT" label="Dossiernummer" name="dossierNumber" />
        <custom-input :value="claimState.note" class="xs:w-72 md:w-96" :type="InputTypes.TEXT_AREA" label="Administratieve commentaar" name="note" />
        <custom-button text="Opslaan" />
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Aangever</p>

      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <label-output v-if="claimState.group" label="" :text="claimState.group.name + ' - ' + claimState.group.id" />

        <div v-if="claimState.declarant" >
          <responsible-member-detail title="" :responsible-member="claimState.declarant" />
        </div>
      </div>
    </div>

    <div v-if="claimState.file" class="mt-2">
      <p class="font-semibold">Bijlage</p>

      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <div @click="saveFile(claimState.file)" class="hover:text-lightGreen cursor-pointer">
          <p class="underline">{{ claimState.file.name }} {{ (claimState.file.size / (1024 * 1024)).toFixed(2) }} MB {{ claimState.file.type ? claimState.file.type : '' }}</p>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Slachtoffer</p>
      <div v-if="claimState.victim" class="md:ml-20 xs:ml-5 sm:ml-5">
        <div>
          <p>
            {{ claimState.victim.firstName + ' ' + claimState.victim.lastName }}
          </p>
        </div>

        <div v-if="claimState.victim.country">
          <p>
            {{ claimState.victim.country.name }}
          </p>
        </div>

        <div>
          <p>
            {{
              claimState.victim.street +
              ' ' +
              claimState.victim.number +
              (claimState.victim.letterBox ? ' Bus ' + claimState.victim.letterBox : '') +
              ', ' +
              (claimState.victim.postcode ? claimState.victim.postcode : claimState.victim.postCodeCity.postalCode) +
              ' ' +
              (claimState.victim.city ? claimState.victim.city : claimState.victim.postCodeCity.city)
            }}
          </p>
        </div>

        <div>
          <p>
            {{ claimState.victim.email }}
          </p>
        </div>
        <label-output label="Geboortedatum" :text="claimState.victim.birthDate" />
        <label-output label="Geslacht" :text="claimState.victim.sex" />
        <label-output v-if="claimState.victim.membershipNumber" label="Lidnummer" :text="claimState.victim.membershipNumber" />
        <label-output v-if="claimState.bankAccount" label="Bankrekeningnummer" :text="claimState.bankAccount" />
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Gegevens van het ongeval</p>
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <label-output label="Datum ongeval" :text="claimState.dateOfAccident" />
        <label-output label="Tijdens welke activiteit het ongeval plaatsvond" :text="claimState.activity" />
        <div class="mt-2">
          <strong>Tijdens welke soort ongeval de activiteit plaatsvond</strong>
        </div>

        <div v-if="claimState.activityTypes">
          <p v-show="claimState.activityTypes.includes(ActivityTypes.REGULAR)">Tijdens een activiteit van de hiervoor vermelde scoutsgroep</p>
          <div v-show="claimState.activityTypes.includes(ActivityTypes.TRANSPORT)">
            Verplaatsing van of naar activiteit
            <p v-show="claimState.usedTransport">Gebruikt voertuig: {{ claimState.usedTransport }}</p>
          </div>

          <p v-show="claimState.activityTypes.includes(ActivityTypes.IRREGULAR_LOCATION)">Tijdens een activiteit op verplaatsing</p>
        </div>

        <div class="mt-3" v-show="claimState.isDamage">
          <strong>Schade aan medisch hulpmiddel</strong>
          <div>
            <label class="block" v-show="claimState.damage">{{ claimState.damage }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade</p>
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <p style="max-width: 725px !important; text-align: justify">{{ claimState.description }}</p>
      </div>
    </div>

    <div v-if="claimState.involvedPartyDescription || claimState.officialReportDescription || claimState.witnessDescription || claimState.leadershipDescription" class="mt-2">
      <p class="font-semibold">Betrokkenheid andere partijen</p>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-5" v-if="claimState.involvedPartyDescription">
        <strong>Is het ongeval te wijten aan een fout van een andere verzekerde of derde?</strong>
        <div>
          <div v-if="claimState.involvedPartyName">
            <p>
              {{ claimState.involvedPartyName }}
            </p>
          </div>
          <div v-if="claimState.involvedPartyDescription">
            <p>
              {{ claimState.involvedPartyDescription }}
            </p>
          </div>
          <label-output v-if="claimState.involvedPartyBirthdate" label="Geboortedatum" :text="claimState.involvedPartyBirthdate" />
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-5" v-if="claimState.officialReportDescription">
        <strong>Werd er een vastelling gedaan door een verbaliserende autoriteit?</strong>
        <div v-if="claimState.officialReportDescription">
          <p>
            {{ claimState.officialReportDescription }}
          </p>
        </div>
        <div v-if="claimState.pvNumber">
          <p>
            {{ claimState.pvNumber }}
          </p>
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-5" v-if="claimState.witnessName">
        <strong>Waren er getuigen van het ongeval?</strong>
        <div v-if="claimState.witnessName">
          <p>
            {{ claimState.witnessName }}
          </p>
        </div>
        <div v-if="claimState.witnessDescription">
          <p>
            {{ claimState.witnessDescription }}
          </p>
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-5" v-if="claimState.leadershipDescription">
        <strong>Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?</strong>
        <div v-if="claimState.leadershipDescription">
          <p>
            {{ claimState.leadershipDescription }}
          </p>
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

    <div v-show="!isEdit" class="flex gap-3 mt-2 items-center">
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
        if (!isEdit) {
          const newClaimState = ref<Claim>({
            declarantCity: values.declarantCity ? values.declarantCity : undefined,
            DECLARANT_DATE: values.DECLARANT_DATE ? values.DECLARANT_DATE : undefined,
          })

          store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value }).then(async () => {
            await postClaim()
          }).then(() => {
            // store.dispatch('setClaimHolderState', ClaimHolderStates.FIVE)
          })
        } else {
          if (claimState.value.id) {
            await patchClaim(claimState.value.id.toString(), { note: values.note, case_number: values.dossierNumber })
          }
        }
      })()
    }

    const patchClaim = async (id: string, data: any) => {
      await RepositoryFactory.get(ClaimRepository).updateInfo(id, data).then((res) => {
        console.log('patched reuslt: ', res)
      })
    }

    const postClaim = async () => {
      await RepositoryFactory.get(ClaimRepository).create(claimState.value)
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
