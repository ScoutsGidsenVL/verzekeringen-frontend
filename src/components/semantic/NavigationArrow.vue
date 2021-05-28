<template>
  <div class="inline-block">
    <router-link :to="to">
      <div class="flex text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-1 mr-2" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 15l-5-5 5-5" />
        </svg>
        <p>{{ text }}</p>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationArrow',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
