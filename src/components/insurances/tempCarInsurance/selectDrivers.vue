<template>
  <driver-list :canBeDeleted="true" :membersList="members" @deleteMemberFromList="deleteMemberFromList($event)" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg bestuurder toe </strong>
  </div>

  <div>
    <input class="mr-2 ml-4 cursor-pointer" v-model="selectedDriver" type="radio" id="test" name="gender" :value="member" />
    <label class="cursor-pointer" :for="index + '-driver'">Eigenaar</label>
  </div>

  <members-side-bar v-model:isDisplay="isDisplay" title="Lid" @addCreatedMemberToList="addCreatedMemberToList($event)" />
</template>

<script lang="ts">
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import DriverList from '@/components/insurances/tempCarInsurance/driverList.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SelectParticipant',
  components: {
    'members-side-bar': MemberSiderbar,
    'driver-list': DriverList,
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
      addCreatedMemberToList,
      deleteMemberFromList,
      openSideBar,
      members,
      isDisplay,
    }
  },
})
</script>
