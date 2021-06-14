<template>
  <form @submit="onSubmit">
    <div v-if="values">
      <div class="mt-3">
        <custom-headline-2 text="Bestuurders" />
        <div class="px-5">
          <select-drivers id="drivers" ownerId="owner" rules="required" />
        </div>
      </div>
      {{ values }}
      <div class="px-5 mt-5">
        <custom-button text="Volgende" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { TemporaryVehicleInsurance } from '@/serializer/insurances/TemporaryVehicleInsurance'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import SelectDrivers, { IS_NO_DRIVER } from '@/components/insurances/tempCarInsurance/selectDrivers.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TemporaryVehicle',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-drivers': SelectDrivers,
    'custom-button': CustomButton,
  },
  setup() {
    const store = useStore()
    const data: TemporaryVehicleInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<any>({
      initialValues: {
        drivers: data.drivers ? data.drivers : undefined,
        vehicle: data.vehicle ? data.vehicle : undefined,
        owner: data.owner ? data.owner : {},
        input: {
          id: '',
          lastName: '',
          firstName: '',
          phoneNumber: '',
          email: '',
          birthDate: '',
          groupAdminId: '',
          street: '',
          number: '',
          postCodeCity: {},
          isChecked: false,
        },
        companyName: '',
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
          country: values.country ? values.country : undefined,
          participants: values.participants ? values.participants : [],
          vehicle: values.vehicle ? values.vehicle : undefined,
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
