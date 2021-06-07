<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title">
      <div>
        <form @submit="onSubmit">
          <div class="w-96">
            <multi-select
              id="member"
              track-by="name"
              value-prop="value"
              :repository="MemberRepository"
              :options="[]"
              :searchable="true"
              label="Zoek"
              placeholder="Zoek op naam"
              @addSelection="addMember($event)"
            />
          </div>
          <div>
            <hr v-if="selectedMembers.length > 0" class="mt-4 border-t-2 border-black" />
            <div class="w-96" v-for="(member, index) in selectedMembers" :key="member.id">
              <member-item :member="member">
                <div>
                  <div class="pt-3 pb-4 text-right">
                    <input type="checkbox" :id="index" v-model="member.isChecked" />
                    <label class="pl-3" for="">Selecteer</label>
                  </div>
                </div>
              </member-item>
            </div>
          </div>
          <div class="mt-5"><custom-button text="Voeg toe" /></div>
        </form>
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { MemberRepository } from '@/repositories/memberRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { Member } from '@/serializer/Member'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MemberSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'multi-select': MultiSelect,
    'member-item': MemberItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const { handleSubmit } = useForm<Member>()
    const selectedMembers = ref<Member[]>([])

    watch(
      () => props.isDisplay,
      () => {
        display.value = props.isDisplay
      }
    )

    watch(
      () => display.value,
      () => {
        context.emit('update:isDisplay', display.value)
      }
    )

    const onSubmit = handleSubmit(async () => {
      const tempList = ref<Array<Member>>([])
      selectedMembers.value.forEach((member) => {
        if (member.isChecked) {
          tempList.value.push(member)
        }
      })
      context.emit('addCreatedMemberToList', tempList.value)

      selectedMembers.value = []
    })

    const addMember = (member: any) => {
      if (member) {
        selectedMembers.value.push(member)
      }
    }

    return {
      BelgianCitySearchRepository,
      MemberRepository,
      selectedMembers,
      addMember,
      InputTypes,
      display,
      onSubmit,
      user,
    }
  },
})
</script>
