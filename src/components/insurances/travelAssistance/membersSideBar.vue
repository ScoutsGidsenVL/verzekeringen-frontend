<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title">
      <div>
        <form @submit="onSubmit">
          <div>
            <search-input name="member" placeholder="Zoek op naam" v-model:loading="loading" :repository="MemberRepository" @fetchedOptions="fetchedOptions($event)" />
          </div>

          <div class="custom-container mt-4">
            <hr v-if="selectedMembers.length > 0" class="mt-4 border-t-2 w-96 border-black" />
            <div class="w-96" v-for="(member, index) in selectedMembers" :key="member.id">
              <member-item :member="member">
                <div>
                  <div class="pt-3 pb-4 text-right">
                    <input class="cursor-pointer" type="checkbox" :id="index" v-model="member.isChecked" />
                    <label class="pl-2" for="">Selecteer</label>
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
import CustomButton from '@/components/CustomButton.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import { Member } from '@/serializer/Member'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
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
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const { handleSubmit } = useForm<Member>()
    const selectedMembers = ref<Member[]>([])
    const loading = ref<boolean>(false)

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
      display.value = false
    })

    const fetchedOptions = (options: any) => {
      let alreadySelected: Array<any> = []

      selectedMembers.value.forEach((member) => {
        if (member.isChecked) {
          alreadySelected.push(member)
        }
      })
      selectedMembers.value = alreadySelected

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

    return {
      BelgianCitySearchRepository,
      MemberRepository,
      selectedMembers,
      InputTypes,
      display,
      onSubmit,
      user,
      fetchedOptions,
      loading,
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
