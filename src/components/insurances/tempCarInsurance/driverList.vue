<template>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div v-if="members.length > 0" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
    <div v-if="members.length > 1" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
  </div>
  {{ selectedDriver }}
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div class="w-96" v-for="(member, index) in members" :key="member.id">
      <member-item :member="member">
        <div v-if="canBeDeleted" class="text-right">
          <label @click="deleteMemberFromList(index)" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
          <input class="mr-2 ml-4 cursor-pointer" v-model="owner" type="radio" :id="index + '-driver'" name="gender" :value="member" />
          <label class="cursor-pointer" :for="index + '-driver'">Eigenaar</label>
        </div>
      </member-item>
    </div>
  </div>
</template>
<script lang="ts">
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Member } from '@/serializer/Member'
import { useField } from 'vee-validate'

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
  setup(props, context) {
    const members = ref<Member[]>(props.membersList)
    const selectedDriver = ref<Member>()

    const { value: owner } = useField<any>('owner', 'required', {
      initialValue: {},
    })

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
      selectedDriver,
      owner,
    }
  },
})
</script>
