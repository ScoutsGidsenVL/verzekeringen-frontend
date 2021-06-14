<template>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div v-if="members.length > 0" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
    <div v-if="members.length > 1" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div class="w-96" v-for="(member, index) in members" :key="member.id">
      <member-item :member="member">
        <div v-if="canBeDeleted" class="text-right">
          <label @click="deleteMemberFromList(index)" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
        </div>
      </member-item>
    </div>
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
