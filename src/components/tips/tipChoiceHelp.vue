<template>
  <div class="py-2">
    <choice-help-item id="0" text="Heb je de auto gehuurd?" v-model:choice="choices[0]" />
  </div>

  <div v-if="choices[0] === true" class="py-2">
    <choice-help-item id="1" text="Is er een vrijstelling (franchise) op de wettelijk verplichte verzekering voor burgerlijke aansprakelijkheid (BA)?" v-model:choice="choices[1]" />
  </div>

  <div v-if="choices[1] === true" class="py-2">
    <choice-help-item id="2" text="Wil je de vrijstelling van de verzekering voor burgerlijke aansprakelijkheid afkopen?" v-model:choice="choices[2]" />
  </div>

  <div v-if="choices[2] === true || choices[0] === false || (choices[0] === true && choices[1] === false) || (choices[0] === true && choices[1] === true && choices[2] === false)" class="py-2">
    <choice-help-item id="3" text="Is de auto omnium verzekerd?" v-model:choice="choices[3]" />
  </div>

  <div v-if="choices[3] === true" class="py-2">
    <choice-help-item id="4" text="Wil je de vrijstelling (franchise) van deze verzekering afkopen?" v-model:choice="choices[4]" />
  </div>

  <div
    v-if="
      (choices[0] === false && choices[3] === false) ||
      (choices[0] === true && choices[1] === false && choices[3] === false) ||
      (choices[0] === true && choices[1] === true && choices[2] === false && choices[3] === false) ||
      (choices[0] === true && choices[1] === true && choices[2] === true && choices[3] === false)
    "
    class="py-2"
  >
    <choice-help-item id="5" text="Wil je een omnium verzekering afsluiten?" v-model:choice="choices[5]" />
  </div>

  <div class="mt-2">
    <info-alert>
      <p v-html="displayText()"></p>
      <div class="mt-3">
        <strong>
          <a target="_blank" href="https://www.scoutsengidsenvlaanderen.be/leiding/ondersteuning/groepsleiding/verzekeringen/autoverzekering">Meer info --></a>
        </strong>
      </div>
    </info-alert>
  </div>
</template>

<script lang="ts">
import InfoAlert from '@/components/requestInsurance/InfoAlert.vue'
import ChoiceHelpItem from '@/components/semantic/ChoiceHelpItem.vue'

import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'TipChoiceHelp',
  components: {
    'info-alert': InfoAlert,
    'choice-help-item': ChoiceHelpItem,
  },
  setup() {
    const choices = ref<Array<boolean | string>>(['', '', '', '', '', ''])
    const text = ref<string>()
    const displayText = () => {
      // NEE NEE NEE
      if (choices.value[0] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'
      }

      // NEE NEE JA
      if (choices.value[0] === false && choices.value[3] === false && choices.value[5] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 1</strong>'
      }

      // NEE JA NEE
      if (choices.value[0] === false && choices.value[3] === true && choices.value[4] === false) {
        text.value = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'
      }

      // NEE JA JA
      if (choices.value[0] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 2</strong>'
      }

      // JA NEE NEE NEE
      if (choices.value[0] === true && choices.value[1] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'
      }

      // JA NEE JA JA
      if (choices.value[0] === true && choices.value[1] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 2</strong>'
      }

      // JA JA NEE NEE NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'
      }

      // JA JA NEE NEE JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === false && choices.value[5] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 1</strong>'
      }

      // JA JA NEE JA JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 2</strong>'
      }

      // JA JA NEE JA NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === true && choices.value[4] === false) {
        text.value = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'
      }

      // JA JA JA NEE NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === false && choices.value[5] === false) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 3</strong>' // this one
      }

      // JA JA JA NEE JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === false && choices.value[5] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 3</strong> & <strong>optie 1</strong>'
      }

      // JA JA JA JA NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === true && choices.value[4] === false) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 3</strong>'
      }

      // JA JA JA JA JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === true && choices.value[4] === true) {
        text.value = 'Aan de hand van voorgaande vragen zijn volgende optie(s) het best geschikt voor uw aanvraag: <strong>optie 2 & optie 3</strong>'
      }

      return text.value
    }

    const observeAndResetValues = (arrIndex: number) => {
      watch(
        () => choices.value[arrIndex],
        () => {
          for (let index = arrIndex + 1; index < choices.value.length; index++) {
            choices.value[index] = 'empty'
          }
        }
      )
    }

    observeAndResetValues(0)
    observeAndResetValues(1)
    observeAndResetValues(2)
    observeAndResetValues(3)
    observeAndResetValues(4)

    return {
      choices,
      displayText,
    }
  },
})
</script>
