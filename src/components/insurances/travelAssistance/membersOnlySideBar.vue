<template>
  <base-side-bar :isOverflowHidden="isOverflowHidden" v-model:isDisplay="display" name="Member" :title="title">
    <div class="d-flex flex-col h-full px-4 pt-4">
      <div>
        <search-input
          :start="start"
          :end="end"
          v-if="generalInsuranceState.group"
          :group="generalInsuranceState.group.id"
          v-model:loading="loading"
          name="member"
          placeholder="Zoek op naam"
          :repository="PersonRepository"
          @fetchedOptions="fetchedOptions($event)"
        />
      </div>

      <div class="h-full overflow-y-scroll mt-4 pb-24">
        <hr v-if="selectedMembers.length > 0" class="mt-4 border-t-2 w-100 border-black" />

        <div v-for="member in selectedMembers" :key="member.id" class="w-100">
          <member-item :member="member">
            <div>
              <div class="pt-3 pb-4 text-right">
                <custom-button
                  type="button"
                  :text="
                    existingList.some((m) => m.firstName === member.firstName && m.lastName === member.lastName && m.street === member.street && m.number === member.number) ? 'Toegevoegd' : 'Voeg toe'
                  "
                  :disabled="
                    existingList && existingList.some((m) => m.firstName === member.firstName && m.lastName === member.lastName && m.street === member.street && m.number === member.number)
                      ? true
                      : false
                  "
                  @click="addMember(member)"
                />
              </div>
            </div>
          </member-item>
        </div>
      </div>
    </div>
  </base-side-bar>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, ref, watch, computed } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { useStore } from 'vuex'
import { BaseSideBar } from 'vue-3-component-library'
import { PersonRepository } from '@/repositories/personRepository'
import { MemberRepository } from '@/repositories/memberRepository'

export default defineComponent({
  name: 'MembersOnlySideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'search-input': SearchInput,
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
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    closeOnAdd: {
      type: Boolean,
      default: false,
      required: false,
    },
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
    start: String,
    end: String,
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const selectedMembers = ref<Member[]>([])
    const loading = ref<boolean>(false)

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const addMember = (member: Member) => {
      if (!props.existingList.includes(member)) {
        context.emit('addMemberToList', member)
      }
      if (props.closeOnAdd) {
        display.value = false
      }
    }

    const fetchedOptions = (options: any) => {
      selectedMembers.value = []
      options.forEach((member: Member) => {
        if (member.groupAdminId && !member.id) {
          RepositoryFactory.get(MemberRepository)
            .getById(member.groupAdminId)
            .then((result: Member) => {
              result.birthDate = member.birthDate
              result.gender = member.gender
              result.isMember = true
              selectedMembers.value.push(result)
            })
        } else {
          selectedMembers.value.push(member)
        }
      })
      loading.value = false
    }

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

    return {
      BelgianCitySearchRepository,
      PersonRepository,
      selectedMembers,
      fetchedOptions,
      InputTypes,
      addMember,
      display,
      loading,
      user,
      generalInsuranceState,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-container {
  max-height: 550px;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
}
</style>
