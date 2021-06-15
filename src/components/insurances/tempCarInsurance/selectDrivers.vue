<template>
  <driver-list :canBeDeleted="true" :membersList="selectDriverField.drivers" v-model:owner="selectDriverField.isDriverOwner" @deleteMemberFromList="deleteMemberFromList($event)" />
  <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg bestuurder toe </strong>
  </div>

  <div class="mt-5">
    <tip-temp-vehicle />
  </div>
  <div class="mt-5">
    <input class="mr-2 cursor-pointer" v-model="selectDriverField.isDriverOwner" type="radio" id="isOwnerInput" name="isOwnerInput" :value="IS_NO_DRIVER" />
    <label class="cursor-pointer" for="isOwnerInput">Eigenaar is geen bestuurder of het is een huurwagen</label>
    <div v-show="selectDriverField.isDriverOwner === IS_NO_DRIVER">
      <div v-if="!input.firstName && !input.lastName" class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.companyName" label="Firma naam" :rules="'customRequired'" />
      </div>

      <div v-if="!input.companyName">
        <div class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="input.firstName" label="Naam" :rules="'customRequired'" />
        </div>

        <div class="w-96 mt-3">
          <custom-input :type="InputTypes.TEXT" name="input.lastName" label="Achternaam" :rules="'customRequired'" />
        </div>
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.phoneNumber" label="Gsm" :rules="'customRequired'" />
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.DATE" name="input.birthDate" label="Geboortendatum" :rules="'customRequired'" />
      </div>

      <div class="w-96">
        <multi-select
          id="input.postCodeCity"
          :object="true"
          track-by="label"
          value-prop="label"
          :repository="BelgianCitySearchRepository"
          :resolve-on-load="true"
          :options="[]"
          :searchable="true"
          label="Gemeenten"
          placeholder="Zoek op naam/postcode"
          :rules="'customRequired'"
        />
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.street" label="Straat" :rules="'customRequired'" />
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.number" label="Nr" :rules="'customRequired'" />
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" name="input.letterBox" label="Bus" />
      </div>
    </div>
  </div>

  <members-side-bar :existingList="selectDriverField.drivers" v-model:isDisplay="isDisplay" title="Lid" @addMemberToList="addMemberToDriverList($event)" />
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import DriverList from '@/components/insurances/tempCarInsurance/driverList.vue'
import { IS_NO_DRIVER, SelectDriver } from '@/serializer/selectDriver'
import TipTempVehicle from '@/components/tips/tipTempVehicle.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent, ref, watch } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
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

    const { value: selectDriverField } = useField<SelectDriver>(props.id, props.rules, {
      initialValue: {
        drivers: [],
        isDriverOwner: IS_NO_DRIVER,
      },
    })

    const { value: input } = useField<Owner>('input', 'required', {
      initialValue: {},
    })

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

    return {
      BelgianCitySearchRepository,
      addMemberToDriverList,
      deleteMemberFromList,
      openSideBar,
      InputTypes,
      isDisplay,
      selectDriverField,
      IS_NO_DRIVER,
      input,
    }
  },
})
</script>
