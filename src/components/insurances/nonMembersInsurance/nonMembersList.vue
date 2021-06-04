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
</template>
<script lang="ts">
import NonMemberItem from '@/components/insurances/nonMembersInsurance/nonMemberItem.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { NonMember } from '@/serializer/NonMember'

export default defineComponent({
  name: 'NonMembersList',
  components: {
    'non-member-item': NonMemberItem,
  },
  props: {
    nonMembersList: {
      type: Array as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
  },
  setup(props) {
    const nonMembers = ref<NonMember[]>(props.nonMembersList)

    watch(
      () => props.nonMembersList,
      () => {
        nonMembers.value = props.nonMembersList
      }
    )

    const addCreatedNonMemberToList = (nonMembersEvent: NonMember[]) => {
      nonMembers.value = nonMembers.value.concat(nonMembersEvent)
    }

    return {
      addCreatedNonMemberToList,
      nonMembers,
    }
  },
})
</script>
