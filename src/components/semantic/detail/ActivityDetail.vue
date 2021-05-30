<template>
  <p class="font-semibold">Activiteit</p>
  <div class="px-5">
    <label-output label="Aard van activiteit" :text="nature" />
    <label-output label="Locatie" :text="location.postalCode + ' ' + location.city" />
    <label-output label="Aantal personen" :text="groupAmount" />
  </div>
</template>

<script lang="ts">
import { Location } from '@/serializer/Location'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ActivityDetail',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    nature: {
      type: String,
      default: '',
    },
    groupAmount: {
      type: Number,
      default: 0,
    },
    location: {
      type: Object as PropType<Location>,
      default: Object as PropType<Location>,
    },
  },
})
</script>
