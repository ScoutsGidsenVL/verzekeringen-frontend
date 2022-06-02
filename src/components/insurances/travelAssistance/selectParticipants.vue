<template>
  <span :name="id">
    <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />
  </span>
  <a class="cursor-pointer btn-simple-green mb-4" @click="openSideBar()"> + Voeg lid toe </a>
  <member-list :can-be-deleted="true" :members-list="members" @deleteMemberFromList="deleteMemberFromList($event)" />
  <members-side-bar v-if="generalInsuranceState.group" v-model:isDisplay="isDisplay" :start="generalInsuranceState.startDate" :end="generalInsuranceState.endDate" :group="generalInsuranceState.group.id" :existing-list="members" title="Lid" @addMemberToList="addMemberToList($event)" />
</template>

<script lang="ts">
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import MemberList from '@/components/insurances/travelAssistance/memberList.vue'
import { ErrorMessage, useField } from 'vee-validate'
import { Member } from '@/serializer/Member'
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

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
    const { value: members } = useField<Member[]>(props.id, props.rules, {})

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

    const store = useStore()

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    return {
      addMemberToList,
      deleteMemberFromList,
      openSideBar,
      members,
      isDisplay,
      generalInsuranceState
    }
  },
})
</script>
