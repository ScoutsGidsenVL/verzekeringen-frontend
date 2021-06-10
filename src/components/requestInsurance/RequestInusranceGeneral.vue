<template>
  <form @submit="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Welke" />

      <insurance-type-menu :disabled="isEdit" />

      <div class="mt-3" v-if="insuranceTypeState === InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING">
        <div><strong>Keuze hulp</strong></div>
        <div class="mt-4 px-5">
          <div>
            <p style="font-size: 0.7em">
              Verzekering stoffelijke schade - brand - diefstal van een gehuurd voertuig of een voertuig toebehorend aan leden van Scouts en Gidsen Vlaanderen of vrijwillige medewerkers.
            </p>
            <input class="mr-2" type="checkbox" id="choice-1" :value="1" v-model="values.insuranceOptions" />
            <label for="choice-1">Heb je een auto gehuurd?</label>
          </div>

          <div class="mt-4">
            <p style="font-size: 0.7em">Dekking van vrijstelling in stoffelijke schade OF diefstal (voor voertuigen die gebruikt worden door een groep van Scouts en Gidsen Vlaanderen.)</p>
            <input class="mr-2" type="checkbox" id="choice-2" :value="2" v-model="values.insuranceOptions" />
            <label for="choice-2">Is de auto omnium verzekerd?</label>

            <div v-if="values.insuranceOptions.includes(2)" class="px-5">
              <p>Maxiumum vrijstellingsbedrag</p>
              <p style="font-size: 0.7em">Om de vrijstelling (=franchise) van een reeds afgesloten omnium verzekering af te kopen.</p>
              <div style="margin-top: -2em" class="w-80">
                <multi-select
                  rules="required"
                  id="maxCoverage"
                  :object="true"
                  track-by="label"
                  value-prop="value"
                  :repository="maxCoverageRepository"
                  :options="maxCoverageOptions"
                  placeholder="Maxiumum vrijstellingsbedrag"
                />
              </div>
            </div>
          </div>

          <div class="mt-4">
            <p style="font-size: 0.7em">Dekking van vrijstelling in burgerlijke aansprakelijkheid (voor voertuigen die gehuurd worden door een groep van Scouts en Gidsen Vlaanderen.)</p>
            <input class="mr-2" type="checkbox" id="choice-3" :value="3" v-model="values.insuranceOptions" />
            <label for="choice-3">Wil je de vrijstelling (franchise) van deze verzekering afkopen?</label>
          </div>
        </div>
      </div>

      <div class="px-5">
        <info-alert v-show="insuranceTypeState === InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN">
          <strong>OPGELET! Via deze verzekering kan je geen nieuwe leden verzekeren.</strong>
          <p>Gelieve dit via de groepsadministratie te doen.</p>
        </info-alert>
      </div>

      <div class="px-5">
        <info-alert v-show="insuranceTypeState === InsuranceTypes.REIS_BIJSTAND">
          <strong>Wat biedt de reisbijstandsverzekering meer dan de gewone ledenpolis?</strong>
          <p>Alleen geldig voor leden van Scouts en Gidsen Vlaanderen en personen die via een tijdelijke verzekering verzekerd zijn voor dezelfde periode.</p>
        </info-alert>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Wanneer" />
      <div class="px-5 flex gap-4">
        <div class="w-80">
          <custom-input :min="minDate" :type="InputTypes.DATE" rules="required" name="startDate" label="Start datum" />
        </div>
        <div class="w-80">
          <custom-input :min="minDate" :type="InputTypes.DATE" :rules="dateRuleToInsuranceType('start', insuranceTypeState)" name="endDate" label="Eind datum" />
        </div>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Groep" />
      <div class="px-5">
        <p>De factuur wordt naar de financieel verantwoordelijke van deze groep gestuurd.</p>
        <div class="flex">
          <div style="width: 65%">
            <multi-select :disabled="isEdit" id="group" rules="required" placeholder="Group" track-by="fullInfo" value-prop="id" :options="userData.scoutsGroups" label="Selecteer groep" />
          </div>
          <div class="mt-6 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" @click="refreshGroups()" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Aanvrager" />
      <div class="px-5">
        <insurance-applicant :applicant="values.responsibleMember" />
      </div>
    </div>

    <div class="mt-5 px-5">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import InsuranceTypeMenu from '@/components/requestInsurance/insuranceTypeMenu/InsuranceTypeMenu.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import InsuranceApplicant from './insuranceApplicant/insuranceApplicant.vue'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import { dateRuleToInsuranceType } from '@/helpers/formatHelper'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { defineComponent, computed, ref, watch } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import moment from 'moment'
import { useRoute } from 'vue-router'
import { Coverage } from '@/serializer/Coverage'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { MaxCoverageRepository } from '@/repositories/maxCoverageRepository'
import AuthRepository from '@/repositories/authRepository'

export default defineComponent({
  name: 'RequestInsuranceGeneral',
  components: {
    'insurance-type-menu': InsuranceTypeMenu,
    'insurance-applicant': InsuranceApplicant,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'info-alert': InfoAlert,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const userData = ref<ResponsibleMember>(store.getters.user)
    let data: any = store.getters.getCurrentInsuranceState
    const maxCoverageOptions = ref<Array<Coverage>>()

    const { handleSubmit, values } = useForm<BaseInsurance>({
      initialValues: {
        startDate: data.startDate ? data.startDate : '',
        endDate: data.endDate ? data.endDate : '',
        group: data.group ? data.group.id : '',
        responsibleMember: data.responsibleMember ? data.responsibleMember : userData.value,
        insuranceOptions: data.insuranceOptions ? data.insuranceOptions : [],
        maxCoverage: data.maxCoverage ? data.maxCoverage : undefined,
      },
    })

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

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const minDate = moment().add(1, 'days').format('YYYY-MM-DD')

    const onSubmit = handleSubmit(async (values: any) => {
      const generalInsuranceState = ref<BaseInsurance>({
        startDate: values.startDate,
        endDate: values.endDate,
        group: { name: values.group },
        responsibleMember: values.responsibleMember ? values.responsibleMember : userData.value,
        totalCost: '1.00',
      })
      store.dispatch('setGeneralInsuranceState', generalInsuranceState)
      store.dispatch('setHolderState', HolderStates.TYPE)
    })

    const fetchMaxCoverages = () => {
      RepositoryFactory.get(MaxCoverageRepository)
        .getArray()
        .then((result: any) => {
          maxCoverageOptions.value = result
        })
    }

    fetchMaxCoverages()
    const refreshGroups = () => {
      RepositoryFactory.get(AuthRepository)
        .me()
        .then((user: any) => {
          store.dispatch('setUser', user).then(() => {
            userData.value = store.getters.user
          })
        })
    }

    return {
      dateRuleToInsuranceType,
      maxCoverageOptions,
      insuranceTypeState,
      InsuranceTypes,
      InputTypes,
      minDate,
      userData,
      onSubmit,
      data,
      isEdit,
      values,
      refreshGroups,
    }
  },
})
</script>
