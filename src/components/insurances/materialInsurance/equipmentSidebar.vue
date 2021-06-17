<template>
  <div>
    <base-side-bar name="Equipment" v-model:isDisplay="display" v-model:selection="selected" :title="title" :options="['Nieuw', 'Bestaand']">
      <div v-if="selected === 'NieuwEquipment'" class="mt-4">
        <form @submit="onSubmit">
          <div class="custom-container mt-4">
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
              <custom-input extraInfo="bv: Tent, Geluidsinstallatie" :type="InputTypes.TEXT" rules="required" name="nature" label="Soort" />
            </div>

            <div class="w-96 mt-4">
              <custom-input
                :extraInfo="isBicycle ? 'Merk, model en type. bv: Gazelle, Paris Plus, stads fiets' : 'Materie, model. bv: Senior, JB Systems ME2 mixer'"
                :type="InputTypes.TEXT_AREA"
                rules="required"
                name="description"
                label="Omschrijving"
              />
            </div>

            <div class="w-96 mt-4">
              <strong>Eigenaar</strong><strong v-if="owner">{{ lidType }}</strong>
              <div class="py-3">
                <hr v-if="owner" class="border-t-2 border-black" />
                <member-item :member="owner">
                  <div class="text-right">
                    <label @click="removeOwner()" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
                  </div>
                </member-item>
              </div>
            </div>

            <div>
              <div>
                <strong class="cursor-pointer text-lightGreen" @click="openMemberSideBar()"> Selecteer ander lid </strong>
                <members-side-bar :closeOnAdd="true" :existingList="members" v-model:isDisplay="isMemberSideBarDisplay" title="Lid" @addMemberToList="addMember($event)" />
              </div>

              <div class="mt-3">
                <strong class="cursor-pointer text-lightGreen" @click="openNonMemberSideBar()"> Selecteer ander niet-lid </strong>
                <non-member-side-bar
                  :closeOnAdd="true"
                  :existingList="nonMembers"
                  v-model:isDisplay="isNonMemberSideBarDisplay"
                  title="Niet lid"
                  @addCreatedNonMemberToList="addCreatedNonMember($event)"
                />
              </div>
            </div>

            <div class="w-96 mt-4">
              <custom-input :extraInfo="setTotalValueInfo()" :type="InputTypes.TEXT" rules="required" name="totalValue" label="Nieuwwaarde" />
            </div>

            <div class="mt-5">
              <custom-button text="Voeg toe" />
            </div>
          </div>
        </form>
      </div>

      <div v-if="selected === 'BestaandEquipment'">
        <form @submit="onSubmit">
          <div>
            <search-input name="equipment" placeholder="Zoek op beschrijving" v-model:loading="loading" :repository="EquipmentRepository" @fetchedOptions="fetchedOptions($event)" />
          </div>

          <div class="custom-container mt-4">
            <hr v-if="searchedEquipmentList.length > 0" class="mt-4 border-t-2 w-96 border-black" />
            <div class="w-96" v-for="equipment in searchedEquipmentList" :key="equipment.id">
              <equipment-item :equipment="equipment">
                <div>
                  <div class="mt-2 pb-4 text-right">
                    <custom-button @click="addEquipment(equipment)" type="button" text="Voeg toe" />
                  </div>
                </div>
              </equipment-item>
            </div>
          </div>
        </form>
      </div>
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
import { computed, defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { Member } from '@/serializer/Member'
import { Owner } from '@/serializer/Owner'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

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
    const display = ref<boolean>(props.isDisplay)
    const selected = ref<string>('NieuwEquipment')
    const loading = ref<boolean>(false)
    const searchedEquipmentList = ref<Array<Equipment>>([])
    const isBicycle = ref<boolean>(false)
    const userData = ref<ResponsibleMember>(store.getters.user)
    const owner = ref<Owner>()
    const lidType = ref<String>()

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const { handleSubmit, values } = useForm<Equipment>({
      initialValues: {},
    })

    const onSubmit = handleSubmit(async (values: Equipment) => {
      if (selected.value === 'NieuwEquipment') {
        const equipment = ref<Equipment>({
          nature: values.nature ? values.nature : undefined,
          description: values.description ? values.description : undefined,
          totalValue: values.totalValue ? values.totalValue : undefined,
          ownerMember: values.ownerMember ? values.ownerMember : undefined,
          ownerNonMember: values.ownerNonMember ? values.ownerNonMember : undefined,
          group: generalInsuranceState.value.group.name,
        })
        postEquipment(equipment.value)
      }
    })

    const addEquipment = (equipment: Equipment) => {
      if (equipment.id) {
        RepositoryFactory.get(EquipmentRepository)
          .getById(equipment.id)
          .then((result: Equipment) => {
            context.emit('addEquipmentToList', result)
          })
      }
    }

    const postEquipment = (data: Equipment) => {
      RepositoryFactory.get(EquipmentRepository)
        .create(data)
        .then((completed: Equipment) => {
          context.emit('addEquipmentToList', completed)
        })
    }

    const fetchedOptions = (options: any) => {
      searchedEquipmentList.value = options
      loading.value = false
    }

    const setTotalValueInfo = () => {
      let text = 'Maximum te verzekeren bedrag per tent 2478,94 EUR. Vrijstelling 247,89 EUR'

      if (isBicycle.value) {
        text = 'Totale nieuwwaarde per fiets max. 495,79 EUR'
      }

      if (values.ownerMember) {
        text = 'Maximum te verzekeren bedrag per tent 2478,94 EUR. Vrijstelling 247,89 EUR'
      }

      if (values.ownerNonMember) {
        text = 'Maximum te verzekeren bedrag per tent 2478,94 EUR. Vrijstelling 247,89 EUR'
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
