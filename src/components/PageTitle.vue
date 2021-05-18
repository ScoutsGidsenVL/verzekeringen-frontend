<template>
  <h1 class="text-4xl py-5">{{ $route.meta.title }}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle',
})
</script>
