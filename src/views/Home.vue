<template>
  <div class="pt-10 pb-20 px-10 bg-lightGray">
    <router-link to="/aanvraag">
      <custom-button text="Vraag nieuwe verzekering aan" />
    </router-link>
  </div>
  <div class="mt-5">
    <custom-list title="Nog te voltooien" />
  </div>
  <div class="mt-5">
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
