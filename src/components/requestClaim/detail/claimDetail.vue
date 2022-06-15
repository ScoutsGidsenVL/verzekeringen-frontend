<template>
  <div v-if="isForbidden">
    <forbidden />      
  </div>

  <form v-if="checkVisibility()" id="ClaimDetail" @submit.prevent="onSubmit">
    <div v-show="isEdit" class="mt-4 mb-4">
      <navigation-arrow to="/home/schadeaangiftes" text="Terug naar overzicht" />
    </div>

    <div v-if="isEdit && (can('insurances.view_insuranceclaim_case_number') || can('insurances.view_insuranceclaim_note'))">
      <p class="font-semibold">Administratie</p>
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <custom-input
          v-show="can('insurances.view_insuranceclaim_case_number')"
          :disabled="!can('insurances.add_insuranceclaim_case_number')"
          :value="details.dossierNumber"
          class="xs:w-72 md:w-96"
          :type="InputTypes.TEXT"
          label="Dossiernummer"
          name="dossierNumber"
        />
        <custom-input
          v-show="can('insurances.view_insuranceclaim_note')"
          :disabled="!can('insurances.add_insuranceclaim_note')"
          :value="details.note"
          class="xs:w-72 md:w-96"
          :type="InputTypes.TEXT_AREA"
          label="Administratieve commentaar"
          name="note"
        />
        <custom-button text="Opslaan" />
      </div>
    </div>

    <div class="mt-2 mb-4" v-if="!isEdit">
      <div>
        <custom-headline-2 text="Bijlage" />
        <div>
          <file-upload :allowedFiles="'application/pdf,.jpg,.jpeg,.png'" />
        </div>
      </div>
    </div>

    <custom-headline-2 text="Overzicht" />

    <div class="mt-2">
      <p class="font-semibold">Wie doet de aangifte?</p>

      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <div v-if="!isEdit">
          <label-output v-if="claimState.group" label="" :text="claimState.group.name + ' - ' + claimState.group.id" />
          <label-output v-if="userData.firstName" label="" :text="userData.firstName + ' ' + userData.lastName" />
          <label-output v-if="userData.email" label="" :text="userData.email" />
          <phone-number :hasWarning="true" :phoneNumber="userData.phoneNumber" />
        </div>

        <div v-if="claimState.declarant">
          <responsible-member-detail title="" :responsible-member="claimState.declarant" />
        </div>
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Wie is het slachtoffer?</p>
      <div v-if="claimState.victim" class="md:ml-20 xs:ml-5 sm:ml-5">
        <div>
          <p>
            {{ claimState.victim.firstName + ' ' + claimState.victim.lastName }}
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
              (claimState.victim.city ? claimState.victim.city : claimState.victim.postCodeCity.city) +
              ' ' +
              (claimState.victim.country ? claimState.victim.country.name : '')
            }}
          </p>
        </div>

        <div>
          <p>
            {{ claimState.victim.email }}
          </p>
        </div>
        <p class="mb-0"><strong>Geboortedatum</strong> {{ moment(claimState.victim.birthDate).format('DD-MM-YYYY') }}</p>
        <p class="mb-0"><strong>Geslacht</strong> {{ claimState.victim.gender ? genderDisplay(claimState.victim.gender) : '' }}</p>
        <label-output v-if="claimState.victim.membershipNumber" label="Lidnummer" :text="claimState.victim.membershipNumber" />
        <label-output
          label="Bankrekeningnummer"
          :text="claimState.victim.bankAccount ? claimState.victim.bankAccount : claimState.bankAccount ? claimState.bankAccount : 'Leeg'"
        />
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Wat is er gebeurd?</p>
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <label-output label="Datum van het ongeval" :text="claimState.dateOfAccident" />
        <div>
          <strong>Het ongeval gebeurde:</strong>
        </div>

        <div v-if="claimState.activityTypes">
          <p class="mb-0" v-show="claimState.activityTypes.includes(ActivityTypes.REGULAR)">tijdens de activiteit van onze groep.</p>
          <div v-show="claimState.activityTypes.includes(ActivityTypes.TRANSPORT)">
            op de heen- of terugweg van of naar de activiteit.
            <p class="mb-0" v-show="claimState.usedTransport">Gebruikt voertuig: {{ claimState.usedTransport }}</p>
          </div>

          <p class="mb-0" v-show="claimState.activityTypes.includes(ActivityTypes.IRREGULAR_LOCATION)">Tijdens een activiteit op verplaatsing</p>
        </div>

        <label-output label="Geef een korte beschrijving van de scoutsactiviteit." :text="claimState.activity" />

        <div>
          <strong>Geef een uitgebreide beschrijving van het ongeval (oorzaken, omstandigheden, gevolgen, opgelopen verwondingen, schade).</strong>
          <div>
            <p style="max-width: 725px !important; text-align: justify">{{ claimState.description }}</p>
          </div>
        </div>

        <div v-show="claimState.damageType">
          <strong>Schade aan medisch hulpmiddel</strong>
          <div>
            <label class="block" v-show="claimState.damageType">{{ claimState.damageType }}</label>
          </div>
        </div>

        <div>
          <strong>Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?</strong>
          <div v-if="claimState.isLeadershipChecked === 'yes'">
            Ja
            <p v-if="claimState.leadershipDescription">
              {{ claimState.leadershipDescription }}
            </p>
          </div>
          <div v-if="claimState.isLeadershipChecked === 'no'">
            Neen
          </div>
          <div v-if="claimState.isLeadershipChecked === null">
            Leeg
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <p class="font-semibold">Zijn er andere personen betrokken?</p>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-1">
        <strong>Is het ongeval te wijten aan een fout van iemand anders?</strong>

        <div v-if="claimState.isInvolvedPartyChecked === 'yes'">
          Ja
        </div>
        <div v-if="claimState.isInvolvedPartyChecked === 'no'">
          Neen
        </div>

        <div v-if="claimState.isInvolvedPartyChecked === null">
          Leeg
        </div>

        <div>
          <div v-if="claimState.isInvolvedPartyChecked === 'yes'">
            <p v-if="claimState.involvedPartyName">
              {{ claimState.involvedPartyName }}
            </p>
          </div>
          <div v-if="claimState.involvedPartyDescription">
            <p>
              {{ claimState.involvedPartyDescription }}
            </p>
          </div>
        <p  v-if="claimState.involvedPartyBirthdate" class="mb-0"><strong>Geboortedatum</strong> {{ moment(claimState.involvedPartyBirthdate).format('DD-MM-YYYY') }}</p>
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-1">
        <strong>Werd er een vaststelling gedaan door een verbaliserende autoriteit (bv politie)?</strong>
        
        <div v-if="claimState.isOfficialReportChecked === 'yes'">
          Ja
        </div>

        <div v-if="claimState.isOfficialReportChecked === 'no'">
          Neen
        </div>

        <div v-if="claimState.isOfficialReportChecked === null">
            Leeg
          </div>

        <div v-if="claimState.isOfficialReportChecked === 'yes'">
          <p v-if="claimState.officialReportDescription">
            {{ claimState.officialReportDescription }}
          </p>
        </div>
        <div v-if="claimState.pvNumber">
          <p>
            {{ claimState.pvNumber }}
          </p>
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mb-1">
        <strong>Was er een getuige?</strong>
        <div v-if="claimState.isWitnessChecked === 'yes'">
          Ja
        </div>

        <div v-if="claimState.isWitnessChecked === 'no'">
          Neen
        </div>

        <div  v-if="claimState.isWitnessChecked === null">
          Leeg
        </div>

        <div v-if="claimState.isWitnessChecked === 'yes'">
          <p v-if="claimState.witnessName">
            {{ claimState.witnessName }}
          </p>
        </div>
        <div v-if="claimState.witnessDescription">
          <p>
            {{ claimState.witnessDescription }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-2 mb-4" v-if="claimState.attachmentName">
      <div>
        <custom-headline-2 text="Bijlage" />
        <div>
          {{ claimState.attachmentName }}
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

        <div class="mt-3 mb-6">
          <label-output label="Identiteit van de aangever" class="mt-1" :text="userData.lastName + ' ' + userData.firstName" />
        </div>
      </div>
    </div>

    <div v-if="isDetailPage" class="mt-4">
      <strong>Datum van de aangifte:</strong> {{claimState.createdOn}}
    </div>

    <div v-show="!isEdit" class="flex gap-3 mt-2 items-center">
      <back-button stateName="setClaimHolderState" :backToState="ClaimHolderStates.THREE" />
      <custom-button text="Verstuur je aangifte" />
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
import FileUpload from '@/components/semantic/FileUpload.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import usePermissions from '../../../helpers/usePermissions'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'
import Forbidden from '../../semantic/Forbidden.vue'

export default defineComponent({
  name: 'ClaimDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'navigation-arrow': NavigationArrow,
    'custom-button': CustomButton,
    'label-output': LabelOutput,
    'custom-input': CustomInput,
    'back-button': BackButton,
    FileUpload,
    CustomHeadline2,
    PhoneNumber,
    Forbidden
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
    const { can } = usePermissions()

    const saveFile = (file: any) => {
      saveAs(file, file.name)
    }

    const checkVisibility = () => {
      if (isEdit && !details.value.id) {
        return false
      }

      if (isForbidden.value) {
        return false 
      }

      return true
    }

    const filename = ref<string>('')
    const isForbidden = ref<boolean>(false)

    if (isEdit) {
      RepositoryFactory.get(ClaimRepository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          if (result.response && result.response.status === 403) {
            isForbidden.value = true
          }
          details.value = result
          values.dossierNumber = details.value.dossierNumber
          values.note = details.value.note
          store.dispatch('setClaimState', details.value)
          if (details.value.attachment) {
            filename.value = details.value.attachment.filename
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

    const submitting = ref<boolean>(false)

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        if (!submitting.value) {
          submitting.value = true
          if (!isEdit) {
            const newClaimState = ref<Claim>({
              declarantCity: values.declarantCity ? values.declarantCity : undefined,
              DECLARANT_DATE: values.DECLARANT_DATE ? values.DECLARANT_DATE : undefined,
            })

            store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value }).then(async () => {
              await postClaim()
                .then((result: any) => {
                  store.dispatch('setClaimHolderState', ClaimHolderStates.FIVE)
                  submitting.value = false
                })
                .catch((err: Error) => {
                  window.alert(`Er is iets misgelopen: \n${err.message}`)
                })
            })
          } else {
            if (claimState.value.id) {
              await patchClaim(claimState.value.id.toString(), { note: values.note, case_number: values.dossierNumber })
              submitting.value = false
            }
          }
        }
      })()
    }

    const patchClaim = async (id: string, data: any) => {
      await RepositoryFactory.get(ClaimRepository)
        .updateInfo(id, data)
        .then((res) => {
          console.log('patched reuslt: ', res)
        })
    }

    const postClaim = async () => {
      if (values.file) {
        claimState.value.file = values.file
      }
      await RepositoryFactory.get(ClaimRepository).create(claimState.value, claimState.value.file ? claimState.value.file : undefined)
    }

    scrollToTopOfPage()

    const genderDisplay = (gender: string) => {
      if (gender === 'M') {
        return 'M'
      }
      if (gender === 'F') {
        return 'V'
      }
    }

    return {
      BelgianCitySearchRepository,
      ClaimHolderStates,
      genderDisplay,
      ActivityTypes,
      isSubmitting,
      DamageTypes,
      InputTypes,
      claimState,
      details,
      onSubmit,
      userData,
      saveFile,
      isEdit,
      values,
      moment,
      can,
      filename,
      isForbidden,
      checkVisibility
    }
  },
})
</script>

<style lang="scss" scoped>
.input {
  width: 288px !important;
}
</style>
