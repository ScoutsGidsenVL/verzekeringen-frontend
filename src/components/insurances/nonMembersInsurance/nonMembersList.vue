<template>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div v-if="nonMembers.length > 0" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
    <div v-if="nonMembers.length > 1" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div class="w-96" v-for="nonMember in nonMembers" :key="nonMember.id">
      <non-member-item :non-member="nonMember" />
    </div>
  </div>

  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + voeg niet-lid toe </strong>
  </div>

  <non-member-side-bar v-model:isDisplay="isDisplay" title="Niet lid" @addCreatedNonMemberToList="addCreatedNonMemberToList($event)" />
</template>
<script lang="ts">
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NonMembersList',
  components: {
    'non-member-item': NonMemberItem,
    'non-member-side-bar': NonMemberSideBar,
  },
  setup() {
    const nonMembers = ref<Array<NonMember>>([])
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
