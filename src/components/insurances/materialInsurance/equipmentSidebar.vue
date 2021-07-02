<template>
  <div>
    <base-side-bar :selection="selected" :is-display="sideBarState.state !== 'hide'" name="Equipment" :title="title" :options="options" @options="changeSideBar" @hideSidebar="closeSideBar">
      <form
        id="addNewEquipment"
        ref="formDiv"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll h-full px-4 pt-3"
        @submit.prevent="onSubmit"
      >
        <success-toast v-model:showOrHide="formSendWithSuccess" label="Materiaal succesvol toegevoegd" />

        <div>
          <div class="w-96 mt-3">
            <strong>Eigenaar</strong><strong v-if="owner">{{ lidType }}</strong>

            <div v-show="!owner" class="w-full mt-2">
              <input id="equipement-group" v-model="isGroupEquipement" class="mr-2" type="checkbox" />
              <label for="equipement-group">Onze groep</label>
              <ErrorMessage name="equipement-group" class="text-red text-sm block mt-1 w-80" />
            </div>

            <div class="py-3">
              <hr v-if="owner" class="border-t-2 border-black" />
              <member-item :member="owner">
                <div v-show="!isSubmitting" class="text-right">
                  <label class="hover:text-lightGreen cursor-pointer" for="" @click="removeOwner()">Verwijder</label>
                </div>
              </member-item>
            </div>
          </div>

          <div>
            <div v-show="isGroupEquipement === false">
              <div>
                <strong class="cursor-pointer text-lightGreen" @click="openMemberSideBar()"> Een lid (persoonlijk materiaal) </strong>
                <members-side-bar v-model:isDisplay="isMemberSideBarDisplay" :close-on-add="true" :existing-list="members" title="Lid" @addMemberToList="addMember($event)" />
              </div>

              <div class="mt-3">
                <strong class="cursor-pointer text-lightGreen" @click="openNonMemberSideBar()"> Een niet-lid (derde) </strong>
                <non-member-side-bar
                  v-model:side-bar-state="nonMemberSideBarState"
                  :close-on-add="true"
                  :existing-list="nonMembers"
                  title="Niet lid"
                  @addCreatedNonMemberToList="addCreatedNonMember($event)"
                />
              </div>
            </div>

            <div class="mt-4">
              <p>Wil je een fiets verzekeren?</p>
              <div class="flex gap-7">
                <div>
                  <input :id="'ja'" v-model="isBicycle" class="cursor-pointer" type="radio" :name="'ja'" :value="true" />
                  <label :for="'ja'" class="ml-2">Ja</label>
                </div>

                <div>
                  <input :id="'nee'" v-model="isBicycle" class="cursor-pointer" type="radio" :name="'nee'" :value="false" />
                  <label :for="'nee'" class="ml-2">Nee</label>
                </div>
              </div>
            </div>

            <div v-if="!isBicycle && !values.ownerMember" class="w-96 mt-4">
              <div>
                <custom-input extra-info="bv: Tent, Geluidsinstallatie" :type="InputTypes.TEXT" name="nature" label="Soort" />
              </div>
            </div>

            <div class="w-96 mt-4">
              <custom-input
                :extra-info="isBicycle ? 'Merk, model en type. bv: Gazelle, Paris Plus, stadsfiets' : 'Merk, model. bv: Senior, JB Systems ME2 mixer'"
                :type="InputTypes.TEXT_AREA"
                rules="required"
                name="description"
                label="Omschrijving"
              />
            </div>
          </div>

          <div class="w-96 mt-4">
            <custom-input :extra-info="setTotalValueInfo()" :type="InputTypes.TEXT" rules="required" name="totalValue" label="Nieuwwaarde" />
          </div>

          <div class="mt-5 py-4 sticky bottom-0 bg-white">
            <custom-button :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
          </div>
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'list', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full px-4 pt-3" @submit.prevent="onSubmit">
        <div>
          <search-input v-model:loading="loading" name="equipment" placeholder="Zoek op beschrijving" :repository="EquipmentRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="h-full overflow-y-scroll mt-4 pb-24">
          <hr v-if="searchedEquipmentList.length > 0" class="mt-4 border-t-2 w-96 border-black" />
          <div v-for="equipment in searchedEquipmentList" :key="equipment.id" class="w-96">
            <equipment-item :equipment="equipment">
              <div>
                <div class="mt-2 pb-4 text-right">
                  <custom-button type="button" :text="existingList.includes(equipment) ? 'Toegevoegd' : 'Voeg toe'" @click="addEquipment(equipment)" />
                </div>
              </div>
            </equipment-item>
          </div>
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import NonMemberSideBar from '@/components/insurances/nonMembersInsurance/nonMemberSideBar.vue'
import MemberSiderbar from '@/components/insurances/travelAssistance/membersSideBar.vue'
import EquipmentItem from '@/components/insurances/materialInsurance/equipmentItem.vue'
import MemberItem from '@/components/insurances/travelAssistance/memberItem.vue'
import { EquipmentRepository } from '@/repositories/equipmentRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar, { option, sideBarState } from '@/components/semantic/BaseSideBar.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { NonMember } from '@/serializer/NonMember'
import { Equipment } from '@/serializer/Equipment'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { Owner } from '@/serializer/Owner'
import { useField, useForm, ErrorMessage } from 'vee-validate'
import { useStore } from 'vuex'
import { scrollToFirstError, useFormSendWithSuccess, useScrollToTop } from '@/veeValidate/helpers'
import SuccessToast from '@/components/semantic/successToast.vue'

