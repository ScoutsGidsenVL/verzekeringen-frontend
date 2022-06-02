<template>
  <form id="TravelAssistance" @submit.prevent="onSubmit">
    <div v-if="values">
      <div>
        <custom-headline-2 text="Bestemming" />
        <div v-if="typeof values.country === 'object' || !values.country" class="md:ml-20 xs:ml-5 sm:ml-5 xs:w-72 md:w-96">
          <multi-select
            id="country"
            rules="required|checkForbiddenCountriesTravelInscuranceWithCar:@forbiddenCountriesVehicle,@vehicle"
            :insurance-type-id="values.vehicle ? '4' : '3'"
            :object="true"
            track-by="name"
            value-prop="name"
            :repository="CountryRepository"
            :resolve-on-load="true"
            :options="values.country ? [values.country] : []"
            :searchable="true"
            label="Land"
            placeholder="Zoek op naam"
          />
        </div>
      </div>

      <div class="mt-3">
        <div class="flex gap-1">
          <custom-headline-2 text="Deelnemers" />
          <required rules="required" class="mt-3" />
        </div>
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <select-participants id="participants" rules="required" />
        </div>
      </div>

      <div class="mt-3">
        <custom-headline-2 text="Voertuig" />
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <select-vehicle id="vehicle" />
        </div>
      </div>

      <div>
        <custom-headline-2 text="Opmerkingen" />
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
        </div>
      </div>

      <div class="flex gap-3 md:ml-20 xs:ml-5 sm:ml-5 mt-5 items-center">
        <back-button state-name="setHolderState" :back-to-state="HolderStates.GENERAL" />

        <custom-button text="Volgende" />
        <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan</a>
        <loader :is-loading="isSavingDraft" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import SelectParticipants from '@/components/insurances/travelAssistance/selectParticipants.vue'
import { TravelAssistanceInsurance } from '@/serializer/insurances/TravelAssistanceInsurance'
import SelectVehicle from '@/components/insurances/travelAssistance/selectVehicle.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { CountryRepository } from '@/repositories/countriesRepository'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { scrollToFirstError } from '@/veeValidate/helpers'
import Required from '@/components/semantic/Required.vue'
import CustomButton from '@/components/CustomButton.vue'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'
import { Country } from '@/serializer/Country'

export default defineComponent({
  name: 'TravelAssistance',
  components: {
    'select-participants': SelectParticipants,
    'custom-headline-2': CustomHeadline2,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'back-button': BackButton,
    Required,
    Loader,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data: TravelAssistanceInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values, isSubmitting, validate } = useForm<TravelAssistanceInsurance>({
      initialValues: {
        country: data.country ? data.country : undefined,
        participants: data.participants ? data.participants : [],
        vehicle: data.vehicle ? data.vehicle : undefined,
        comment: data.comment ? data.comment : '',
        vvksComment: data.vvksComment ? data.vvksComment : '',
      },
    })
    const isEdit = !!route.params.id

    const generalInsuranceState = computed((): BaseInsurance => {
      return store.state.insurance.generalInsuranceState
    })

    const allCountries = ref<Country[]>([])
    const vehicleCountries = ref<Country[]>([])

    RepositoryFactory.get(CountryRepository)
      .getArray('/countries_by_type/3/?page_size=1000')
      .then((res: any) => {
        allCountries.value = res.results
        if (isEdit) {
          var countryById
          allCountries.value.forEach((country:any) => {
            // console.log(country.id, values.country)
            if (country.id.toString() === values.country) {
              countryById = country
            }
          })
          values.country = countryById
        }
      })
      .then(() => {
        RepositoryFactory.get(CountryRepository)
          .getArray('/countries_by_type/4/?page_size=1000')
          .then((res: any) => {
            vehicleCountries.value = res.results
          })
          .then(() => {
            values.forbiddenCountriesVehicle = allCountries.value.filter((country1) => vehicleCountries.value.every((country2) => !(country2.name === country1.name)))
          })
      })

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'TravelAssistance'))
      handleSubmit(async (values: any) => {
        const travelAssistance = ref<TravelAssistanceInsurance>({
          ...generalInsuranceState.value,
          ...{
            country: values.country ? values.country : undefined,
            participants: values.participants ? values.participants : [],
            vehicle: values.vehicle ? values.vehicle : undefined,
            responsiblePhoneNumber:
              generalInsuranceState.value.responsibleMember && generalInsuranceState.value.responsibleMember.phoneNumber ? generalInsuranceState.value.responsibleMember.phoneNumber : '/',
            comment: values.comment ? values.comment : '',
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(travelAssistance.value)
          .then((cost: any) => {
            travelAssistance.value.totalCost = cost

            store.dispatch('setTravelAssistanceState', travelAssistance)
            store.dispatch('setHolderState', HolderStates.DETAIL)
          }).catch((err: Error) => {
            if (travelAssistance.value.vehicle && travelAssistance.value.vehicle.trailer) {
              if (travelAssistance.value.vehicle.trailer.value === '2') {
                window.alert(`Deze aanhangswagen keuze kan niet gekozen worden voor deze verzekering, gelieve de aanhangswagen te veranderen.`)
              }
              if (travelAssistance.value.vehicle.trailer.value === '3') {
                window.alert(`Deze aanhangswagen keuze kan niet gekozen worden voor deze verzekering, gelieve de aanhangswagen te veranderen.`)
              }
            }
          })
      })()
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const isSavingDraft = ref<boolean>(false)
    const saveAsDraft = () => {
      const draftData = ref<TravelAssistanceInsurance>({
        ...generalInsuranceState.value,
        ...{
          country: values.country ? values.country : undefined,
          participants: values.participants ? values.participants : [],
          vehicle: values.vehicle ? values.vehicle : undefined,
          responsiblePhoneNumber:
            generalInsuranceState.value.responsibleMember && generalInsuranceState.value.responsibleMember.phoneNumber ? generalInsuranceState.value.responsibleMember.phoneNumber : '/',
          comment: values.comment ? values.comment : '',
        },
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

    return {
      CountryRepository,
      isSavingDraft,
      HolderStates,
      isSubmitting,
      saveAsDraft,
      InputTypes,
      onSubmit,
      values,
      isEdit,
    }
  },
})
</script>
