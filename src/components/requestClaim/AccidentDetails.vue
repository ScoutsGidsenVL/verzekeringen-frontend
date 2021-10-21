<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Wat is er gebeurd?" />

      <div style="max-width: 505px">
        <custom-input :max="maxDate" class="xs:w-72 md:w-100" :type="InputTypes.DATE" rules="required" name="dateOfAccident" label="Datum van het ongeval" />
        
        <div class="mt-3">
        <form>
          <strong>
            <label>
              Het ongeval gebeurde:
              <required rules="required" />
            </label>
          </strong>

          <custom-input v-show="false" :type="'activityTypes'" rules="required" name="activityTypes" />

          <!-- OPTION 1 -->
          <div>
            <input :id="ActivityTypes.REGULAR" v-model="selectedActivityType" class="cursor-pointer" type="radio" :name="ActivityTypes.REGULAR" :value="ActivityTypes.REGULAR" />
            <label :for="ActivityTypes.REGULAR" class="inline ml-2">tijdens de activiteit van onze groep.</label>
          </div>
          <!-- OPTION 3 -->
          <div>
            <div>
              <input :id="ActivityTypes.TRANSPORT" v-model="selectedActivityType" class="cursor-pointer" type="radio" :name="ActivityTypes.TRANSPORT" :value="ActivityTypes.TRANSPORT" />
              <label :for="ActivityTypes.TRANSPORT" class="ml-2 xs:max-w-xs xs:pt-5">op de heen- of terugweg van of naar de activiteit.</label>
            </div>
            <div style="margin-left:1.3em">
              <custom-input :maxlength="30" class="xs:w-64 md:w-100" :type="InputTypes.TEXT" placeholder="Hoe gebeurde de verplaatsing? (te voet, met de fiets...)" name="usedTransport" />
            </div>
          </div>
          <label class="h-0 invisible">
            <!-- somehow without this code it wont work? -->
            {{ selectedActivityType }}
          </label>

          <ErrorMessage name="activityTypes" class="text-red text-sm block my-2 w-80" />
        </form>
      </div>
        
        <custom-input
          :maxlength="1024"
          :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full h-11'"
          class="mt-3 xs:w-80 md:w-100"
          :type="InputTypes.TEXT_AREA"
          rules="required"
          name="activity"
          label="Geef een korte beschrijving van de scoutsactiviteit."
        />
      </div>

      <div class="mt-3">
        <form>
          <div class="mb-2">
            <div style="max-width: 1025px">
              <custom-input
                :maxlength="1024"
                class="mt-3 xs:w-80 md:w-100"
                :type="InputTypes.TEXT_AREA"
                rules="required"
                name="description"
                label="Geef een uitgebreide beschrijving van het ongeval (oorzaken, omstandigheden, gevolgen, opgelopen verwondingen, schade)."
                :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full h-36'"
              />
            </div>
          </div>

          <strong>
            <label>Is er schade aan een medisch hulpmiddel? (bril, hoorapparaat, rolstoel...)</label>
          </strong>

          <div>
            <div style="max-width: 505px;">
              <custom-input :maxlength="128" class="xs:w-80 md:w-100" placeholder="Welk hulpmiddel?" :type="InputTypes.TEXT" name="damageType" />
              <label class="invisible">
                <!-- somehow without this code it wont work? -->
                {{ isDamage }}
              </label>
            </div>
          </div>

          <display-content-checkbox text="Hield iemand van de leiding toezicht op het moment dat het ongeval plaatsvond?">
            <div class="md:w-96 xs:w-72">
              <custom-input :type="InputTypes.TEXT" name="leadershipDescription" placeholder="Naam" />
            </div>
          </display-content-checkbox>
        </form>
      </div>
    </div>

    <div class="flex gap-3 mt-5 items-center">
      <back-button stateName="setClaimHolderState" :backToState="ClaimHolderStates.ONE" />
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { scrollToFirstError, useScrollToTop } from '@/veeValidate/helpers'
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import { defineComponent, computed, ref, watch } from 'vue'
import Required from '@/components/semantic/Required.vue'
import CustomButton from '@/components/CustomButton.vue'
import { ActivityTypes } from '@/enums/activityTypes'
import { useForm, ErrorMessage } from 'vee-validate'
import { Claim } from '@/serializer/claims/claim'
import { DamageTypes } from '@/enums/damageTypes'
import { InputTypes } from '@/enums/inputTypes'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import moment from 'moment'
import DisplayContentCheckBox from '@/components/semantic/displayContentCheckbox.vue'

export default defineComponent({
  name: 'AccidentDetails',
  components: {
    'display-content-checkbox': DisplayContentCheckBox,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'back-button': BackButton,
    ErrorMessage,
    Required,
  },
  setup() {
    const maxDate = moment().format('YYYY-MM-DD')
    const { scrollToTopOfPage } = useScrollToTop()
    const route = useRoute()
    const store = useStore()
    const isEdit = !!route.params.id
    const selectedActivityType = ref<any>()
    const isDamage = ref<Array<boolean>>([])

    const { handleSubmit, values, validate, isSubmitting } = useForm<Claim>()

    const claimState = computed((): Claim => {
      return store.state.claim.claimState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'RequestInsuranceGeneral'))
      handleSubmit(async (values: any) => {
        const newClaimState = ref<Claim>({
          dateOfAccident: values.dateOfAccident,
          activity: values.activity,
          activityTypes: [selectedActivityType.value],
          isDamage: isDamage.value.length === 1 ? true : false,
          description: values.description,
          usedTransport: values.usedTransport,
          damage: values.damage,
          leadershipDescription: values.leadershipDescription ? values.leadershipDescription : undefined,
          damageType: values.damageType ? values.damageType : undefined,
        })

        store.dispatch('setClaimState', { ...claimState.value, ...newClaimState.value })
        store.dispatch('setClaimHolderState', ClaimHolderStates.THREE)
      })()
    }

    scrollToTopOfPage()

    watch(
      () => values.usedTransport,
      () => {
        if (values.usedTransport && values.usedTransport.length > 0) {
          selectedActivityType.value = ActivityTypes.TRANSPORT
        }
      }
    )

    watch(
      () => selectedActivityType.value,
      () => {
        values.activityTypes = [selectedActivityType.value]
      }
    )

    watch(
      () => values.damage,
      () => {
        if (values.damage && values.damage.length > 0) {
          if (isDamage.value.length === 0) {
            isDamage.value = [true]
          }
        } else if (isDamage.value.includes(true)) {
          isDamage.value = []
        }
      }
    )
    return {
      selectedActivityType,
      ClaimHolderStates,
      ActivityTypes,
      isSubmitting,
      DamageTypes,
      InputTypes,
      claimState,
      onSubmit,
      isDamage,
      isEdit,
      values,
      maxDate
    }
  },
})
</script>
