<template>
  <member-list :canBeDeleted="true" :membersList="members" @deleteMemberFromList="deleteMemberFromList($event)" />
  <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg lid toe </strong>
  </div>

  <members-side-bar :existingList="members" v-model:isDisplay="isDisplay" title="Lid" @addMemberToList="addMemberToList($event)" />
</template>

<script lang="ts">
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import MemberList from '@/components/insurances/travelAssistance/memberList.vue'
import { ErrorMessage, useField } from 'vee-validate'
import { Member } from '@/serializer/Member'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SelectParticipant',
  components: {
    'members-side-bar': MemberSiderbar,
    'member-list': MemberList,
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
    const { value: members } = useField<Member[]>(props.id, props.rules, {
      initialValue: [],
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addMemberToList = (member: Member) => {
      members.value.push(member)
    }

    const deleteMemberFromList = (id: string) => {
      members.value.splice(Number(id), 1)
    }

    return {
      addMemberToList,
      deleteMemberFromList,
      openSideBar,
      members,
      isDisplay,
    }
  },
})
</script>
