<template>
  <div>
    <div v-for="nonMember in nonMembers" :key="nonMember.id">
      <non-member-item :non-member="nonMember" />
    </div>
  </div>
  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + voeg niet-lid toe </strong>
  </div>
  <base-side-bar v-model:isDisplay="isDisplay" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'

export default defineComponent({
  name: 'NonMembersList',
  components: {
    'non-member-item': NonMemberItem,
    'base-side-bar': BaseSideBar,
  },
  props: {},
  setup() {
    const nonMembers = ref<Array<any>>([])
    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      console.log('openSideBar')
      isDisplay.value = true
    }

    return {
      openSideBar,
      nonMembers,
      isDisplay,
    }
  },
})
</script>
