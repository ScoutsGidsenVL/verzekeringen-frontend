<template>
  <non-member-list :canBeDeleted="true" :nonMembersList="nonMembers" @deleteNonMemberFromList="deleteNonMemberFromList($event)" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg niet-lid toe </strong>
  </div>

  <non-member-side-bar :existingList="nonMembers" v-model:isDisplay="isDisplay" title="Niet lid" @addCreatedNonMemberToList="addCreatedNonMemberToList($event)" />
</template>

<script lang="ts">
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import NonMemberList from '@/components/insurances/nonMembersInsurance/nonMembersList.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SelectNonMembers',
  components: {
    'non-member-side-bar': NonMemberSideBar,
    'non-member-list': NonMemberList,
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
    const { value: nonMembers } = useField<NonMember[]>(props.id, props.rules, {
      initialValue: [],
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addCreatedNonMemberToList = (nonMembersList: NonMember[]) => {
      nonMembers.value = nonMembers.value.concat(nonMembersList)
    }

    const deleteNonMemberFromList = (id: string) => {
      nonMembers.value.splice(Number(id), 1)
    }

    return {
      addCreatedNonMemberToList,
      deleteNonMemberFromList,
      openSideBar,
      nonMembers,
      isDisplay,
    }
  },
})
</script>
