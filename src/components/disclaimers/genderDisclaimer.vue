<template>
  <div>
    <div class="custom-tooltip cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lightGreen" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
      <span class="custom-tooltiptext text-sm">
        Ethias beperkt technisch voorlopig de keuze tot 'M' of 'V'; Scouts en Gidsen Vlaanderen gaat hierover met hen in dialoog om een oplossing te vinden zodat we genderneutraal binnen scouting
        kunnen communiceren.
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GenderDisclaimer',
})
</script>

<style scoped>
.custom-tooltip {
  position: relative;
  display: inline-block;
}

.custom-tooltip .custom-tooltiptext {
  visibility: hidden;
  width: 270px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.custom-tooltip:hover .custom-tooltiptext {
  visibility: visible;
}
.custom-tooltip .custom-tooltiptext {
  top: -5px;
  left: 105%;
}
</style>
