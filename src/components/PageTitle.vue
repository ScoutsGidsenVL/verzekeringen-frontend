<template>
  <h1>{{ $route.meta.title }}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle',
})
</script>
