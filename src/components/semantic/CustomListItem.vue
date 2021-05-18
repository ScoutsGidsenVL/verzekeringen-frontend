<template>
  <div class="flex justify-between py-2 border-t-2 border-black">
    <div>
      <p class="font-semibold">Datum</p>
      <p>{{ item.date }}</p>
    </div>
    <div>
      <p class="font-semibold">Groep</p>
      <p>{{ item.group }}</p>
    </div>
    <div>
      <p class="font-semibold">Type</p>
      <p>{{ item.type }}</p>
    </div>
    <div class="pt-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { insurance } from '../../serializer/insurance'

export default defineComponent({
  name: 'CustomListItem',
  props: {
    item: {
      type: Object as PropType<insurance>,
      required: true,
    },
  },
})
</script>
