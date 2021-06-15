<template>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div v-if="membersList.length > 0" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
    <div v-if="membersList.length > 1" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
  </div>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div class="w-96" v-for="(member, index) in membersList" :key="member.id">
      <member-item :member="member">
        <div v-if="canBeDeleted" class="text-right">
          <label @click="deleteDriverFromList(index)" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
          <input
            class="mr-2 ml-4 cursor-pointer"
            v-model="ownerComputed"
            type="radio"
            :id="index + 'isOwner'"
            :name="index + 'isOwner'"
            :value="member.firstName + member.lastName + member.birthDate"
          />
          <label class="cursor-pointer" :for="index + 'isOwner'">Eigenaar</label>
        </div>
      </member-item>
    </div>
  </div>
</template>
<script lang="ts">
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { computed, defineComponent, PropType } from 'vue'

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
    owner: {
      type: String,
    },
  },
  emit: ['update:owner', 'deleteMemberFromList'],
  setup(props, context) {
    const ownerComputed = computed<any>({
      get: () => props.owner,
      set: (value: any) => context.emit('update:owner', value),
    })

    const deleteDriverFromList = (id: string) => {
      context.emit('deleteMemberFromList', id)
    }
    return {
      deleteDriverFromList,
      ownerComputed,
    }
  },
})
</script>
