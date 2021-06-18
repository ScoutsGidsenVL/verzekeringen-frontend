<template>
  <form @submit="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div v-if="values" class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />

      <div class="w-96">
        <multi-select
          rules="required"
          insuranceTypeId="2"
          id="country"
          :object="true"
          track-by="name"
          value-prop="name"
          :repository="CountryRepository"
          :resolve-on-load="true"
          :options="[values.country.city ? values.country : undefined]"
          :extra-option="{ id: '3232', name: 'België' }"
          :searchable="true"
          label="Land"
          placeholder="Zoek op naam"
        />
      </div>
      <div v-if="values.country.name === '' || values.country.name === 'België'" class="w-96">
        <multi-select
          id="postCodeCity"
          :object="true"
          track-by="label"
          value-prop="label"
          :repository="BelgianCitySearchRepository"
          :resolve-on-load="true"
          :options="[values.postCodeCity]"
          :searchable="true"
          label="Gemeente"
          rules="required"
          placeholder="Zoek op naam/postcode"
        />
      </div>
    </div>

    <custom-headline-2 class="mt-2" text="Materiaal" />
    <div class="px-5 mt-3">
      <select-equipment id="equipment" rules="required" />
    </div>

    <div class="flex gap-3 px-5 mt-5">
      <custom-button @click="back()" type="button" text="Vorige" />
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import SelectEquipment from '@/components/insurances/materialInsurance/selectEquipment.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { MaterialInsurance } from '@/serializer/insurances/MaterialInsurance'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import { Country, CountryDeserializer } from '@/serializer/Country'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { InsuranceTypeRepos } from '@/enums/insuranceTypes'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MaterialInsurance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'select-equipment': SelectEquipment,
  },
  setup() {
    const store = useStore()
    const initialCountry = ref<Country>(CountryDeserializer({ id: '3232', name: 'België' }))
    const data: MaterialInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<MaterialInsurance>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        country: data.country ? data.country : initialCountry.value,
        postCodeCity: data.postCodeCity ? (data.postCodeCity.city === undefined ? {} : data.postCodeCity) : undefined,
        equipment: data.equipment ? data.equipment : [],
      },
    })

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      const materialInsurance = ref<MaterialInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          comment: data.comment,
          equipment: values.equipment ? values.equipment : undefined,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(materialInsurance.value)
        .then((cost: any) => {
          materialInsurance.value.totalCost = cost
        })

      store.dispatch('setMaterialInsuranceState', materialInsurance.value)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    const back = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }

    return {
      BelgianCitySearchRepository,
      CountryRepository,
      InputTypes,
      onSubmit,
      values,
      data,
      generalInsuranceState,
      back,
    }
  },
})
</script>