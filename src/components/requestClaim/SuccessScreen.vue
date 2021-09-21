<template>
  <p class="py-4" style="font-size: 30px"><strong class="font-semibold">schadeaangifte</strong> is succesvol aangevraagd!</p>
  <div class="mt-4 inline-block">
    <navigation-arrow to="/home/schadeaangiftes" text="Terug naar overzicht" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'

export default defineComponent({
  name: 'RemarksDetail',
  components: {
    'navigation-arrow': NavigationArrow,
  },
  props: {},
})
</script>
