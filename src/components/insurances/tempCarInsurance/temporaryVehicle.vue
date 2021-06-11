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
      <div class="mt-4 px-5">
        <input class="mr-2 cursor-pointer" v-model="radio" type="radio" id="-driver" name="gender" />
        <label class="cursor-pointer" :for="'-driver'">Eigenaar is geen bestuurder of het is een huurwagen</label>
        {{ radio }}
        <div v-if="!values.owner.firstName && !values.owner.lastName" class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" rules="required" name="owner.companyName" label="Firma naam" />
        </div>
        <div v-if="!values.owner.companyName">
          <div class="w-96 mt-3">
            <custom-input :type="InputTypes.TEXT" rules="required" name="owner.firstName" label="Naam" />
          </div>

          <div class="w-96 mt-3">
            <custom-input :type="InputTypes.TEXT" rules="required" name="owner.lastName" label="Achternaam" />
          </div>
        </div>

        <div class="w-96">
          <multi-select
            id="owner.location"
            :object="true"
            track-by="label"
            value-prop="label"
            :repository="BelgianCitySearchRepository"
            :resolve-on-load="true"
            :options="[]"
            :searchable="true"
            label="Gemeenten"
            rules="required"
            placeholder="Zoek op naam/postcode"
          />
        </div>

        <div class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" rules="required" name="owner.street" label="Straat" />
        </div>

        <div class="w-96 mt-3"></div>

        <div class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="owner.letterBox" label="Bus" />
        </div>

        <div class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="owner.phoneNumber" label="Gsm" />
        </div>
      </div>

      <div class="mt-3">
        <custom-headline-2 text="Voertuig" />
        <div class="px-5">
          <select-vehicle id="vehicle" />
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
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
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
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
  },
  setup() {
    const store = useStore()
    const radio = ref<any>()
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
      },
    })

    const generalInsuranceState = computed((): BaseInsurance => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      console.log('VALUES: ', values)
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
      radio,
    }
  },
})
</script>
