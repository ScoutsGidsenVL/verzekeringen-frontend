<template>
  <div class="grid lg:grid-cols-2 bg-gray gap-1 gap-4 p-4">
    <div v-for="(material, index) in equipment" :key="material.id" class="w-full text-center">
      <equipment-item :equipment="material">
        <template #top>
          <div>
            <div v-if="material.ownerMember">(Equipment van lid)</div>
            <div v-if="material.ownerNonMember">(Equipment van niet-lid)</div>
            <div v-if="!material.ownerNonMember && !material.ownerMember">(Groepsmateriaal)</div>
          </div>
        </template>

        <div v-show="!isSubmitting" v-if="canBeDeleted" class="text-left">
          <a class="hover:text-lightGreen cursor-pointer link-inline inline-block mr-3" for="" @click="editEquipment(material)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer inline-block mt-n1 mr-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span class="inline-block">Bewerken</span>
          </a>

          <a class="hover:text-lightGreen cursor-pointer link-inline" for="" @click="deleteEquipment(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer inline-block mt-n1 mr-n1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Verwijder
          </a>
        </div>
      </equipment-item>
    </div>
    <div v-show="equipment.length === 0" class="font-semibold text-lg">Geen materiaal geselecteerd</div>
  </div>
</template>

<script lang="ts">
import EquipmentItem from '@/components/insurances/materialInsurance/equipmentItem.vue'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { Equipment } from '@/serializer/Equipment'
import { useStore } from 'vuex'

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
    const store = useStore()
    const equipment = ref<Equipment[]>(props.equipmentList)

    const deleteEquipment = (id: string) => {
      context.emit('deleteEquipmentFromList', id)
    }

    const editEquipment = (equipment: Equipment) => {
      context.emit('editEquipment', equipment)
    }

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    watch(
      () => props.equipmentList,
      () => {
        equipment.value = props.equipmentList
      }
    )

    return {
      deleteEquipment,
      editEquipment,
      isSubmitting,
      equipment,
    }
  },
})
</script>
