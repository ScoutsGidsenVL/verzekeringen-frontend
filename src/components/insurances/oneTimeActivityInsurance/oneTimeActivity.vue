<template>
  <form id="OneTimeActivity" @submit.prevent="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div class="md:ml-20 xs:ml-5 sm:ml-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
      <div class="mt-4">
        <strong>Land</strong>
        <div class="w-96">
          <p class="mt-2 w-96">Belgie</p>
        </div>
      </div>
      <div class="xs:w-72 md:w-96">
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
      <div class="mt-2 xs:w-72 md:w-96">
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

    <div>
      <custom-headline-2 text="Opmerkingen" />
      <div class="md:ml-20 xs:ml-5 sm:ml-5">
        <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
      </div>
    </div>

    <div class="flex gap-3 md:ml-20 xs:ml-5 sm:ml-5 mt-5 items-center">
      <back-button stateName="setHolderState" :backToState="HolderStates.GENERAL" />
      <custom-button text="Volgende" />
      <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan als concept</a>
      <a v-if="isDraftEdit" class="link-inline cursor-pointer" @click="patchDraft()">Opslaan als concept</a>
      <loader :is-loading="isSavingDraft" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { InsuranceGroupSizesRepository } from '@/repositories/insuranceGroupSizes'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { scrollToFirstError } from '@/veeValidate/helpers'
import CustomButton from '@/components/CustomButton.vue'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

type oneTimeActivityFormType = {
  nature: string
  location: Location
  groupSize: number
  comment: string
  vvksComment: string
}

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'back-button': BackButton,
    Loader,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, values, isSubmitting, validate } = useForm<oneTimeActivityFormType>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        location: data.location ? data.location : '',
        groupSize: data.groupSize ? data.groupSize : '',
        comment: data.comment ? data.comment : '',
        vvksComment: data.vvksComment ? data.vvksComment : '',
      },
    })
    const isEdit = !!route.params.id
    const isDraftEdit = ref<boolean>(route.path.includes('draft-bewerken'))

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

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'OneTimeActivity'))
      handleSubmit(async (values: oneTimeActivityFormType) => {
        const oneTimeActivity = ref<OneTimeActivity>({
          ...generalInsuranceState.value,
          ...{
            nature: values.nature,
            location: values.location,
            groupSize: values.groupSize,
            comment: values.comment ? values.comment : '',
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(oneTimeActivity.value)
          .then((cost: any) => {
            oneTimeActivity.value.totalCost = cost

            store.dispatch('setOneTimeActivityState', oneTimeActivity.value).then(() => {
              store.dispatch('setHolderState', HolderStates.DETAIL)
            })
          })
      })()
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const isSavingDraft = ref<boolean>(false)

    const patchDraft = () => {
      const draftData = ref<OneTimeActivity>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          groupSize: values.groupSize,
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
      const draftData = ref<OneTimeActivity>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          groupSize: values.groupSize,
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

    fetchGroupSizes()

    return {
      BelgianCitySearchRepository,
      generalInsuranceState,
      isSavingDraft,
      HolderStates,
      saveAsDraft,
      groupSizes,
      InputTypes,
      onSubmit,
      values,
      isEdit,
      patchDraft,
      isDraftEdit
    }
  },
})
</script>
