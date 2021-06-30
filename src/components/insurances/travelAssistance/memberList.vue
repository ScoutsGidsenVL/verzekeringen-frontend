<template>
  <div class="grid lg:grid-cols-2 bg-gray gap-4 p-4">
    <div v-for="(member, index) in members" :key="member.id" class="w-full">
      <member-item :member="member">
        <div v-if="canBeDeleted" class="text-left">
          <a class="hover:text-lightGreen cursor-pointer link-inline" for="" @click="deleteMemberFromList(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer inline-block mt-n1 mr-n1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Verwijder</a
          >
        </div>
      </member-item>
    </div>
    <div v-show="members.length === 0" class="font-semibold text-lg">Geen lid geselecteerd</div>
  </div>
</template>
<script lang="ts">
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Member } from '@/serializer/Member'

export default defineComponent({
  name: 'MembersList',
  components: {
    'member-item': MemberItem,
  },
  props: {
    membersList: {
      type: Array as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
    canBeDeleted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emit: ['deleteMemberFromList'],
  setup(props, context) {
    const members = ref<Member[]>(props.membersList)

    watch(
      () => props.membersList,
      () => {
        members.value = props.membersList
      }
    )

    const deleteMemberFromList = (id: string) => {
      context.emit('deleteMemberFromList', id)
    }

    return {
      deleteMemberFromList,
      members,
    }
  },
})
</script>
