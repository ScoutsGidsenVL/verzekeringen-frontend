<template>
  <form @submit="onSubmit">
    <div v-if="error">
      <p class="text-red">Er is iets mis gegaan.</p>
    </div>
    <request-insurance-detail>
      <div>
        <p class="font-semibold">Opmerkingen</p>
        <div class="px-5">
          <custom-input :value="editData.comment" :type="InputTypes.TEXT_AREA" name="comment" label="" />
        </div>
      </div>
    </request-insurance-detail>
    <div class="mt-5">
      <custom-button text="Bevestig" />
    </div>
  </form>
</template>

<script lang="ts">
import { InsuranceTypeRepos, InsuranceTypeStoreSetters } from '@/enums/insuranceTypes'
import RequestInsuranceDetail from './RequestInsuranceDetail.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'RequestInsuranceSubmit',
  components: {
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'request-insurance-detail': RequestInsuranceDetail,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const { handleSubmit } = useForm()
    const error = ref<boolean>(false)
    const isEdit = !!route.params.id

    const data: any = store.getters.getCurrentInsuranceState

    const editData = ref<any>({
      comment: data.comment ? data.comment : '',
    })

    const onSubmit = handleSubmit(async (values: any) => {
      //@ts-ignore
      store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], { ...store.getters.getCurrentInsuranceState, ...{ comment: values.comment } })
      if (isEdit) {
        editInsurance()
      } else {
        postInsurance()
      }
    })

    const postInsurance = () => {
      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .create(store.getters.getCurrentInsuranceState)
        .then((completed: any) => {
          store.dispatch('setHolderState', HolderStates.COMPLETED)
          //@ts-ignore
          store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], completed)
        })
        .catch(() => {
          error.value = true
        })
    }

    const editInsurance = () => {
      // @ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
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

    return {
      onSubmit,
      InputTypes,
      error,
      editData,
    }
  },
})
</script>
