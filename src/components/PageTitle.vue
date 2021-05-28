<template>
  <h1 class="pt-5 text-6xl font-extrabold">{{ $route.meta.title }}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle',
})
</script>
