<template>
  <form @submit="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div v-if="values" class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />

      <div class="w-96">
        <multi-select
          id="country"
          rules="required"
          insurance-type-id="2"
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
          :options="values.postCodeCity ? [values.postCodeCity] : []"
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

    <div>
      <custom-headline-2 text="Opmerkingen" />
      <div class="px-5">
        <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
      </div>
    </div>

    <div class="flex gap-3 px-5 mt-5">
      <custom-button type="button" text="Vorige" @click="back()" />
      <custom-button text="Volgende" />
      <a class="hover:text-lightGreen underline cursor-pointer ml-3" v-if="!isEdit" @click="saveAsDraft()">Opslaan</a>
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
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import router from '@/router'
import { useRoute } from 'vue-router'

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
    const route = useRoute()
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
    const isEdit = !!route.params.id

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
          comment: values.comment ? values.comment : '',
          equipment: values.equipment ? values.equipment : undefined,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(materialInsurance.value)
        .then((cost: any) => {
          materialInsurance.value.totalCost = cost

          store.dispatch('setMaterialInsuranceState', materialInsurance.value)
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
      const draftData = ref<MaterialInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          comment: values.comment ? values.comment : '',
          equipment: values.equipment ? values.equipment : undefined,
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
      data,
      generalInsuranceState,
      back,
      isEdit,
      saveAsDraft,
    }
  },
})
</script>
