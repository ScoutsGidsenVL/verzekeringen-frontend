<template>
  <form @submit="onSubmit">
    <div v-if="values">
      <div class="mt-3">
        <custom-headline-2 text="Bestuurders" />
        <div class="px-5">
          <select-drivers id="selectDriverField" rules="RequiredDrivers:selectDriverField" />
        </div>
      </div>
      <div class="mt-3">
        <custom-headline-2 text="Voertuig" />
        <div class="px-5">
          <select-vehicle id="vehicle" rules="required|RequiredVehicle:vehicle" />
        </div>
      </div>

      <div class="flex gap-3 px-5 mt-5">
        <custom-button @click="back()" type="button" text="Vorige" />
        <custom-button text="Volgende" />
        <a class="hover:text-lightGreen underline cursor-pointer ml-3" v-if="!isEdit" @click="saveAsDraft()">Opslaan</a>
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
import { CountryRepository } from '@/repositories/countriesRepository'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import CustomButton from '@/components/CustomButton.vue'
import { IS_NO_DRIVER } from '@/serializer/selectDriver'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { Driver } from '@/serializer/Driver'
import { Owner } from '@/serializer/Owner'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { useRoute } from 'vue-router'
import router from '@/router'

export default defineComponent({
  name: 'TemporaryVehicle',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-drivers': SelectDrivers,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
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

    const { handleSubmit, values } = useForm<TemporaryVehicleInsurance>({
      initialValues: {
        drivers: data.drivers ? data.drivers : [],
        vehicle: data.vehicle ? data.vehicle : undefined,
        owner: data.owner ? data.owner : { firstName: '', lastName: '' },
        input: data.owner ? data.owner : { firstName: '', lastName: '' },
        selectDriverField: {
          drivers: data.drivers ? data.drivers : [],
          isDriverOwner: checkIfOwnerIsDriver(data.owner ? data.owner : { firstName: '', lastName: '' }, data.drivers ? data.drivers : []),
        },
      },
    })

    const generalInsuranceState = computed((): BaseInsurance => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
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
          comment: data.comment,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(temporaryVehicleInsurance.value)
        .then((cost: any) => {
          temporaryVehicleInsurance.value.totalCost = cost

          store.dispatch('setTemporaryVehicleState', temporaryVehicleInsurance)
          store.dispatch('setHolderState', HolderStates.DETAIL)
        })
    })

    const back = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

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
          comment: data.comment,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[insuranceTypeState.value])
        //@ts-ignore
        .createDraft(draftData.value, insuranceTypeState.value)
        .then(() => {
          router.push('/home')
        })
    }

    return {
      BelgianCitySearchRepository,
      CountryRepository,
      InputTypes,
      onSubmit,
      values,
      back,
      isEdit,
      saveAsDraft,
    }
  },
})
</script>
