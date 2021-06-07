<template>
  VEHICLE ITEM
  <div v-if="vehicle" class="w-96">
    <slot />
    <hr class="border-t-2 border-black" />
  </div>
</template>

<script lang="ts">
import { Vehicle } from '@/serializer/Vehicle'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    vehicle: {
      type: Object as PropType<Vehicle>,
      required: true,
    },
  },
})
</script>
