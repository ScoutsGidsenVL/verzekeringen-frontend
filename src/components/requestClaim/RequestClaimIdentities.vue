<template>
  <form id="RequestClaimIdentities" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Aangever" />

      <div class="md:ml-20 xs:ml-5 sm:ml-5" style="margin-top: -2em">
        <div style="width: 600px">
          <multi-select
            id="group"
            :object="true"
            :disabled="isEdit"
            rules="required"
            placeholder="Groep"
            track-by="fullInfo"
            value-prop="id"
            :options="userData.scoutsGroups"
            label="Selecteer je groep"
            :loading-submit="isSubmitting"
          />
        </div>
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mt-5">
        <insurance-applicant :applicant="userData" />
      </div>

      <div class="md:ml-20 xs:ml-5 sm:ml-5 mt-5">
        <info-alert>
          <p>
            Is er iets niet juist? pas het dan aan in de <strong><a target="_blank" href="https://groepsadmin.scoutsengidsenvlaanderen.be/">groepsadmin</a></strong> en klik op refresh.<custom-button
              :loadingSubmit="isRefreshing"
              type="button"
              class="ml-20 mt-2"
              text="Refresh"
              @click="refreshGroups()"
            />
          </p>
        </info-alert>
      </div>
    </div>

    <div>
      <custom-headline-2 text="Bijlage" />
      <div class="ml-5">
        <file-upload />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Slachtoffer" />

      <div class="md:ml-20 xs:ml-5 sm:ml-5 my-3">
        <div>
          <strong class="cursor-pointer text-lightGreen hover:text-green" @click="openMemberSideBar()">+ Kies een lid</strong>
          of
          <strong class="cursor-pointer text-lightGreen" @click="displayFields()">vul manueel in</strong>
          <members-side-bar v-model:isDisplay="isMemberSideBarDisplay" :close-on-add="true" :existing-list="members" title="Lid" @addMemberToList="addMember($event)" />
        </div>

        <div v-show="false" class="mt-3">
          <div>
            <strong class="cursor-pointer text-lightGreen" @click="openNonMemberSideBar()"> Kies een niet-lid</strong>
          </div>
          <non-member-side-bar
            isOverflowHidden="false"
            v-model:side-bar-state="nonMemberSideBarState"
            :close-on-add="true"
            :existing-list="nonMembers"
            title="Niet lid"
            @addCreatedNonMemberToList="addCreatedNonMember($event)"
          />
        </div>
      </div>

      <div v-show="isFieldsVisible">
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <div class="sm:flex sm:gap-2 xs:w-72 sm:w-100">
            <custom-input :disabled="isSelectedVictim" :type="InputTypes.TEXT" rules="required" name="victim.firstName" label="Voornaam" />
            <custom-input :disabled="isSelectedVictim" :type="InputTypes.TEXT" rules="required" name="victim.lastName" label="Achternaam" />
          </div>

          <div class="sm:mt-3 sm:flex sm:gap-2 xs:w-72 sm:w-100">
            <custom-input class="streetInput" :type="InputTypes.TEXT" rules="required" name="victim.street" label="Straat" />
            <custom-input :type="InputTypes.TEXT" rules="required" name="victim.number" label="Nummer" />
            <div>
              <strong>Bus</strong>
              <custom-input class="mt-3" :type="InputTypes.TEXT" name="victim.letterBox" />
            </div>
          </div>
        </div>

        <div :class="'md:ml-20 xs:ml-5 sm:ml-5 sm:flex sm:gap-2'">
          <div v-if="(values.victim && values.victim.country && values.victim.country.name === '') || (values.victim.country && values.victim.country.name === 'België')">
            <div class="input">
              <multi-select
                id="victim.postCodeCity"
                :object="true"
                track-by="label"
                value-prop="label"
                :repository="BelgianCitySearchRepository"
                :resolve-on-load="true"
                :options="[]"
                :searchable="true"
                label="Gemeente"
                rules="required"
                placeholder="Zoek op naam/postcode"
              />
            </div>
          </div>

          <div class="mt-4 ml-3">
            <label-output label="Land" :text="'België'" />
          </div>
        </div>

        <div class="mt-3 md:ml-20 xs:ml-5 sm:ml-5 sm:flex sm:gap-5">
          <div>
            <custom-input rules="required" class="input" :loading-submit="isSubmitting" :type="InputTypes.DATE" name="victim.birthDate" label="Geboortedatum" />
          </div>

          <div class="xs:mt-3">
            <form action="">
              <strong>Geslacht <required rules="required" /></strong>

              <div class="mt-3 flex gap-4">
                <custom-input v-show="false" :type="'victim.gender'" rules="required" name="victim.gender" />
                <div>
                  <input :id="'M'" v-model="selectedGender" class="cursor-pointer" type="radio" :name="'M'" :value="'M'" />
                  <label :for="'M'" class="ml-1">M</label>
                </div>

                <div>
                  <input :id="'V'" v-model="selectedGender" class="cursor-pointer" type="radio" :name="'F'" :value="'F'" />
                  <label :for="'V'" class="ml-1">V</label>
                </div>

                <div v-if="false">
                  <input :id="'X'" v-model="selectedGender" class="cursor-pointer" type="radio" :name="'O'" :value="'O'" />
                  <label :for="'X'" class="ml-1">X</label>
                </div>

                <div style="margin-top: 1px">
                  <question-disclaimer>
                    Ethias beperkt technisch voorlopig de keuze tot 'M' of 'V'; Scouts en Gidsen Vlaanderen gaat hierover met hen in dialoog om een oplossing te vinden zodat we genderneutraal binnen
                    scouting kunnen communiceren.
                  </question-disclaimer>
                </div>
              </div>

              <ErrorMessage name="victim.gender" class="text-red text-sm block my-2 w-36" />
            </form>
          </div>
        </div>

        <div class="md:ml-20 xs:ml-5 sm:ml-5 mt-3">
          <div>
            <custom-input class="input" :type="InputTypes.TEXT" rules="required" name="victim.email" label="E-mail" />
            <p class="input text-2xs mt-1">
              <i> Als het slachtoffer minderjarig is, vul dan het mailadres van de opvoedingsverantwoordelijke (ouders, voogd) in. </i>
            </p>
          </div>
        </div>

        <div class="mt-3 md:ml-20 xs:ml-5 sm:ml-5 w-72">
          <custom-input :type="InputTypes.TEXT" rules="bankAccountLength:victim.bankAccount" name="victim.bankAccount" label="Bankrekeningnummer" :maxlength="19" />
        </div>

        <div v-if="values.victim && values.victim.membershipNumber" class="mt-3 md:ml-20 xs:ml-5 sm:ml-5 w-72">
          <custom-input :disabled="true" :type="InputTypes.TEXT" name="victim.membershipNumber" label="Lidnummer" />
        </div>
        <div class="mt-3 md:ml-20 xs:ml-5 sm:ml-5" v-else>
          <info-alert>
            <p>Dit lid heeft geen lid-nummer en zal als kapoen worden aanschouwen.</p>
          </info-alert>
        </div>
      </div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import InsuranceApplicant from '@/components/requestInsurance/insuranceApplicant/insuranceApplicant.vue'
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberSideBar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import QuestionDisclaimer from '@/components/disclaimers/questionDisclaimer.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { CountryRepository } from '@/repositories/countriesRepository'
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { Country, CountryDeserializer } from '@/serializer/Country'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import AuthRepository from '@/repositories/authRepository'
import { sideBarState } from 'vue-3-component-library'

