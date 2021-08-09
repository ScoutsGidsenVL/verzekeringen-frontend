<template>
  <span :name="id">
    <ErrorMessage :name="id" class="text-red text-sm block mt-1 w-80" />
  </span>
  <a class="cursor-pointer btn-simple-green mb-4" @click="openSideBar()"> + Voeg materiaal toe </a>

  <equipment-list :can-be-deleted="true" :equipment-list="equipment" @deleteEquipmentFromList="deleteEquipmentFromList($event)" @editEquipment="editEquipment($event)" />

  <equipment-side-bar
    v-model:side-bar-state="sideBarState"
    :existing-list="equipment"
    :title="sideBarState.state === 'edit' ? 'Bewerk materiaal' : 'Materiaal toevoegen'"
    @addEquipmentToList="addEquipmentToList($event)"
    @updateEquipmentInList="updateEquipmentInList($event)"
  />
</template>

<script lang="ts">
import EquipmentSidebar from '@/components/insurances/materialInsurance/equipmentSidebar.vue'
import EquipmentList from '@/components/insurances/materialInsurance/equipmentList.vue'
import { Equipment } from '@/serializer/Equipment'
import { defineComponent, ref } from 'vue'
import { useField, ErrorMessage } from 'vee-validate'
import { sideBarState } from 'vue-3-component-library'

export default defineComponent({
  name: 'SelectMaterial',
  components: {
    'equipment-side-bar': EquipmentSidebar,
    'equipment-list': EquipmentList,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
  },
  setup(props) {
    const { value: equipment } = useField<any>(props.id, props.rules, {
      initialValue: [],
    })
    const sideBarState = ref<sideBarState<Equipment>>({ state: 'hide' })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      sideBarState.value = { state: 'new' }
    }

    const addEquipmentToList = (material: Equipment) => {
      if (equipment.value.filter((x: Equipment) => x.id == material.id).length === 0) {
        equipment.value.push(material)
      }
    }

    const deleteEquipmentFromList = (id: string) => {
      equipment.value.splice(Number(id), 1)
    }

    const equipmentToEdit = ref<Equipment>()
    const isEdit = ref<boolean>(false)

    const editEquipment = (editEquipment: Equipment) => {
      sideBarState.value = {
        state: 'edit',
        entity: editEquipment,
      }
    }

    const updateEquipmentInList = (material: Equipment) => {
      const tempArr: Array<Equipment> = []

      equipment.value.forEach((listedEquipment: Equipment) => {
        if (listedEquipment.id === material.id) {
          tempArr.push(material)
        } else {
          tempArr.push(listedEquipment)
        }
      })
      equipment.value = tempArr
      sideBarState.value = { state: 'hide' }
    }

    return {
      deleteEquipmentFromList,
      updateEquipmentInList,
      addEquipmentToList,
      equipmentToEdit,
      editEquipment,
      openSideBar,
      equipment,
      isDisplay,
      isEdit,
      sideBarState,
    }
  },
})
</script>
