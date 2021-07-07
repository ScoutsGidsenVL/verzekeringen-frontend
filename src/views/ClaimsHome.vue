<template>
  <call-to-action link="/aanvraag/schade-aangiftes" text="Vraag nieuwe schade aangifte aan" />
  <div class="container">
    <div>SCHADE AANGIFTES</div>
  </div>
</template>

<script lang="ts">
import CallToAction from '../components/customHeadlines/CallToAction.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClaimsHome',
  components: {
    'call-to-action': CallToAction,
  },
})
</script>
