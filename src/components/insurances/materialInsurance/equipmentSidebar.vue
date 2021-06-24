<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" name="Equipment" :title="title" :options="['Nieuw', 'Bestaand']">
      <form v-if="selected === 'NieuwEquipment'" ref="formDiv" class="d-flex flex-col relative overflow-y-scroll h-full" @submit.prevent="onSubmit">
        <success-toast v-model:showOrHide="formSendWithSuccess" label="Materiaal succesvol toegevoegd" />
        <div class="mt-4">
          <div class="mt-4">
            <p>Wil je een fiets verzekeren</p>
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

          <div v-if="!isBicycle" class="w-96 mt-4">
            <custom-input extra-info="bv: Tent, Geluidsinstallatie" :type="InputTypes.TEXT" rules="required" name="nature" label="Soort" />
          </div>

          <div class="w-96 mt-4">
            <custom-input
              :extra-info="isBicycle ? 'Merk, model en type. bv: Gazelle, Paris Plus, stads fiets' : 'Materie, model. bv: Senior, JB Systems ME2 mixer'"
              :type="InputTypes.TEXT_AREA"
              rules="required"
              name="description"
              label="Omschrijving"
            />
          </div>

          <div class="w-96 mt-4">
            <strong>Eigenaar</strong><strong v-if="owner">{{ lidType }}</strong>
            <div class="w-full mt-2">
              <input id="equipement-group" v-model="isGroupEquipement" class="mr-2" type="checkbox" />
              <label for="equipement-group">Materiaal is van groep</label>
            </div>
            <div class="py-3">
              <hr v-if="owner" class="border-t-2 border-black" />
              <member-item :member="owner">
                <div class="text-right">
                  <label class="hover:text-lightGreen cursor-pointer" for="" @click="removeOwner()">Verwijder</label>
                </div>
              </member-item>
            </div>
          </div>

          <div v-show="!isGroupEquipement">
            <div>
              <strong class="cursor-pointer text-lightGreen" @click="openMemberSideBar()"> Selecteer lid </strong>
              <members-side-bar v-model:isDisplay="isMemberSideBarDisplay" :close-on-add="true" :existing-list="members" title="Lid" @addMemberToList="addMember($event)" />
            </div>

            <div class="mt-3">
              <strong class="cursor-pointer text-lightGreen" @click="openNonMemberSideBar()"> Selecteer niet-lid </strong>
              <non-member-side-bar
                v-model:isDisplay="isNonMemberSideBarDisplay"
                :close-on-add="true"
                :existing-list="nonMembers"
                title="Niet lid"
                @addCreatedNonMemberToList="addCreatedNonMember($event)"
              />
            </div>
          </div>

          <div class="w-96 mt-4">
            <custom-input :extra-info="setTotalValueInfo()" :type="InputTypes.TEXT" rules="required" name="totalValue" label="Nieuwwaarde" />
          </div>

          <div class="mt-5 py-4 sticky bottom-0 bg-white">
            <custom-button :text="isEdit ? 'Bewerk' : 'Voeg toe'" />
          </div>
        </div>
      </form>

      <form v-if="selected === 'BestaandEquipment'" class="d-flex flex-col h-full" @submit.prevent="onSubmit">
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
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { NonMember } from '@/serializer/NonMember'
import { Equipment } from '@/serializer/Equipment'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { Owner } from '@/serializer/Owner'
import { useForm } from 'vee-validate'
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
    isEdit: {
      type: Boolean,
      required: true,
    },
    inputEquipment: {
      type: Object as PropType<Equipment>,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore()
    const display = ref<boolean>(props.isDisplay)
    const selected = ref<string>('NieuwEquipment')
    const loading = ref<boolean>(false)
    const searchedEquipmentList = ref<Array<Equipment>>([])
    const isBicycle = ref<boolean>(false)
    const userData = ref<ResponsibleMember>(store.getters.user)
    const owner = ref<Owner>()
    const lidType = ref<String>()
    const { handleSubmit, values, validate, resetForm, meta } = useForm<Equipment>({
      initialValues: {
        id: props.isEdit ? props.inputEquipment.id : undefined,
        nature: props.isEdit ? props.inputEquipment.nature : '',
        description: props.isEdit ? props.inputEquipment.description : '',
        totalValue: props.isEdit ? props.inputEquipment.totalValue : '',
        ownerMember: props.isEdit ? props.inputEquipment.ownerMember : undefined,
        ownerNonMember: props.isEdit ? props.inputEquipment.ownerNonMember : undefined,
      },
    })

    const { formSendWithSuccess } = useFormSendWithSuccess<Equipment>(meta)
    const { formDiv, scrollToTop } = useScrollToTop()
    const isGroupEquipement = ref<boolean>(false)

    if (props.isEdit) {
      if (values.ownerMember || values.ownerNonMember) {
        owner.value = values.ownerMember ? values.ownerMember : values.ownerNonMember
      } else {
        isGroupEquipement.value = true
      }
    }

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewNonMember'))
      handleSubmit(async (values: Equipment) => {
        if (selected.value === 'NieuwEquipment') {
          const equipment = ref<Equipment>({
            id: values.id ? values.id : undefined,
            nature: values.nature ? values.nature : undefined,
            description: values.description ? values.description : undefined,
            totalValue: values.totalValue ? values.totalValue : undefined,
            ownerMember: values.ownerMember ? values.ownerMember : undefined,
            ownerNonMember: values.ownerNonMember ? values.ownerNonMember : undefined,
            group: generalInsuranceState.value.group.name,
          })
          if (!props.isEdit) {
            postEquipment(equipment.value)
          } else {
            updateEquipment(equipment.value)
          }
        }
      })()
    }

    const addEquipment = (equipment: Equipment) => {
      if (equipment.id) {
        RepositoryFactory.get(EquipmentRepository)
          .getById(equipment.id)
          .then((result: Equipment) => {
            context.emit('addEquipmentToList', result)
          })
      }
    }

    const updateEquipment = (data: Equipment) => {
      if (data.id) {
        RepositoryFactory.get(EquipmentRepository)
          .update(data.id, data)
          .then((completed: Equipment) => {
            context.emit('updateEquipmentInList', completed)
          })
      }
    }

    const postEquipment = (data: Equipment) => {
      formSendWithSuccess.value = false
      RepositoryFactory.get(EquipmentRepository)
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

    const isNonMemberSideBarDisplay = ref<boolean>(false)
    const openNonMemberSideBar = () => {
      isNonMemberSideBarDisplay.value = true
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
        if (!display.value) {
          context.emit('update:isEdit', display.value)
        }
      }
    )

    return {
      EquipmentRepository,
      searchedEquipmentList,
      addEquipment,
      InputTypes,
      selected,
      display,
      onSubmit,
      fetchedOptions,
      loading,
      isBicycle,
      userData,
      postEquipment,
      values,
      setTotalValueInfo,
      openNonMemberSideBar,
      isNonMemberSideBarDisplay,
      isMemberSideBarDisplay,
      openMemberSideBar,
      addMember,
      addCreatedNonMember,
      owner,
      removeOwner,
      lidType,
      formSendWithSuccess,
      formDiv,
      isGroupEquipement,
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
