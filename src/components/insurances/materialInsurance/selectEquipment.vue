<template>
  <equipment-list :canBeDeleted="true" :equipmentList="equipment" @deleteEquipmentFromList="deleteEquipmentFromList($event)" @editEquipment="editEquipment($event)" />

  <div class="mt-2 text-lightGreen"><strong class="cursor-pointer" @click="openSideBar()"> + Voeg materiaal toe </strong><required :rules="rules" /></div>

  <equipment-side-bar
    v-if="isDisplay"
    v-model:isEdit="isEdit"
    :inputEquipment="equipmentToEdit"
    :existingList="equipment"
    v-model:isDisplay="isDisplay"
    :title="isEdit ? 'Bewerk materiaal' : 'Materiaal'"
    @addEquipmentToList="addEquipmentToList($event)"
    @updateEquipmentInList="updateEquipmentInList($event)"
  />
</template>

<script lang="ts">
import EquipmentSidebar from '@/components/insurances/materialInsurance/equipmentSidebar.vue'
import EquipmentList from '@/components/insurances/materialInsurance/equipmentList.vue'
import { Equipment } from '@/serializer/Equipment'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'
import Required from '@/components/semantic/Required.vue'

export default defineComponent({
  name: 'SelectMaterial',
  components: {
    'equipment-side-bar': EquipmentSidebar,
    'equipment-list': EquipmentList,
    Required,
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

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
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

    const editEquipment = (editVehicle: Equipment) => {
      equipmentToEdit.value = editVehicle
      isEdit.value = true
      isDisplay.value = true
    }

    const updateEquipmentInList = (quipment: Equipment) => {
      const tempArr: Array<Equipment> = []

      equipment.value.forEach((listedEquipment: Equipment) => {
        if (listedEquipment.id === quipment.id) {
          tempArr.push(quipment)
        } else {
          tempArr.push(listedEquipment)
        }
      })
      equipment.value = tempArr
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
    }
  },
})
</script>
