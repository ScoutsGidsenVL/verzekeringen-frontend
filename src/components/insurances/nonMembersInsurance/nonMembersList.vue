<template>
  <div>
    <div v-for="nonMember in nonMembers" :key="nonMember.id">
      <non-member-item :non-member="nonMember" />
    </div>
  </div>
  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + voeg niet-lid toe </strong>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
export default defineComponent({
  name: 'NonMembersList',
  components: {
    'non-member-item': NonMemberItem,
  },
  props: {},
  setup() {
    const nonMembers = ref<Array<any>>([])

    const openSideBar = () => {
      console.log('OPEN SIDEBAR')
    }

    return {
      openSideBar,
      nonMembers,
    }
  },
})
</script>
