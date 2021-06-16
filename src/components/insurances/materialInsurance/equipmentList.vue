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

    return {
      deleteEquipment,
      equipment,
    }
  },
})
</script>
