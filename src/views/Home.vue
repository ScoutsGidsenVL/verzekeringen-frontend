<template>
  <div class="pt-10 pb-20 px-10 bg-lightGray">
    <custom-button text="Vraag nieuwe verzekering aan" />
  </div>
  <div>
    <custom-list title="Nog te voltooien" />
  </div>
  <div>
    <custom-list title="Recent aangevraagd" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import customButton from '../components/CustomButton.vue'
import customList from '../components/semantic/CustomList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-button': customButton,
    'custom-list': customList,
  },
  setup: () => {
    return {}
  },
})
</script>
