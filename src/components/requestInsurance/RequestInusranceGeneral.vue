<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Welke" />

      <insurance-type-menu :disabled="isEdit" />
      <div v-if="insuranceTypeState === InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING" class="mt-3">
        <custom-headline-2 text="Je hebt drie opties voor een tijdelijke autoverzekering" />
        <div><strong>Gebruik bij twijfel deze keuzehulp</strong></div>

        <div class="md:ml-20">
          <tip-choice-help />
        </div>

        <div class="mt-4"><strong>Vink hier je optie(s) aan</strong></div>

        <div class="mt-2 md:ml-20">
          <div class="flex">
            <input id="choice-1" v-model="values.insuranceOptions" class="mr-2 mt-1.5" type="checkbox" :value="1" />
            <label for="choice-1">Optie 1: Omniumverzekering.</label>
          </div>

          <div class="mt-4">
            <div class="flex">
              <input id="choice-2" v-model="values.insuranceOptions" class="mr-2" type="checkbox" :value="2" />
              <label class="custom-label" for="choice-2">Optie 2: Vrijstelling van eigen omnium dekken tot XXX EUR.</label>
            </div>

            <div v-if="values.insuranceOptions.includes(2)" class="md:ml-20">
              <div style="margin-top: -2em" class="w-80">
                <multi-select
                  id="maxCoverage"
                  rules="required"
                  :object="true"
                  track-by="label"
                  value-prop="value"
                  :repository="maxCoverageRepository"
                  :options="maxCoverageOptions"
                  placeholder="vrijstelling dekken tot"
                />
              </div>
            </div>
          </div>

          <div class="flex mt-4">
            <input id="choice-3" v-model="values.insuranceOptions" class="mr-2" type="checkbox" :value="3" />
            <label class="custom-label" for="choice-3">Optie 3: Huurvoertuig: vrijstelling verzekering burgerlijke aansprakelijkheid dekken tot 500 euro. </label>
          </div>
        </div>

        <div class="ml-5">
          <custom-input v-show="true" hide-input="true" :type="InputTypes.TEXT" rules="required" name="insuranceOptions" />
        </div>
      </div>

      <div v-show="insuranceTypeState === InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN" class="md:ml-20">
        <tip-general-non-member />
      </div>

      <div v-show="insuranceTypeState === InsuranceTypes.REIS_BIJSTAND" class="md:ml-20">
        <tip-general-travel-assistance />
      </div>

      <div v-show="insuranceTypeState === InsuranceTypes.MATERIAAL_VERZEKERING" class="md:ml-20">
        <tip-general-material-insurance />
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Wanneer" />
      <div class="md:ml-20 md:flex md:gap-4">
        <div class="flex gap-4" :class="insuranceTypeState === InsuranceTypes.EVENEMENTEN_VERZEKERING ? 'w-96' : 'w-70'">
          <custom-input
            onInvalid="this.setCustomValidity('De verzekering moet minstens 1 dag op voorhand aangevraagd worden.')"
            :loading-submit="isSubmitting"
            :min="minDate"
            :type="InputTypes.DATE"
            rules="required"
            name="startDate"
            label="Startdatum"
          />
          <custom-input
            v-if="insuranceTypeState === InsuranceTypes.EVENEMENTEN_VERZEKERING"
            :oading-submit="isSubmitting"
            rules="required"
            :type="InputTypes.TIME"
            name="startTime"
            label="Starttijd"
            step="3600"
          />
        </div>
        <div class="flex xs:mt-5 md:mt-0 gap-4" :class="insuranceTypeState === InsuranceTypes.EVENEMENTEN_VERZEKERING ? 'w-96' : 'w-80'">
          <custom-input
            onInvalid="this.setCustomValidity('De verzekering moet minstens 1 dag op voorhand aangevraagd worden.')"
            :loading-submit="isSubmitting"
            :min="minDate"
            :type="InputTypes.DATE"
            rules="required|startDateBeforeEndDate:startDate|maximumDateTerm:startDate"
            name="endDate"
            label="Einddatum"
          />
          <custom-input
            v-if="insuranceTypeState === InsuranceTypes.EVENEMENTEN_VERZEKERING"
            rules="required"
            step="3600"
            :type="InputTypes.TIME"
            name="endTime"
            label="Eindtijd"
            :loading-submit="isSubmitting"
          />
        </div>
      </div>
      <div class="md:ml-20 pt-2"><date-disclaimer /></div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Groep" />
      <div class="md:ml-20">
        <p>De factuur wordt naar de financieel verantwoordelijke van je groep gestuurd.</p>
        <div>
          <div class="group-selector">
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
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Aanvrager" />
      <div class="md:ml-20">
        <insurance-applicant :applicant="values.responsibleMember" />
      </div>
    </div>

    <div>
      <info-alert>
        <p>
          Om het e-mailadres of gsm-nummer van de aanvrager te wijzigen <strong><a target="_blank" href="https://groepsadmin.scoutsengidsenvlaanderen.be/">klik hier</a></strong> en vervolgens op
          Refresh. <custom-button :loadingSubmit="isRefreshing" type="button" class="ml-5 mt-2" text="Refresh" @click="refreshGroups()" />
        </p>
      </info-alert>
    </div>

    <div class="flex gap-3 md:ml-20 mt-5 items-center">
      <custom-button text="Volgende" />
      <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan</a>
      <loader :is-loading="isSavingDraft" />
    </div>
  </form>
</template>

