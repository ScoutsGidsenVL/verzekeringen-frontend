<template>
  <div class="text-lightGreen"><a class="cursor-pointer link-inline" @click="openSideBar()"> + Voeg niet-lid toe </a><required :rules="rules" /></div>
  <non-member-list :can-be-deleted="true" :non-members-list="nonMembers" @deleteNonMemberFromList="deleteNonMemberFromList($event)" @editNonMember="editNonMember($event)" />
  <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />

  <non-member-side-bar
    v-model:side-bar-state="sideBarState"
    :is-extra-information-comment="isExtraInformationComment"
    :existing-list="nonMembers"
    :title="sideBarState.state === 'edit' ? 'Bewerk niet lid' : 'Niet lid'"
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
import Required from '@/components/semantic/Required.vue'
import { sideBarState } from '@/components/semantic/BaseSideBar.vue'

export default defineComponent({
  name: 'SelectNonMembers',
  components: {
    'non-member-side-bar': NonMemberSideBar,
    'non-member-list': NonMemberList,
    ErrorMessage,
    Required,
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
    isExtraInformationComment: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const { value: nonMembers } = useField<NonMember[]>(props.id, props.rules, {
      initialValue: [],
    })
    const sideBarState = ref<sideBarState<NonMember>>({ state: 'hide' })

    const openSideBar = () => {
      sideBarState.value = { state: 'new' }
    }
    const addCreatedNonMemberToList = (nonMember: NonMember) => {
      if (nonMember) {
        nonMembers.value.push(nonMember)
      }
    }

    const deleteNonMemberFromList = (id: string) => {
      nonMembers.value.splice(Number(id), 1)
    }

    const editNonMember = (nonMember: NonMember) => {
      sideBarState.value = {
        state: 'edit',
        entity: nonMember,
      }
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
      editNonMember,
      openSideBar,
      nonMembers,
      sideBarState,
    }
  },
})
</script>
