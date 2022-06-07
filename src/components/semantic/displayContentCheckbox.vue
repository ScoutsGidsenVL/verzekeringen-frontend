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
        <input type="radio" id="yes" value="yes" v-model="isChecked">
        <label class="ml-1" for="yes">Ja</label>
      </div>

      <div>
        <input type="radio" id="no" value="no" v-model="isChecked">
        <label class="ml-1" for="no">Neen</label>
      </div>
    </div>

    <div v-if="isChecked === 'yes'" class="pb-4 mt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'DisplayContentCheckBox',
  props: {
    text: {
      type: String,
      required: true,
    },
    initialState: String
  },
  setup(props, { emit}) {
    const isChecked = ref<string>(props.initialState ? props.initialState : '')

    watch(
      () => isChecked.value,
      () => {
        if (isChecked.value === 'yes') {
          emit('checkChanged', "true")

        } else if (isChecked.value === 'no') {
          emit('checkChanged', "false")

        } else {
          emit('checkChanged', null)
        }
      }
    )
    // TRIGGER EVENT TO NOT SET VALUES IF CHOICE IS NO
    return {
      isChecked
    }
  },
})
</script>
