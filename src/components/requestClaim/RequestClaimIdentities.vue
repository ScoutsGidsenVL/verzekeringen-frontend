<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Identiteit van de verzekeringsnemer" />
      <div></div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Identiteit van het slachtoffer" />
      <div></div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import CustomButton from '@/components/CustomButton.vue'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { defineComponent, computed, ref } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'

export default defineComponent({
  name: 'RequestClaimIdentities',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const { handleSubmit, values, validate, isSubmitting } = useForm<BaseInsurance>({
      initialValues: {},
    })

    const claimState = computed((): InsuranceTypes => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const claimState = ref<any>({})
        console.log(values)

        store.dispatch('setClaimState', claimState)
        store.dispatch('setClaimHolderState', ClaimHolderStates.TWO)
      })()
    }

    scrollToTopOfPage()

    return {
      isSubmitting,
      InputTypes,
      onSubmit,
      isEdit,
      values,
      claimState,
    }
  },
})
</script>
