<template>
  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div v-if="equipment.length > 0" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
    <div v-if="equipment.length > 1" class="w-96">
      <hr class="border-t-2 border-black" />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-1" style="width: 850px">
    <div class="w-96" v-for="(material, index) in equipment" :key="material.id">
      <equipment-item :equipment="material">
        <template v-slot:top>
          <div class="mt-3 flex justify-end" @click="editEquipment(material)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
          <div>
            <div v-if="material.ownerMember">(Equipment van lid)</div>
            <div v-if="material.ownerNonMember">(Equipment van niet-lid)</div>
            <div v-if="!material.ownerNonMember && !material.ownerMember">(Equipment van groep)</div>
          </div>
        </template>

        <div v-if="canBeDeleted" class="text-right">
          <label @click="deleteEquipment(index)" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
        </div>
      </equipment-item>
    </div>
  </div>
</template>

<script lang="ts">
import EquipmentItem from '@/components/insurances/materialInsurance/equipmentItem.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Equipment } from '@/serializer/Equipment'

export default defineComponent({
  name: 'EquipmentList',
  components: {
    'equipment-item': EquipmentItem,
  },
  props: {
    equipmentList: {
      type: Array as PropType<Array<any>>,
      required: false,
      default: () => {
        return []
      },
    },
    canBeDeleted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emit: ['deleteEquipmentFromList'],
  setup(props, context) {
    const equipment = ref<Equipment[]>(props.equipmentList)

    watch(
      () => props.equipmentList,
      () => {
        equipment.value = props.equipmentList
      }
    )

    const deleteEquipment = (id: string) => {
      context.emit('deleteEquipmentFromList', id)
    }

    const editEquipment = (equipment: Equipment) => {
      context.emit('editEquipment', equipment)
    }

    return {
      deleteEquipment,
      editEquipment,
      equipment,
    }
  },
})
</script>
