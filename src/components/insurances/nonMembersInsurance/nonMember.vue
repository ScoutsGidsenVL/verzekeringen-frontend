<template>
  <form id="NonMember" @submit.prevent="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div v-if="values" class="md:ml-20 xs:ml-5 sm:ml-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
      <div v-if="typeof values.country === 'object' || !values.country" class="md:w-96 xs:w-72">
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
        <div v-if="values.country.name === '' || values.country.name === 'België'" class="md:w-96 xs:w-72">
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
      <div class="flex gap-1">
        <custom-headline-2 text="Te verzekeren personen" />
        <required rules="required" class="mt-3" />
      </div>
    </div>

    <div class="md:ml-20 xs:ml-5 sm:ml-5">
      <select-non-member id="nonMembers" :is-extra-information-comment="true" rules="required" />
    </div>

    <div>
      <custom-headline-2 text="Opmerkingen" />
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
      </div>
    </div>
    <div class="flex gap-3 mt-5 items-center">
      <back-button stateName="setHolderState" :backToState="HolderStates.GENERAL" />
      <custom-button text="Volgende" />
      <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan als concept</a>
      <a v-if="isDraftEdit" class="link-inline cursor-pointer" @click="patchDraft()">Opslaan als concept</a>
      <loader :is-loading="isSavingDraft" />
    </div>
  </form>
</template>

<script lang="ts">
import SelectNonMember from '@/components/insurances/nonMembersInsurance//selectNonMember.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberInsurance } from '@/serializer/insurances/NonMemberInsurance'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { CountryRepository } from '@/repositories/countriesRepository'
import { Country, CountryDeserializer } from '@/serializer/Country'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
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
import { NonMember } from '@/serializer/NonMember'

export default defineComponent({
  name: 'NonMember',
  components: {
    'select-non-member': SelectNonMember,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'back-button': BackButton,
    required,
    Loader,
  },
  setup() {
    const route = useRoute()
    const isEdit = !!route.params.id
    const isDraftEdit = ref<boolean>(route.path.includes('draft-bewerken'))
    const store = useStore()
    const initialCountry = ref<Country>(CountryDeserializer({ id: '3232', name: 'België' }))
    const data: NonMemberInsurance = store.getters.getCurrentInsuranceState
    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const setGroupOnNonMembers = (list: any) => {
      list.forEach((nm: NonMember) => {
        nm.group = generalInsuranceState.value.group.id
      })
      return list
    }
    const { handleSubmit, values, isSubmitting, validate } = useForm<NonMemberInsurance>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        country: data.country ? data.country : initialCountry.value,
        postCodeCity: data.postCodeCity ? (data.postCodeCity.city === undefined ? undefined : data.postCodeCity) : undefined,
        nonMembers: data.nonMembers ? data.nonMembers : [],
        comment: data.comment ? data.comment : '',
        vvksComment: data.vvksComment ? data.vvksComment : '',
      },
    })

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const allCountries = ref<Country[]>([])

    if (data.country !== undefined) { 
      RepositoryFactory.get(CountryRepository)
      .getArray('/countries_by_type/3/?page_size=1000')
      .then((res: any) => {
        allCountries.value = res.results
        if (isEdit) {
          var countryById
          allCountries.value.forEach((country:any) => {
            if (country.id.toString() === values.country || country.name.toString() === values.country) {
              countryById = country
            }
          })
          values.country = countryById
        }
      })
    }

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'NonMember'))
      handleSubmit(async (values: any) => {
        const nonMember = ref<NonMemberInsurance>({
          ...generalInsuranceState.value,
          ...{
            nature: values.nature,
            postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
            country: values.country ? values.country : undefined,
            nonMembers: values.nonMembers ? setGroupOnNonMembers(values.nonMembers) : [],
            comment: values.comment ? values.comment : '',
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(nonMember.value)
          .then((cost: any) => {
            nonMember.value.totalCost = cost

            store.dispatch('setNonMemberState', nonMember)
            store.dispatch('setHolderState', HolderStates.DETAIL)
          })
      })()
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const isSavingDraft = ref<boolean>(false)
    
    const patchDraft = () => {
      const draftData = ref<NonMemberInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          nonMembers: values.nonMembers ? values.nonMembers : [],
          comment: values.comment ? values.comment : '',
        },
      })

      if (!isSavingDraft.value) {
        isSavingDraft.value = true
        //@ts-ignore
        RepositoryFactory.get(InsuranceTypeRepos[insuranceTypeState.value])
          //@ts-ignore
          .patchDraft(draftData.value, insuranceTypeState.value,route.params.id)
          .then(() => {
            router.push('/home/verzekeringen')
          })
      }
    }

    const saveAsDraft = () => {
      const draftData = ref<NonMemberInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          nonMembers: values.nonMembers ? values.nonMembers : [],
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

    function stringContainsNumber(x: string) {
    return /\d/.test(x);
  }

    return {
      BelgianCitySearchRepository,
      stringContainsNumber,
      CountryRepository,
      isSavingDraft,
      HolderStates,
      isSubmitting,
      saveAsDraft,
      InputTypes,
      onSubmit,
      values,
      isEdit,
      data,
      patchDraft,
      isDraftEdit
    }
  },
})
</script>
