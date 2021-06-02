<template>
  <div class="inline-block">
    <div class="flex gap-5">
      <div class="cursor-pointer hover:text-lightGreen" @click="previousPage()"><p>Previous</p></div>
      <div class="cursor-pointer hover:text-lightGreen" @click="nextPage()"><p>Next</p></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Params } from '@/serializer/Params'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {
    params: {
      type: Object as PropType<Params>,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
