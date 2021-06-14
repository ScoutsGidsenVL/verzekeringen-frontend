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
    <div class="w-96" v-for="(nonMember, index) in nonMembers" :key="nonMember.id">
      <non-member-item :non-member="nonMember">
        <div v-if="canBeDeleted" class="text-right">
          <label @click="deleteNonMember(index)" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
        </div>
      </non-member-item>
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
    canBeDeleted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emit: ['deleteNonMemberFromList'],
  setup(props, context) {
    const nonMembers = ref<NonMember[]>(props.nonMembersList)

    watch(
      () => props.nonMembersList,
      () => {
        nonMembers.value = props.nonMembersList
      }
    )

    const deleteNonMember = (id: string) => {
      context.emit('deleteNonMemberFromList', id)
    }

    return {
      deleteNonMember,
      nonMembers,
    }
  },
})
</script>
