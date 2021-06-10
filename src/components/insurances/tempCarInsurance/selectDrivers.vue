<template>
  <driver-list :canBeDeleted="true" :membersList="members" @deleteMemberFromList="deleteMemberFromList($event)" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg bestuurder toe </strong>
  </div>

  <div class="mt-4">
    <input class="mr-2 cursor-pointer" v-model="selectedDriver" type="radio" id="test" name="gender" :value="member" />
    <label class="cursor-pointer" :for="index + '-driver'">Eigenaar</label>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="companyName" label="Firma naam" />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="firstName" label="Naam" />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
    </div>

    <div class="w-96">
      <multi-select
        id="location"
        :object="true"
        track-by="label"
        value-prop="label"
        :repository="BelgianCitySearchRepository"
        :resolve-on-load="true"
        :options="[]"
        :searchable="true"
        label="Location"
        rules="required"
        placeholder="Zoek op naam/postcode"
      />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
    </div>

    <div class="w-96 mt-3"></div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" name="letterBox" label="Bus" />
    </div>

    <div class="w-96 mt-3">
      <custom-input :type="InputTypes.TEXT" name="phoneNumber" label="Gsm" />
    </div>
  </div>

  <members-side-bar :existingList="members" v-model:isDisplay="isDisplay" title="Lid" @addCreatedMemberToList="addCreatedMemberToList($event)" />
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import DriverList from '@/components/insurances/tempCarInsurance/driverList.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { InputTypes } from '@/enums/inputTypes'
import MultiSelect from '@/components/inputs/MultiSelect.vue'

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
  setup(props) {
    const { value: members } = useField<NonMember[]>(props.id, props.rules, {
      initialValue: [],
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addCreatedMemberToList = (membersEvent: NonMember[]) => {
      members.value = members.value.concat(membersEvent)
    }

    const deleteMemberFromList = (id: string) => {
      members.value.splice(Number(id), 1)
    }

    return {
      BelgianCitySearchRepository,
      addCreatedMemberToList,
      deleteMemberFromList,
      openSideBar,
      members,
      isDisplay,
      InputTypes,
    }
  },
})
</script>
