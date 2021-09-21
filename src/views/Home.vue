<template>
  <div class="container">
    <h1 class="ml-0 w-full h1">Welkom {{ user.firstName }}</h1>
    <div class="flex gap-5">
      <router-link :to="'/home/verzekeringen'">
        <custom-button text="Verzekeringen" />
      </router-link>

      <router-link :to="'/home/schadeaangiftes'">
        <custom-button text="Schadeaangiftes" />
      </router-link>
    </div>

    <!-- <HelloWorld /> -->
  </div>
</template>

<script lang="ts">
import store from '@/store/store'
import { defineComponent, ref } from 'vue'
import CustomButton from '@/components/CustomButton.vue'
// import { HelloWorld } from 'vue-3-component-library'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-button': CustomButton,
    // HelloWorld,
  },
  setup() {
    const user = ref<any>(store.getters.user)

    return {
      user,
    }
  },
})
</script>
