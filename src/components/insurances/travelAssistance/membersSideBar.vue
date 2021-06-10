<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title">
      <div>
        <div>
          <search-input name="member" placeholder="Zoek op naam" v-model:loading="loading" :repository="MemberRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="custom-container mt-4">
          <hr v-if="selectedMembers.length > 0" class="mt-4 border-t-2 w-96 border-black" />
          <div class="w-96" v-for="member in selectedMembers" :key="member.id">
            <member-item :member="member">
              <div>
                <div class="pt-3 pb-4 text-right">
                  <custom-button @click="addMember(member)" type="button" text="Voeg toe" />
                </div>
              </div>
            </member-item>
          </div>
        </div>

        <div class="mt-5"><custom-button text="Voeg toe" /></div>
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
import CustomButton from '@/components/CustomButton.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'
import RepositoryFactory from '@/repositories/repositoryFactory'

export default defineComponent({
  name: 'MemberSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'member-item': MemberItem,
    'search-input': SearchInput,
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
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const selectedMembers = ref<Member[]>([])
    const loading = ref<boolean>(false)

    const addMember = (member: Member) => {
      if (!props.existingList.includes(member)) {
        context.emit('addCreatedMemberToList', [member])
      }
    }

    const fetchedOptions = (options: any) => {
      options.forEach((member: Member) => {
        RepositoryFactory.get(MemberRepository)
          .getById(member.id)
          .then((result: Member) => {
            result.birthDate = member.birthDate
            selectedMembers.value.push(result)
          })
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
      MemberRepository,
      selectedMembers,
      InputTypes,
      display,
      user,
      fetchedOptions,
      loading,
      addMember,
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
