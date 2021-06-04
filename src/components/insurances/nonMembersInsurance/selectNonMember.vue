<template>
  <non-member-list :nonMembersList="nonMembers" />

  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + voeg niet-lid toe </strong>
  </div>

  <non-member-side-bar v-model:isDisplay="isDisplay" title="Niet lid" @addCreatedNonMemberToList="addCreatedNonMemberToList($event)" />
</template>

<script lang="ts">
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import NonMemberList from '@/components/insurances/nonMembersInsurance/nonMembersList.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'NonMembersList',
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
    const addCreatedNonMemberToList = (nonMembersEvent: NonMember[]) => {
      nonMembers.value = nonMembers.value.concat(nonMembersEvent)
    }

    return {
      addCreatedNonMemberToList,
      openSideBar,
      nonMembers,
      isDisplay,
    }
  },
})
</script>
