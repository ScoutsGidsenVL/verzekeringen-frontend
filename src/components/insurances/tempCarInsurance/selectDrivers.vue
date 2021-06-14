<template>
  <driver-list v-if="true" :canBeDeleted="true" :membersList="selectDriverField.drivers" v-model:owner="selectDriverField.isDriverOwner" @deleteMemberFromList="deleteMemberFromList($event)" />
  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg bestuurder toe </strong>
  </div>

  <input class="mr-2 cursor-pointer" v-model="selectDriverField.isDriverOwner" type="radio" id="-driver" name="gender" :value="IS_NO_DRIVER" />
  <label class="cursor-pointer" :for="'-driver'">Eigenaar is geen bestuurder of het is een huurwagen</label>

  <div v-if="selectDriverField.isDriverOwner === IS_NO_DRIVER" class="mt-4 px-5">
    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="owner.companyName" label="Firma naam" />
    </div>
    <div>
      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" rules="required" name="owner.firstName" label="Naam" />
      </div>

      <div class="w-96 mt-3">
        <custom-input :type="InputTypes.TEXT" rules="required" name="owner.lastName" label="Achternaam" />
      </div>
    </div>

    <div class="w-96">
      <multi-select
        id="owner.location"
        :object="true"
        track-by="label"
        value-prop="label"
        :repository="BelgianCitySearchRepository"
        :resolve-on-load="true"
        :options="[]"
        :searchable="true"
        label="Gemeenten"
        rules="required"
        placeholder="Zoek op naam/postcode"
      />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="owner.street" label="Straat" />
    </div>

    <div class="w-96 mt-3"></div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" name="owner.letterBox" label="Bus" />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" name="owner.phoneNumber" label="Gsm" />
    </div>
  </div>

  <div class="mt-3">
    <custom-headline-2 text="Voertuig" />
    <div class="px-5">
      <select-vehicle id="vehicle" />
    </div>
  </div>

  <members-side-bar :existingList="members" v-model:isDisplay="isDisplay" title="Lid" @addCreatedMemberToList="addCreatedMemberToList($event)" />
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import DriverList from '@/components/insurances/tempCarInsurance/driverList.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export const IS_NO_DRIVER = 'IS_NO_DRIVER'
export interface selectDriver {
  drivers: Member[]
  isDriverOwner: String
}

export default defineComponent({
  name: 'SelectParticipant',
  components: {
    'members-side-bar': MemberSiderbar,
    'driver-list': DriverList,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
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
  setup() {
    const { value: selectDriverField } = useField<selectDriver>('selectDriverField', 'required', {
      initialValue: { drivers: [], isDriverOwner: IS_NO_DRIVER },
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addCreatedMemberToList = (membersEvent: any[]) => {
      membersEvent[0].owner = undefined
      selectDriverField.value.drivers = selectDriverField.value.drivers.concat(membersEvent)
    }

    const deleteMemberFromList = (id: string) => {
      selectDriverField.value.drivers.splice(Number(id), 1)
    }

    return {
      BelgianCitySearchRepository,
      addCreatedMemberToList,
      deleteMemberFromList,
      openSideBar,
      InputTypes,
      isDisplay,
      selectDriverField,
      IS_NO_DRIVER,
    }
  },
})
</script>
