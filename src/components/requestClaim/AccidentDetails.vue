<template>
  <form id="RequestInsuranceGeneral" @submit.prevent="onSubmit">
    <div class="mb-5">
      <custom-headline-2 text="Gegevens van het ongeval" />

      <div style="width: 470px">
        <custom-input class="xs:w-72 md:w-100" :type="InputTypes.DATE" rules="required" name="dateOfAccident" label="Datum ongeval" />
        <custom-input
          :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full h-11'"
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

          <custom-input v-show="false" :type="'activityTypes'" rules="required" name="activityTypes" />

          <!-- OPTION 1 -->
          <div>
            <input :id="ActivityTypes.REGULAR" v-model="selectedActivityType" class="cursor-pointer" type="radio" :name="ActivityTypes.REGULAR" :value="ActivityTypes.REGULAR" />
            <label :for="ActivityTypes.REGULAR" class="inline ml-2">Tijdens een activiteit van de hiervoor vermelde scoutsgroep</label>
          </div>
          <!-- OPTION 2 -->
          <div>
            <input
              :id="ActivityTypes.IRREGULAR_LOCATION"
              v-model="selectedActivityType"
              class="cursor-pointer"
              type="radio"
              :name="ActivityTypes.IRREGULAR_LOCATION"
              :value="ActivityTypes.IRREGULAR_LOCATION"
            />
            <label :for="ActivityTypes.IRREGULAR_LOCATION" class="ml-2">Verplaatsing van of naar activiteit</label>
          </div>
          <!-- OPTION 3 -->
          <div>
            <div>
              <input :id="ActivityTypes.TRANSPORT" v-model="selectedActivityType" class="cursor-pointer" type="radio" :name="ActivityTypes.TRANSPORT" :value="ActivityTypes.TRANSPORT" />
              <label :for="ActivityTypes.TRANSPORT" class="ml-2">Tijdens een activiteit op verplaatsing</label>
              <label class="invisible">
                <!-- somehow without this code it wont work? -->
                {{ selectedActivityType }}
              </label>
            </div>

            <div>
              <custom-input class="xs:w-72 md:w-72" :type="InputTypes.TEXT" placeholder="Gebruikte vervoermiddel" name="usedTransport" />
            </div>
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
              <!-- <div>
                <input :id="'isDamage'" v-model="isDamage" class="cursor-pointer" type="checkbox" :name="'isDamage'" :value="true" />
                <label :for="'isDamage'" class="ml-1">Bril-/materiële schade</label>
              </div> -->

              <!-- <custom-input class="mt-3 w-96" :type="InputTypes.TEXT" name="something" /> -->
            </div>
            <div>
              <custom-input placeholder="Welk hulpmiddel?" class="xs:w-72 md:w-72" :type="InputTypes.TEXT" name="damage" />
              <label class="invisible">
                <!-- somehow without this code it wont work? -->
                {{ isDamage }}
              </label>
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
          name="description"
          label="Beschrijving van het ongeval (oorzaken, omstandigheden en gevolgen, opgelopen verwondingen en/of schade)"
          :textAreaWidth="'xs:w-72 md:w-100 md:min-w-full h-36'"
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
      isSubmitting,
      InputTypes,
      claimState,
      onSubmit,
      isEdit,
      values,
      ActivityTypes,
      selectedActivityType,
      isDamage,
      DamageTypes,
    }
  },
})
</script>
