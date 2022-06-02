<template>
  <div class="mb-3">
    <div style="max-width: 700px">
      <div>
        <strong>
          <p>{{ text }}</p>
        </strong>
      </div>
    </div>

    <div class="flex gap-5">
      <div>
        <input id="yes" v-model="isChecked" type="radio" value="yes">
        <label class="ml-1" for="yes">Ja</label>
      </div>

      <div>
        <input id="no" v-model="isChecked" type="radio" value="no">
        <label class="ml-1" for="no">Neen</label>
      </div>
    </div>

    <div v-if="isChecked === 'yes'" class="pb-4 mt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DisplayContentCheckBox',
  props: {
    text: {
      type: String,
      required: true,
    },
    initialState: String
  },
  setup(props) {
    const isChecked = ref<string>(props.initialState ? props.initialState : 'no')
    // TRIGGER EVENT TO NOT SET VALUES IF CHOICE IS NO
    return {
      isChecked
    }
  },
})
</script>
