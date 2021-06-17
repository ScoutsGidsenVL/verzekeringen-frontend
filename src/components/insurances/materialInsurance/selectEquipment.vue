<template>
  <equipment-list :canBeDeleted="true" :equipmentList="equipment" @deleteEquipmentFromList="deleteEquipmentFromList($event)" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Voeg materiaal toe </strong>
  </div>

  <equipment-side-bar :existingList="equipment" v-model:isDisplay="isDisplay" title="Materiaal" @addEquipmentToList="addEquipmentToList($event)" />
</template>

<script lang="ts">
import EquipmentSidebar from '@/components/insurances/materialInsurance/equipmentSidebar.vue'
import EquipmentList from '@/components/insurances/materialInsurance/equipmentList.vue'
import { Equipment } from '@/serializer/Equipment'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SelectMaterial',
  components: {
    'equipment-side-bar': EquipmentSidebar,
    'equipment-list': EquipmentList,
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

    // const equipment = ref<any>([])

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

    return {
      addEquipmentToList,
      deleteEquipmentFromList,
      openSideBar,
      equipment,
      isDisplay,
    }
  },
})
</script>
