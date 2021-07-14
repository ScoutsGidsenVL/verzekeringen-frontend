<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Gegevens van het ongeval" />

      <div style="width: 470px">
        <custom-input class="xs:w-72 md:w-100" :type="InputTypes.DATE" rules="required" name="dateOfAccident" label="Datum ongeval" />
        <custom-input
          :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full'"
          class="mt-3"
          :type="InputTypes.TEXT_AREA"
          rules="required"
          name="activity"
          label="Tijdens welke activiteit vond het ongeval plaats?"
        />
      </div>

      <div class="mt-3">
        <form>
          <strong>
            <label>
              Tijdens welke soort ongeval vond de activiteit plaats?
              <required rules="required" />
            </label>
          </strong>

          <custom-input v-show="false" :type="'activityTypes'" rules="RequiredActivityTypes" name="activityTypes" />

          <div>
            <input :id="ActivityTypes.REGULAR" v-model="selectedActivityTypes" class="cursor-pointer" type="checkbox" :name="ActivityTypes.REGULAR" :value="ActivityTypes.REGULAR" />
            <label :for="ActivityTypes.REGULAR" class="inline ml-2">Tijdens een activiteit van de hierdoor vermelde scoutsgroep</label>
          </div>

          <div>
            <input
              :id="ActivityTypes.IRREGULAR_LOCATION"
              v-model="selectedActivityTypes"
              class="cursor-pointer"
              type="checkbox"
              :name="ActivityTypes.IRREGULAR_LOCATION"
              :value="ActivityTypes.IRREGULAR_LOCATION"
            />
            <label :for="ActivityTypes.IRREGULAR_LOCATION" class="ml-2">Tijdens een activiteit op verplaatsing</label>
          </div>

          <div>
            <input :id="ActivityTypes.TRANSPORT" v-model="selectedActivityTypes" class="cursor-pointer" type="checkbox" :name="ActivityTypes.TRANSPORT" :value="ActivityTypes.TRANSPORT" />
            <label :for="ActivityTypes.TRANSPORT" class="ml-2">Verplaatsing van of naar activiteit</label>
          </div>

          <ErrorMessage name="activityTypes" class="text-red text-sm block my-2 w-80" />
        </form>
      </div>

      <div class="mt-3">
        <form>
          <strong>
            <label>Schade aan medisch hulpmiddel? bv bril, hoorapparaat, rolstoel</label>
          </strong>

          <div>
            <div class="flex gap-5">
              <div>
                <input :id="'damage'" v-model="isDamage" class="cursor-pointer" type="checkbox" :name="'damage'" :value="true" />
                <label :for="'damage'" class="ml-1">Bril-/materiële schade</label>
              </div>
              <!-- <custom-input class="mt-3 w-96" :type="InputTypes.TEXT" name="something" /> -->
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="mb-5">
      <custom-headline-2 text="Beschrijving van het ongeval" />
      <div style="max-width: 1025px">
        <custom-input
          class="mt-3"
          :type="InputTypes.TEXT_AREA"
          rules="required"
          name="officialReportDescription"
          label="Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade)"
          :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full'"
        />
      </div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, computed, ref, watch } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { InputTypes } from '@/enums/inputTypes'
import { useForm, ErrorMessage } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { ActivityTypes } from '@/enums/activityTypes'
import { DamageTypes } from '@/enums/damageTypes'
import Required from '@/components/semantic/Required.vue'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    ErrorMessage,
    Required,
  },
  setup() {
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const selectedActivityTypes = ref<Array<ActivityTypes>>([])
    const isDamage = ref<Array<boolean>>([])

    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>({
      initialValues: {},
    })

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          dateOfAccident: values.dateOfAccident,
          activity: values.activity,
          activityTypes: selectedActivityTypes.value,
          isDamage: isDamage.value.length === 1 ? true : false,
          officialReportDescription: values.officialReportDescription,
        })

        store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value })
        store.dispatch('setClaimHolderState', ClaimHolderStates.THREE)
      })()
    }

    scrollToTopOfPage()

    watch(
      () => selectedActivityTypes.value,
      () => {
        values.activityTypes = selectedActivityTypes.value
      }
    )

    return {
      isSubmitting,
      InputTypes,
      claimState,
      onSubmit,
      isEdit,
      values,
      ActivityTypes,
      selectedActivityTypes,
      isDamage,
      DamageTypes,
    }
  },
})
</script>