export default defineComponent({
  name: 'EquipmentSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'equipment-item': EquipmentItem,
    'search-input': SearchInput,
    'custom-input': CustomInput,
    'non-member-side-bar': NonMemberSideBar,
    'members-side-bar': MemberSiderbar,
    'member-item': MemberItem,
    'success-toast': SuccessToast,
    ErrorMessage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    existingList: {
      type: Array,
      default: () => {
        return []
      },
    },
    sideBarState: {
      type: Object as PropType<sideBarState<Equipment>>,
      required: true,
      default: () => {
        'hide'
      },
    },
  },
  emits: ['update:sideBarState', 'addEquipmentToList', 'updateEquipmentInList'],
  setup(props, context) {
    const options = ref<option[]>([
      { text: 'Nieuw', value: 'Nieuw' },
      { text: 'Uit eerdere aanvragen', value: 'Bestaand' },
    ])
    const store = useStore()
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandEquipment' : 'NieuwEquipment'))
    const loading = ref<boolean>(false)
    const searchedEquipmentList = ref<Array<Equipment>>([])
    const isBicycle = ref<boolean>(false)
    const userData = ref<ResponsibleMember>(store.getters.user)
    const owner = ref<Owner | null>()
    const lidType = ref<String>()
    const { resetForm, handleSubmit, validate, meta, values, isSubmitting } = useForm<Equipment>()
    const { value: isGroupEquipement } = useField('equipement-group', 'isGroupOwnerOrOwner:@ownerMember,@ownerNonMember', {
      initialValue: false,
    })
    const { formSendWithSuccess } = useFormSendWithSuccess<Equipment>(meta)
    const { formDiv, scrollToTop } = useScrollToTop()
    const { sideBarState } = toRefs(props)
    const nonMemberSideBarState = ref<sideBarState<NonMember>>({ state: 'hide' })
    const memberSideBarState = ref<sideBarState<NonMember>>({ state: 'hide' })

    watch(sideBarState, (value: sideBarState<Equipment>) => {
      if (value.state === 'edit') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: value.entity.id,
            nature: value.entity.nature,
            description: value.entity.description,
            totalValue: value.entity.totalValue,
            ownerMember: value.entity.ownerMember,
            ownerNonMember: value.entity.ownerNonMember,
            owner: value.entity.ownerMember ? value.entity.ownerMember : value.entity.ownerNonMember ? value.entity.ownerNonMember : undefined,
            group: value.entity.group,
          },
        })
        owner.value = values.owner

        if (value.entity.ownerMember) {
          lidType.value = ' (Lid)'
        }

        if (value.entity.ownerNonMember) {
          lidType.value = ' (Niet lid)'
        }

        if (value.entity.ownerMember === undefined && value.entity.ownerNonMember === undefined) {
          isGroupEquipement.value = true
        }
      }

      if (value.state === 'new') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: '',
            nature: '',
            description: '',
            totalValue: '',
            ownerMember: undefined,
            ownerNonMember: undefined,
            group: '',
          },
          errors: {},
        })
      }
    })

    if (sideBarState.value.state === 'edit') {
      if (values.ownerMember || values.ownerNonMember) {
        owner.value = values.ownerMember ? values.ownerMember : values.ownerNonMember
      } else {
        isGroupEquipement.value = true
      }
    }

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })
    isSubmitting
    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewEquipment'))

      handleSubmit(async (values: Equipment) => {
        if (props.sideBarState.state === 'new' || props.sideBarState.state === 'edit') {
          const equipment = ref<Equipment>({
            id: values.id ? values.id : undefined,
            nature: (values.nature && values.ownerNonMember) || (values.nature && values.ownerNonMember === undefined && values.ownerMember === undefined) ? values.nature : undefined,
            description: values.description ? values.description : undefined,
            totalValue: values.totalValue ? values.totalValue : undefined,
            ownerMember: values.ownerMember && isGroupEquipement.value === false ? values.ownerMember : undefined,
            ownerNonMember: values.ownerNonMember && isGroupEquipement.value === false ? values.ownerNonMember : undefined,
            group: generalInsuranceState.value.group.id,
          })
          if (props.sideBarState.state === 'edit') {
            await updateEquipment(equipment.value)
          } else {
            await postEquipment(equipment.value)
          }
        }
      })()
    }

    const addEquipment = async (equipment: Equipment) => {
      if (equipment.id) {
        await RepositoryFactory.get(EquipmentRepository)
          .getById(equipment.id)
          .then((result: Equipment) => {
            context.emit('addEquipmentToList', result)
          })
      }
    }

    const updateEquipment = async (data: Equipment) => {
      console.log('HIT', data)
      if (data.id) {
        await RepositoryFactory.get(EquipmentRepository)
          .update(data.id, data)
          .then((completed: Equipment) => {
            context.emit('updateEquipmentInList', completed)
          })
      }
    }

    const postEquipment = async (data: Equipment) => {
      formSendWithSuccess.value = false
      await RepositoryFactory.get(EquipmentRepository)
        .create(data)
        .then((completed: Equipment) => {
          context.emit('addEquipmentToList', completed)
          formSendWithSuccess.value = true
          resetForm()
          scrollToTop()
        })
    }

    const fetchedOptions = (options: any) => {
      searchedEquipmentList.value = options
      loading.value = false
    }

    const setTotalValueInfo = () => {
      let text = 'Maximum te verzekeren bedrag per tent 2500 EUR. Vrijstelling 250 EUR'

      if (values.ownerMember) {
        text = 'Maximum te verzekeren bedrag per tent 2500 EUR. Vrijstelling 250 EUR'
      }

      if (values.ownerNonMember) {
        text = 'Maximum te verzekeren bedrag per tent 2500 EUR. Vrijstelling 250 EUR'
      }

      if (isBicycle.value) {
        text = 'Totale nieuwwaarde per fiets max. 500 EUR'
      }

      return text
    }

    const isMemberSideBarDisplay = ref<boolean>(false)
    const openMemberSideBar = () => {
      isMemberSideBarDisplay.value = true
    }

    const openNonMemberSideBar = () => {
      nonMemberSideBarState.value = { state: 'new' }
    }

    const addMember = (member: Member) => {
      values.ownerNonMember = undefined
      values.ownerMember = member
      owner.value = member
      lidType.value = ' (Lid)'
    }

    const addCreatedNonMember = (nonMember: NonMember) => {
      if (nonMember.id) {
        values.ownerMember = undefined
        values.ownerNonMember = nonMember
        owner.value = nonMember
        lidType.value = ' (Niet lid)'
      }
    }

    const removeOwner = () => {
      owner.value = undefined
      values.ownerMember = undefined
      values.ownerNonMember = undefined
    }

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const changeSideBar = (options: 'NieuwEquipment' | 'BestaandEquipment') => {
      if (options === 'NieuwEquipment') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandEquipment') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    return {
      EquipmentRepository,
      searchedEquipmentList,
      addEquipment,
      InputTypes,
      selected,
      onSubmit,
      fetchedOptions,
      loading,
      isBicycle,
      userData,
      postEquipment,
      values,
      setTotalValueInfo,
      openNonMemberSideBar,
      openMemberSideBar,
      addMember,
      addCreatedNonMember,
      owner,
      removeOwner,
      lidType,
      formSendWithSuccess,
      formDiv,
      isGroupEquipement,
      changeSideBar,
      closeSideBar,
      nonMemberSideBarState,
      memberSideBarState,
      isMemberSideBarDisplay,
      options,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-container {
  max-height: 650px;
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
