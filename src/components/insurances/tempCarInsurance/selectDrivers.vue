<template>
  <span :name="id">
    <ErrorMessage :name="id" class="text-red text-sm block w-80" />
  </span>
  <a class="cursor-pointer btn-simple-green mb-4" @click="openSideBar()"> + Voeg bestuurder toe </a>
  <driver-list v-model:owner="selectDriverField.isDriverOwner" :can-be-deleted="true" :members-list="selectDriverField.drivers" @deleteMemberFromList="deleteMemberFromList($event)" />
  <div class="mt-5">
    <tip-temp-vehicle />
  </div>
  <div class="mt-5">
    <div v-show="!isSubmitting" class="flex">
      <input id="isOwnerInput" v-model="selectDriverField.isDriverOwner" class="mr-2 cursor-pointer mt-1.5" type="radio" name="isOwnerInput" :value="IS_NO_DRIVER" />
      <label class="cursor-pointer" for="isOwnerInput">Eigenaar is geen bestuurder of het is een huurwagen</label>
    </div>
    <div v-show="selectDriverField.isDriverOwner === IS_NO_DRIVER" class="md:ml-5">
      <div v-if="!input.firstName && !input.lastName" class="xs:w-72 md:w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.companyName" label="Firma naam" :rules="'customRequired'" />
      </div>

      <div v-if="!input.companyName">
        <div class="xs:w-72 md:w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="input.firstName" label="Naam" :rules="'customRequired'" />
        </div>

        <div class="xs:w-72 md:w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="input.lastName" label="Achternaam" :rules="'customRequired'" />
        </div>
      </div>

      <div class="xs:w-72 md:w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.phoneNumber" label="Gsm" :rules="'customRequired'" />
      </div>

      <div class="xs:w-72 md:w-96">
        <multi-select
          id="input.postCodeCity"
          :object="true"
          track-by="label"
          value-prop="label"
          :repository="BelgianCitySearchRepository"
          :resolve-on-load="true"
          :options="[]"
          :searchable="true"
          label="Gemeente"
          placeholder="Zoek op naam/postcode"
          :rules="'customRequired'"
        />
      </div>

      <div class="xs:w-72 md:w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.street" label="Straat" :rules="'customRequired'" />
      </div>

      <div class="xs:w-72 md:w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.number" label="Nr" :rules="'customRequired'" />
      </div>

      <div class="xs:w-72 md:w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.letterBox" label="Bus" />
      </div>
    </div>
  </div>
  <members-side-bar :start="generalInsuranceState.startDate" :end="generalInsuranceState.endDate" v-if="generalInsuranceState.group" v-model:isDisplay="isDisplay" :group="generalInsuranceState.group.id" :existing-list="selectDriverField.drivers" title="Lid" @addMemberToList="addMemberToDriverList($event)" />
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import DriverList from '@/components/insurances/tempCarInsurance/driverList.vue'
import { IS_NO_DRIVER, SelectDriver } from '@/serializer/selectDriver'
import TipTempVehicle from '@/components/tips/tipTempVehicle.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
import { InputTypes } from '@/enums/inputTypes'
import { Driver } from '@/serializer/Driver'
import { Owner } from '@/serializer/Owner'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SelectParticipant',
  components: {
    'members-side-bar': MemberSiderbar,
    'driver-list': DriverList,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'tip-temp-vehicle': TipTempVehicle,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
  },
  setup(props) {
    const store = useStore()

    const { value: selectDriverField } = useField<any>(props.id, props.rules, {})

    const { value: input } = useField<Owner>('input', 'required', {})

    watch(
      () => selectDriverField.value.isDriverOwner,
      () => {
        store.dispatch('setIsDriverOwnerState', selectDriverField.value.isDriverOwner)
      }
    )

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addMemberToDriverList = (driver: Driver) => {
      selectDriverField.value.drivers.push(driver)
    }

    const deleteMemberFromList = (id: string) => {
      selectDriverField.value.drivers.splice(Number(id), 1)
    }

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    return {
      BelgianCitySearchRepository,
      addMemberToDriverList,
      generalInsuranceState,
      deleteMemberFromList,
      selectDriverField,
      IS_NO_DRIVER,
      isSubmitting,
      openSideBar,
      InputTypes,
      isDisplay,
      input,
    }
  },
})
</script>
