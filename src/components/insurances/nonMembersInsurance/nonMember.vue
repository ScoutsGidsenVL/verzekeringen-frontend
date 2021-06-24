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
          :options="values.country ? [values.country] : [{ id: '3232', name: 'België' }]"
          :extra-option="{ id: '3232', name: 'België' }"
          :searchable="true"
          label="Land"
          placeholder="Zoek op naam"
        />
      </div>
      <div v-if="values.country">
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
    </div>

    <div class="mt-3">
      <custom-headline-2 text="Niet leden" />
    </div>

    <div class="px-5">
      <select-non-member :isExtraInformationComment="true" id="nonMembers" rules="required" />
    </div>

    <div class="flex gap-3 px-5 mt-5">
      <custom-button type="button" text="Vorige" @click="back()" />
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import SelectNonMember from '@/components/insurances/nonMembersInsurance//selectNonMember.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberInsurance } from '@/serializer/insurances/NonMemberInsurance'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { Country, CountryDeserializer } from '@/serializer/Country'
import { InsuranceTypeRepos } from '@/enums/insuranceTypes'
import RepositoryFactory from '@/repositories/repositoryFactory'

export default defineComponent({
  name: 'NonMember',
  components: {
    'select-non-member': SelectNonMember,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const initialCountry = ref<Country>(CountryDeserializer({ id: '3232', name: 'België' }))
    const data: NonMemberInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<NonMemberInsurance>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        country: data.country ? data.country : initialCountry.value,
        postCodeCity: data.postCodeCity ? (data.postCodeCity.city === undefined ? undefined : data.postCodeCity) : undefined,
        nonMembers: data.nonMembers ? data.nonMembers : [],
      },
    })

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      const nonMember = ref<NonMemberInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          nonMembers: values.nonMembers ? values.nonMembers : [],
          comment: data.comment,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(nonMember.value)
        .then((cost: any) => {
          nonMember.value.totalCost = cost

          store.dispatch('setNonMemberState', nonMember)
          store.dispatch('setHolderState', HolderStates.DETAIL)
        })
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
      back,
    }
  },
})
</script>
