<template>
  <div id="app" class="flex justify-center">
    <main class="py-4 w-6/12">
      <base-page>
        <router-view />
      </base-page>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import basePage from './components/semantic/BasePage.vue'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': basePage,
  },
})
</script>

<style lang="scss">
@import './css/scouts1.css';
@import './css/scouts2.css';
@import './css/scouts3.css';
@import './css/scouts4.css';
@import './css/scouts5.css';
</style>
