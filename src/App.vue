<template>
  <div id="app" class="pb-10">
    <base-page>
      <router-view />
    </base-page>
  </div>
</template>

<script lang="ts">
import basePage from './components/semantic/BasePage.vue'
import { defineRules } from '@/veeValidate/rules'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    'base-page': basePage,
  },
  setup() {
    const store = useStore()
    defineRules(store)
  },
})
</script>

<style scoped>
@media (min-width: 992px) {
  #app {
    padding-left: 4rem;
  }
}
</style>