import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, computed, ref, watch } from 'vue'
import { NonMember } from '@/serializer/NonMember'
import { Claim } from '@/serializer/claims/claim'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { useForm, ErrorMessage } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Required from '@/components/semantic/Required.vue'
import FileUpload from '@/components/semantic/FileUpload.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'

export default defineComponent({
  name: 'RequestClaimIdentities',
  components: {
    'question-disclaimer': QuestionDisclaimer,
    'insurance-applicant': InsuranceApplicant,
    'non-member-side-bar': NonMemberSideBar,
    'custom-headline-2': CustomHeadline2,
    'members-side-bar': MemberSideBar,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'file-upload': FileUpload,
    'info-alert': InfoAlert,
    'label-output': LabelOutput,
    ErrorMessage,
    Required,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const initialCountry = ref<Country>(CountryDeserializer({ id: '3232', name: 'België' }))
    const nonMemberSideBarState = ref<sideBarState<NonMember>>({ state: 'hide' })
    const userData = ref<ResponsibleMember>(store.getters.user)
    const isMemberSideBarDisplay = ref<boolean>(false)
    const { scrollToTopOfPage } = useScrollToTop()
    const selectedGender = ref<string>()
    const isEdit = !!route.params.id
    const isFieldsVisible = ref<boolean>(false)
    const isSelectedVictim = ref<boolean>(false)

    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>({
      initialValues: {
        group: userData.value.scoutsGroups && userData.value.scoutsGroups[0] ? userData.value.scoutsGroups[0] : undefined,
        victim: {
          country: initialCountry.value,
        },
      },
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestClaimIdentities'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          id: values.id,
          group: values.group,
          groupLeader: userData.value,
          victim: values.victim,
          victimMember: values.victim.isMember ? values.victimMember : undefined,
          victimNonMember: !values.victim.isMember ? values.victimMember : undefined,
          file: values.file,
          sex: values.victim.sex,
          victimBirthDate: values.victim.birthDate,
          victimEmail: values.victim.email,
        })

        store.dispatch('setClaimState', newClaimState)
        store.dispatch('setClaimHolderState', ClaimHolderStates.TWO)
      })()
    }

    const isRefreshing = ref<boolean>(false)
    const refreshGroups = () => {
      isRefreshing.value = true
      RepositoryFactory.get(AuthRepository)
        .me()
        .then((user: any) => {
          store.dispatch('setUser', user).then(() => {
            userData.value = store.getters.user
            isRefreshing.value = false
          })
        })
    }

    const openMemberSideBar = () => {
      isMemberSideBarDisplay.value = true
    }

    const openNonMemberSideBar = () => {
      nonMemberSideBarState.value = { state: 'new' }
    }

    const addMember = (member: Member) => {
      if (values.victim) {
        displayFields()
        values.victimMember = member.id
        values.victim.id = member.id
        values.victim.firstName = member.firstName
        values.victim.lastName = member.lastName
        values.victim.street = member.street
        values.victim.number = member.number
        values.victim.letterBox = member.letterBox
        values.victim.postCodeCity = member.postCodeCity
        values.victim.birthDate = member.birthDate
        values.victim.gender = member.sex
        values.victim.email = member.email
        values.victim.membershipNumber = member.membershipNumber
        values.victim.isMember = member.isMember
        values.victim.groupAdminId = member.isMember ? member.groupAdminId : undefined
        values.victim.nonMember = !member.isMember ? member.id : undefined
        selectedGender.value = member.sex
      }
      isSelectedVictim.value = true
    }

    const displayFields = () => {
      if (isSelectedVictim.value && values.victim) {
        values.victimMember = ''
        values.victim.id = ''
        values.victim.firstName = ''
        values.victim.lastName = ''
        values.victim.street = ''
        values.victim.number = ''
        values.victim.letterBox = ''
        values.victim.postCodeCity = undefined
        values.victim.birthDate = ''
        values.victim.email = ''
        values.victim.membershipNumber = ''
        values.victim.isMember = false
        values.victim.gender = ''
        values.victim.bankAccount = ''
      }

      isSelectedVictim.value = false
      isFieldsVisible.value = true
    }

    scrollToTopOfPage()

    watch(
      () => selectedGender.value,
      () => {
        if (values.victim) {
          values.victim.gender = selectedGender.value
        }
      }
    )

    return {
      BelgianCitySearchRepository,
      isMemberSideBarDisplay,
      nonMemberSideBarState,
      openNonMemberSideBar,
      openMemberSideBar,
      CountryRepository,
      isFieldsVisible,
      displayFields,
      refreshGroups,
      isRefreshing,
      isSubmitting,
      InputTypes,
      claimState,
      addMember,
      userData,
      onSubmit,
      selectedGender,
      isEdit,
      values,
      isSelectedVictim,
    }
  },
})
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 640px) {
  .streetInput {
    width: 435px !important;
  }
}

.input {
  width: 288px !important;
}
</style>
