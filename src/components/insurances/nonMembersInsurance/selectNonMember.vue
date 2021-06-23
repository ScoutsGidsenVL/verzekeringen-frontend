<template>
  <non-member-list :canBeDeleted="true" :nonMembersList="nonMembers" @deleteNonMemberFromList="deleteNonMemberFromList($event)" @editNonMember="editNonMember($event)" />
  <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg niet-lid toe </strong>
  </div>

  <non-member-side-bar
    v-if="isDisplay"
    v-model:isEdit="isEdit"
    :inputNonMember="nonMemberToEdit"
    :existingList="nonMembers"
    v-model:isDisplay="isDisplay"
    :title="isEdit ? 'Bewerk niet lid' : 'Niet lid'"
    @addCreatedNonMemberToList="addCreatedNonMemberToList($event)"
    @updateMemberInList="updateMemberInList($event)"
  />
</template>

<script lang="ts">
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import NonMemberList from '@/components/insurances/nonMembersInsurance/nonMembersList.vue'
import { ErrorMessage, useField } from 'vee-validate'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SelectNonMembers',
  components: {
    'non-member-side-bar': NonMemberSideBar,
    'non-member-list': NonMemberList,
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
    const { value: nonMembers } = useField<NonMember[]>(props.id, props.rules, {
      initialValue: [],
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addCreatedNonMemberToList = (nonMember: NonMember) => {
      if (nonMember) {
        nonMembers.value.push(nonMember)
      }
    }

    const deleteNonMemberFromList = (id: string) => {
      nonMembers.value.splice(Number(id), 1)
    }

    const isEdit = ref<Boolean>(false)
    const nonMemberToEdit = ref<NonMember>()

    const editNonMember = (nonMember: NonMember) => {
      nonMemberToEdit.value = nonMember
      isEdit.value = true
      isDisplay.value = true
    }

    const updateMemberInList = (nonMember: NonMember) => {
      const tempArr: Array<NonMember> = []

      nonMembers.value.forEach((listedNonMember) => {
        if (listedNonMember.id === nonMember.id) {
          tempArr.push(nonMember)
        } else {
          tempArr.push(listedNonMember)
        }
      })
      nonMembers.value = tempArr
    }

    return {
      addCreatedNonMemberToList,
      deleteNonMemberFromList,
      updateMemberInList,
      nonMemberToEdit,
      editNonMember,
      openSideBar,
      nonMembers,
      isDisplay,
      isEdit,
    }
  },
})
</script>
