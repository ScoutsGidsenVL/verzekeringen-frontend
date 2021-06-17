<template>
  <form @submit="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
      {{ oneTimeActivityState }}
      <div class="mt-4">
        <strong>Land</strong>
        <div class="w-96">
          <p class="mt-2 w-96">Belgie</p>
        </div>
      </div>
      <div class="w-96">
        <multi-select
          id="location"
          :object="true"
          track-by="label"
          value-prop="label"
          :repository="BelgianCitySearchRepository"
          :resolve-on-load="true"
          :options="[values.location]"
          :searchable="true"
          label="Gemeente"
          rules="required"
          placeholder="Zoek op naam/postcode"
        />
      </div>
      <div class="mt-2 w-96">
        <multi-select
          id="groupSize"
          :object="true"
          track-by="label"
          value-prop="id"
          :options="groupSizes"
          :searchable="false"
          label="Aantal extra te verzekeren personen"
          rules="required"
          placeholder="Aantal"
        />
      </div>
    </div>
    <div class="flex gap-3 px-5 mt-5">
      <custom-button @click="back()" type="button" text="Vorige" />
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { InsuranceGroupSizesRepository } from '@/repositories/insuranceGroupSizes'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
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

type oneTimeActivityFormType = {
  nature: string
  location: Location
  groupSize: number
}

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<oneTimeActivityFormType>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        location: data.location ? data.location : '',
        groupSize: data.groupSize ? data.groupSize : '',
      },
    })

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const groupSizes = ref<any[]>([])
    const fetchGroupSizes = () => {
      RepositoryFactory.get(InsuranceGroupSizesRepository)
        .getArray()
        .then((result: any) => {
          groupSizes.value = result
        })
    }

    fetchGroupSizes()

    const onSubmit = handleSubmit(async (values: oneTimeActivityFormType) => {
      const oneTimeActivity = ref<OneTimeActivity>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          groupSize: values.groupSize,
          comment: data.comment,
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(oneTimeActivity.value)
        .then((cost: any) => {
          oneTimeActivity.value.totalCost = cost
        })

      store.dispatch('setOneTimeActivityState', oneTimeActivity.value).then(() => {
        store.dispatch('setHolderState', HolderStates.DETAIL)
      })
    })

    const back = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }

    return {
      groupSizes,
      BelgianCitySearchRepository,
      InputTypes,
      onSubmit,
      generalInsuranceState,
      values,
      back,
    }
  },
})
</script>
