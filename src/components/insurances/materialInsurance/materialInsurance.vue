<template>
  <form id="MaterialInsurance" @submit.prevent="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div v-if="values" class="md:ml-20 xs:ml-5 sm:ml-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />

      <div class="xs:w-72 md:w-96">
        <multi-select
          id="country"
          rules="required"
          insurance-type-id="6"
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
      <div v-if="values.country.name === '' || values.country.name === 'België'" class="xs:w-72 md:w-96">
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

    <div class="flex gap-1">
      <custom-headline-2 class="mt-2" text="Materiaal" />
      <required rules="required" class="mt-3" />
    </div>
    <div class="md:ml-20 xs:ml-5 sm:ml-5 mt-3">
      <select-equipment id="equipment" rules="required" />
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
  </form>
</template>

<script lang="ts">
import SelectEquipment from '@/components/insurances/materialInsurance/selectEquipment.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { MaterialInsurance } from '@/serializer/insurances/MaterialInsurance'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { CountryRepository } from '@/repositories/countriesRepository'
import { Country, CountryDeserializer } from '@/serializer/Country'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BackButton from '@/components/semantic/BackButton.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { scrollToFirstError } from '@/veeValidate/helpers'
import required from '@/components/semantic/Required.vue'
import CustomButton from '@/components/CustomButton.vue'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'MaterialInsurance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-equipment': SelectEquipment,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'back-button': BackButton,
    required,
    Loader,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const initialCountry = ref<Country>(CountryDeserializer({ id: '3232', name: 'België' }))
    const data: MaterialInsurance = store.getters.getCurrentInsuranceState
    console.log('MAT DATA: ', data)
    const { handleSubmit, values, isSubmitting, validate } = useForm<MaterialInsurance>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        country: data.country ? data.country : initialCountry.value,
        postCodeCity: data.postCodeCity ? (data.postCodeCity.city === undefined ? {} : data.postCodeCity) : undefined,
        equipment: data.equipment ? data.equipment : [],
        vvksComment: data.vvksComment ? data.vvksComment : '',
        comment: data.comment ? data.comment : undefined,
      },
    })
    const isEdit = !!route.params.id

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'MaterialInsurance'))
      handleSubmit(async (values: any) => {
        const materialInsurance = ref<MaterialInsurance>({
          ...generalInsuranceState.value,
          ...{
            nature: values.nature,
            postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
            country: values.country ? values.country : undefined,
            comment: values.comment ? values.comment : '',
            equipment: values.equipment ? values.equipment : undefined,
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(materialInsurance.value)
          .then((cost: any) => {
            materialInsurance.value.totalCost = cost

            store.dispatch('setMaterialInsuranceState', materialInsurance.value)
            store.dispatch('setHolderState', HolderStates.DETAIL)
          })
      })()
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const isSavingDraft = ref<boolean>(false)
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

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    return {
      BelgianCitySearchRepository,
      generalInsuranceState,
      CountryRepository,
      isSavingDraft,
      HolderStates,
      saveAsDraft,
      InputTypes,
      onSubmit,
      values,
      isEdit,
      data,
    }
  },
})
</script>
