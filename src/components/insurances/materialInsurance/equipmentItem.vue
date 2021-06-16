<template>
  <div v-if="equipment" class="w-96">
    <div class="py-3">
      {{ equipment }}
    </div>
    <slot />
    <hr class="border-t-2 border-black" />
  </div>
</template>

<script lang="ts">
import { Equipment } from '@/serializer/Equipment'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    equipment: {
      type: Object as PropType<Equipment>,
      required: true,
    },
  },
})
</script>
