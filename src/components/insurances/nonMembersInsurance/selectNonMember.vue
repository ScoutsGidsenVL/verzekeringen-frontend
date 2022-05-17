<template>
  <span :name="id">
    <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />
  </span>
  <a class="cursor-pointer btn-simple-green mb-4" @click="openSideBar()"> + Voeg persoon toe </a>

  <!-- {{nonMembers}} -->
  <non-member-list
    :can-be-deleted="true"
    :non-members-list="nonMembers"
    @deleteNonMemberFromList="deleteNonMemberFromList($event)"
    @editNonMember="editNonMember($event)"
    @selectedIndex="selectedElement($event)"
  />

  <non-member-side-bar
    v-model:side-bar-state="sideBarState"
    :is-extra-information-comment="isExtraInformationComment"
    :existing-list="nonMembers"
    :title="sideBarState.state === 'edit' ? 'Bewerk persoonsgegevens' : 'Persoonsgegevens'"
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
import { sideBarState } from 'vue-3-component-library'

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
    isExtraInformationComment: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const { value: nonMembers } = useField<NonMember[]>(props.id, props.rules, {})
    const sideBarState = ref<sideBarState<NonMember>>({ state: 'hide' })
    const selectedIndex = ref<number>()

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

    const selectedElement = (selectedElement: number) => {
      selectedIndex.value = selectedElement
    }

    const updateMemberInList = (nonMember: NonMember) => {
      const tempArr: Array<NonMember> = []

      nonMembers.value.forEach((listedNonMember: any, index: number) => {
        if (index === selectedIndex.value) {
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
      selectedElement,
      editNonMember,
      openSideBar,
      nonMembers,
      sideBarState,
    }
  },
})
</script>
