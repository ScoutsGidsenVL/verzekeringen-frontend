<template>
  <form @submit="onSubmit">
    <div v-if="error">
      <p class="text-red">Er is iets mis gegaan.</p>
    </div>
    <request-insurance-detail>
      <div>
        <p class="font-semibold">Opmerkingen</p>
        <div class="ml-5">
          <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
        </div>
      </div>
    </request-insurance-detail>

    <call-to-action v-if="data" class="mt-4" :text="'&euro; ' + data.totalCost">
      <template v-slot:info>
        <span class="inline-block mb-3 ml-1 mt-0.5 text-xs w-100">*prijs is indicatie</span>

        <div class="pb-5">verzekering aan te vragen met de volgende gegevens. <strong>Kijk ze nog eens grondig na</strong> en ga terug indien er iets niet correct is.</div>
        <custom-button text="Bevestig" />
      </template>
    </call-to-action>

    <div class="flex gap-3 ml-5 mt-5">
      <back-button :backToState="HolderStates.TYPE" />
    </div>
  </form>
</template>

<script lang="ts">
import { InsuranceTypeRepos, InsuranceTypeStoreSetters } from '@/enums/insuranceTypes'
import { DraftRepository } from '@/repositories/insurances/draftRepository'
import CallToAction from '@/components/customHeadlines/CallToAction.vue'
import RequestInsuranceDetail from './RequestInsuranceDetail.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import CustomButton from '@/components/CustomButton.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceSubmit',
  components: {
    'request-insurance-detail': RequestInsuranceDetail,
    'call-to-action': CallToAction,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'back-button': BackButton,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const error = ref<boolean>(false)
    const isEdit = !!route.params.id
    const isDraft = route.meta.isDraft ? route.meta.isDraft : false

    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, isSubmitting } = useForm({
      initialValues: {
        comment: data.comment ? data.comment : '',
      },
    })

    const onSubmit = handleSubmit(async (values: any) => {
      //@ts-ignore
      store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], { ...store.getters.getCurrentInsuranceState, ...{ comment: values.comment } })
      if (isEdit && !isDraft) {
        await editInsurance()
      } else {
        await postInsurance()
      }
    })

    const postInsurance = async () => {
      //@ts-ignore
      await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .create(store.getters.getCurrentInsuranceState)
        .then((completed: any) => {
          store.dispatch('setHolderState', HolderStates.COMPLETED)
          //@ts-ignore
          store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], completed)

          //IF POSTED FROM A DRAFT, DRAFT WILL BE DELETED
          if (isEdit) {
            RepositoryFactory.get(DraftRepository).removeById(route.params.id)
          }
        })
        .catch(() => {
          error.value = true
        })
    }

    const editInsurance = async () => {
      // @ts-ignore
      await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .editById(route.params.id, store.getters.getCurrentInsuranceState)
        .then((completed: any) => {
          store.dispatch('setHolderState', HolderStates.COMPLETED)
          //@ts-ignore
          store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], completed)
        })
        .catch(() => {
          error.value = true
        })
    }

    const back = () => {
      store.dispatch('setHolderState', HolderStates.TYPE)
    }

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    return {
      HolderStates,
      isSubmitting,
      InputTypes,
      onSubmit,
      error,
      back,
      data,
    }
  },
})
</script>
