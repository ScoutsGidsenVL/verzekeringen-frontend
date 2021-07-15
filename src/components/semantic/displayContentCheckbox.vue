<template>
  <div class="mb-3">
    <div style="max-width: 700px">
      <div>
        <strong>
          <p>{{ text }}</p>
        </strong>
      </div>
    </div>

    <div class="pb-4 mt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DisplayContentCheckBox',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
