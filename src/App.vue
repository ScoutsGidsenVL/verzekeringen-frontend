<template>
  <div id="app" class="flex justify-center">
    <main class="py-4 w-7/12">
      <base-page>
        <router-view />
      </base-page>
    </main>
  </div>
</template>

<script lang="ts">
import basePage from './components/semantic/BasePage.vue'
import { defineRules } from '@/veeValidate/rules'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': basePage,
  },
  setup() {
    defineRules()
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
