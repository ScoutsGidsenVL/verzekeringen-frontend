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
        <template v-slot:top>
          <div class="my-3 flex justify-end" @click="editNonMember(nonMember)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </template>

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

    const editNonMember = (nonMember: NonMember) => {
      context.emit('editNonMember', nonMember)
    }

    return {
      deleteNonMember,
      editNonMember,
      nonMembers,
    }
  },
})
</script>
