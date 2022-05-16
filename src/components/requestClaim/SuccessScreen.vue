<template>
  <p class="py-4" style="font-size: 30px">Je aangifte is verstuurd.</p>

  <div>
    <p>
      Een bevestiging van je aangifte vind je in je mailbox.
    </p>
    <p>
      De aangifte is verstuurd naar Ethias, met het slachtoffer in cc. Na deze aangifte neemt Ethias contact op met (de ouders van) het slachtoffer. Alle verdere communicatie verloopt rechtstreeks tussen hen.
    </p>
  </div>

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
