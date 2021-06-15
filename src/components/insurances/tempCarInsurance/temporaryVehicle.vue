<template>
  <form @submit="onSubmit">
    <div v-if="values">
      <div class="mt-3">
        <custom-headline-2 text="Bestuurders" />
        <div class="px-5">
          <select-drivers id="selectDriverField" rules="required" />
        </div>
      </div>
      <div class="mt-3">
        <custom-headline-2 text="Voertuig" />
        <div class="px-5">
          <select-vehicle id="vehicle" rules="required" />
        </div>
      </div>

      <div class="px-5 mt-5">
        <custom-button text="Volgende" />
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
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { Driver } from '@/serializer/Driver'

export default defineComponent({
  name: 'TemporaryVehicle',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-drivers': SelectDrivers,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
  },
  setup() {
    const store = useStore()
    const data: TemporaryVehicleInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<TemporaryVehicleInsurance>({
      initialValues: {
        drivers: data.drivers ? data.drivers : undefined,
        vehicle: data.vehicle ? data.vehicle : undefined,
        owner: data.owner ? data.owner : {},
        input: data.input ? data.input : {},
        selectDriverField: { drivers: [], isDriverOwner: IS_NO_DRIVER },
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
            values.selectDriverField.isDriverOwner === IS_NO_DRIVER ? values.input : values.selectDriverField.drivers.find((driver: Driver) => driver.id === values.selectDriverField.isDriverOwner),
          comment: data.comment,
        },
      })
      store.dispatch('setTemporaryVehicleState', temporaryVehicleInsurance)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    return {
      BelgianCitySearchRepository,
      CountryRepository,
      InputTypes,
      onSubmit,
      values,
    }
  },
})
</script>