<script lang="ts">
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import TipGeneralMaterialInsurance from '@/components/tips/tipGeneralMaterialInsurance.vue'
import tipGeneralTravelAssistance from '@/components/tips/tipGeneralTravelAssistance.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import InsuranceApplicant from './insuranceApplicant/insuranceApplicant.vue'
import { MaxCoverageRepository } from '@/repositories/maxCoverageRepository'
import TipGeneralNonMember from '@/components/tips/tipGeneralNonMember.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import dateDisclaimer from '@/components/disclaimers/dateDisclaimer.vue'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import TipChoiceHelp from '@/components/tips/tipChoiceHelp.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { HelloWorld } from 'vue-3-component-library'

import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { defineComponent, computed, ref, watch } from 'vue'
import { InsuranceTypeRepos } from '@/enums/insuranceTypes'
import AuthRepository from '@/repositories/authRepository'
import CustomButton from '@/components/CustomButton.vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { Coverage } from '@/serializer/Coverage'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import moment from 'moment'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'tip-general-material-insurance': TipGeneralMaterialInsurance,
    'tip-general-travel-assistance': tipGeneralTravelAssistance,
    'tip-general-non-member': TipGeneralNonMember,
    'insurance-applicant': InsuranceApplicant,
    'insurance-type-menu': InsuranceTypeMenu,
    'custom-headline-2': CustomHeadline2,
    'date-disclaimer': dateDisclaimer,
    'tip-choice-help': TipChoiceHelp,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'info-alert': InfoAlert,
    HelloWorld,
    Loader,
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const userData = ref<ResponsibleMember>(store.getters.user)
    let data: any = store.getters.getCurrentInsuranceState
    const maxCoverageOptions = ref<Array<Coverage>>()
    const { handleSubmit, values, validate, isSubmitting } = useForm<BaseInsurance>({
      initialValues: {
        startDate: data.startDate ? data.startDate : '',
        startTime: data.startTime ? data.startTime : '',
        endDate: data.endDate ? data.endDate : '',
        endTime: data.endTime ? data.endTime : '',
        group: data.group ? data.group : userData.value.scoutsGroups ? userData.value.scoutsGroups[0] : undefined,
        responsibleMember: data.responsibleMember ? data.responsibleMember : userData.value,
        insuranceOptions: data.insuranceOptions ? data.insuranceOptions : [],
        maxCoverage: data.maxCoverage ? data.maxCoverage : [],
      },
    })

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const minDate = moment().add(1, 'days').format('YYYY-MM-DD')

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const generalInsuranceState = ref<BaseInsurance>({
          startDate: values.startDate,
          startTime: values.startTime ? values.startTime : undefined,
          endDate: values.endDate,
          endTime: values.endTime ? values.endTime : undefined,
          group: values.group,
          responsibleMember: values.responsibleMember ? values.responsibleMember : userData.value,
          totalCost: '1.00',
          insuranceOptions: values.insuranceOptions ? values.insuranceOptions : [],
          maxCoverage: values.maxCoverage ? values.maxCoverage : undefined,
        })
        store.dispatch('setGeneralInsuranceState', generalInsuranceState)
        store.dispatch('setHolderState', HolderStates.TYPE)
      })()
    }

    const fetchMaxCoverages = () => {
      RepositoryFactory.get(MaxCoverageRepository)
        .getArray()
        .then((result: any) => {
          maxCoverageOptions.value = result
        })
    }

    const isRefreshing = ref<boolean>(false)
    const refreshGroups = () => {
      isRefreshing.value = true
      RepositoryFactory.get(AuthRepository)
        .me()
        .then((user: any) => {
          store.dispatch('setUser', user).then(() => {
            values.responsibleMember = store.getters.user
            isRefreshing.value = false
          })
        })
    }

    const isSavingDraft = ref<boolean>(false)
    const saveAsDraft = () => {
      const draftData = ref<BaseInsurance>({
        startDate: values.startDate,
        startTime: values.startTime ? values.startTime : undefined,
        endDate: values.endDate,
        endTime: values.endTime ? values.endTime : undefined,
        group: values.group,
        responsibleMember: values.responsibleMember ? values.responsibleMember : userData.value,
        totalCost: '1.00',
        insuranceOptions: values.insuranceOptions ? values.insuranceOptions : [],
        maxCoverage: values.maxCoverage ? values.maxCoverage : undefined,
      })

      if (!isSavingDraft.value) {
        isSavingDraft.value = true
        //@ts-ignore
        RepositoryFactory.get(InsuranceTypeRepos[insuranceTypeState.value])
          //@ts-ignore
          .createDraft(draftData.value, insuranceTypeState.value)
          .then(() => {
            router.push('/home/verzekeringen')
          })
      }
    }

    fetchMaxCoverages()
    scrollToTopOfPage()

    watch(
      () => insuranceTypeState.value,
      () => {
        if (insuranceTypeState.value === InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING) {
          values.insuranceOptions = []
        }
      }
    )

    watch(
      () => values.insuranceOptions,
      (current, old) => {
        if (old && current && old.includes(2) && current.includes(1)) {
          values.insuranceOptions = current.filter((item) => ![2].includes(item))
        }
        if (old && current && old.includes(1) && current.includes(2)) {
          values.insuranceOptions = current.filter((item) => ![1].includes(item))
        }
      }
    )

    return {
      maxCoverageOptions,
      insuranceTypeState,
      InsuranceTypes,
      refreshGroups,
      isSavingDraft,
      isSubmitting,
      isRefreshing,
      saveAsDraft,
      InputTypes,
      userData,
      onSubmit,
      minDate,
      isEdit,
      values,
      data,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-label {
  margin-top: -5px;
}

.group-selector {
  width: 350px;
}

@media only screen and (min-width: 600px) {
  .group-selector {
    width: 600px;
  }
}
</style>
