<template>
  <p class="font-semibold">Opmerkingen</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RemarksDetail',
  components: {},
  props: {
    remarks: {
      type: String,
    },
  },
})
</script>
