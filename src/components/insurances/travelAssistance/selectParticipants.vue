<template>
  <member-list :canBeDeleted="true" :membersList="members" @deleteMemberFromList="deleteMemberFromList($event)" />

  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + voeg lid toe </strong>
  </div>

  <members-side-bar v-model:isDisplay="isDisplay" title="Lid" @addCreatedMemberToList="addCreatedMemberToList($event)" />
</template>

<script lang="ts">
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import MemberList from '@/components/insurances/travelAssistance/memberList.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SelectParticipant',
  components: {
    'members-side-bar': MemberSiderbar,
    'member-list': MemberList,
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
