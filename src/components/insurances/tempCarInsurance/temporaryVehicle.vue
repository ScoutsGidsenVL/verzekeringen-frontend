<template>
  <form id="TemporaryVehicle" @submit.prevent="onSubmit">
    <div v-if="values">
      <div class="mt-3">
        <div class="flex gap-1">
          <custom-headline-2 text="Bestuurders" />
          <required rules="required" class="mt-3" />
        </div>
        <select-drivers id="selectDriverField" rules="RequiredDrivers:selectDriverField" />
      </div>

      <div class="mt-3">
        <div class="flex gap-1">
          <custom-headline-2 text="Voertuig" />
          <required rules="required" class="mt-3" />
        </div>
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <select-vehicle id="vehicle" rules="required|RequiredVehicle:vehicle" />
        </div>
      </div>

      <div>
        <custom-headline-2 text="Opmerkingen" />
        <div class="md:ml-20 xs:ml-5 sm:ml-5">
          <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
        </div>
      </div>

      <div class="flex gap-3 md:ml-20 xs:ml-5 sm:ml-5 mt-5 items-center">
        <back-button stateName="setHolderState" :backToState="HolderStates.GENERAL" />
        <custom-button text="Volgende" />
        <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan</a>
        <loader :is-loading="isSavingDraft" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { TemporaryVehicleInsurance } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import SelectDrivers from '@/components/insurances/tempCarInsurance/selectDrivers.vue'
import SelectVehicle from '@/components/insurances/travelAssistance/selectVehicle.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { CountryRepository } from '@/repositories/countriesRepository'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { scrollToFirstError } from '@/veeValidate/helpers'
import required from '@/components/semantic/Required.vue'
import CustomButton from '@/components/CustomButton.vue'
import { IS_NO_DRIVER } from '@/serializer/selectDriver'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { Driver } from '@/serializer/Driver'
import { Owner } from '@/serializer/Owner'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'TemporaryVehicle',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-drivers': SelectDrivers,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'back-button': BackButton,
    required,
    Loader,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data: TemporaryVehicleInsurance = store.getters.getCurrentInsuranceState
    const isEdit = !!route.params.id

    const checkIfOwnerIsDriver = (owner: Owner, drivers: Driver[]) => {
      let status = IS_NO_DRIVER
      drivers.forEach((driver) => {
        if (owner.firstName && owner.lastName && driver.firstName && driver.lastName) {
          if (owner.firstName + owner.lastName + owner.birthDate === driver.firstName + driver.lastName + driver.birthDate) {
            status = owner.firstName + owner.lastName + owner.birthDate
          }
        }
      })
      store.dispatch('setIsDriverOwnerState', status)
      return status
    }

    const { handleSubmit, values, isSubmitting, validate } = useForm<TemporaryVehicleInsurance>({
      initialValues: {
        drivers: data.drivers ? data.drivers : [],
        vehicle: data.vehicle ? data.vehicle : undefined,
        owner: data.owner ? data.owner : { firstName: '', lastName: '' },
        input: data.owner ? data.owner : { firstName: '', lastName: '' },
        selectDriverField: {
          drivers: data.drivers ? data.drivers : [],
          isDriverOwner: checkIfOwnerIsDriver(data.owner ? data.owner : { firstName: '', lastName: '' }, data.drivers ? data.drivers : []),
        },
        comment: data.comment ? data.comment : '',
        vvksComment: data.vvksComment ? data.vvksComment : '',
      },
    })

    const generalInsuranceState = computed((): BaseInsurance => {
      return store.state.insurance.generalInsuranceState
    })

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'TemporaryVehicle'))
      handleSubmit(async (values: any) => {
        const temporaryVehicleInsurance = ref<TemporaryVehicleInsurance>({
          ...generalInsuranceState.value,
          ...{
            vehicle: values.vehicle ? values.vehicle : undefined,
            drivers: values.selectDriverField.drivers ? values.selectDriverField.drivers : [],
            selectDriverField: values.selectDriverField,
            owner:
              values.selectDriverField.isDriverOwner === IS_NO_DRIVER
                ? values.input
                : values.selectDriverField.drivers.find((driver: Driver) => {
                    // Nescescarry for a put request
                    if (driver.firstName && driver.lastName) {
                      if (driver.firstName + driver.lastName + driver.birthDate === values.selectDriverField.isDriverOwner) {
                        return driver
                      }
                    }
                  }),
            comment: values.comment ? values.comment : '',
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(temporaryVehicleInsurance.value)
          .then((cost: any) => {
            temporaryVehicleInsurance.value.totalCost = cost

            store.dispatch('setTemporaryVehicleState', temporaryVehicleInsurance)
            store.dispatch('setHolderState', HolderStates.DETAIL)
          })
      })()
    }
    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const isSavingDraft = ref<boolean>(false)
    const saveAsDraft = () => {
      const draftData = ref<TemporaryVehicleInsurance>({
        ...generalInsuranceState.value,
        ...{
          vehicle: values.vehicle ? values.vehicle : undefined,
          drivers: values.selectDriverField && values.selectDriverField.drivers ? values.selectDriverField.drivers : [],
          selectDriverField: values.selectDriverField,
          owner:
            values.selectDriverField && values.selectDriverField.isDriverOwner === IS_NO_DRIVER
              ? values.input
              : values.selectDriverField &&
                values.selectDriverField.drivers.find((driver: Driver) => {
                  // Nescescarry for a put request
                  if (driver.firstName && driver.lastName) {
                    if (values.selectDriverField && driver.firstName + driver.lastName + driver.birthDate === values.selectDriverField.isDriverOwner) {
                      return driver
                    }
                  }
                }),
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
      BelgianCitySearchRepository,
      CountryRepository,
      isSavingDraft,
      HolderStates,
      saveAsDraft,
      InputTypes,
      onSubmit,
      values,
      isEdit,
    }
  },
})
</script>
