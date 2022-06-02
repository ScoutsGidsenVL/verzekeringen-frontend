<template>
  <div class="py-2">
    <choice-help-item id="0" v-model:choice="choices[0]" text="Heb je de auto gehuurd?" />
  </div>

  <div v-if="choices[0] === true" class="py-2">
    <choice-help-item id="1" v-model:choice="choices[1]" text="Is er een vrijstelling (franchise) op de wettelijk verplichte verzekering voor burgerlijke aansprakelijkheid (BA)?" />
  </div>

  <div v-if="choices[1] === true" class="py-2">
    <choice-help-item id="2" v-model:choice="choices[2]" text="Wil je de vrijstelling van de verzekering voor burgerlijke aansprakelijkheid afkopen?" />
  </div>

  <div v-if="choices[2] === true || choices[0] === false || (choices[0] === true && choices[1] === false) || (choices[0] === true && choices[1] === true && choices[2] === false)" class="py-2">
    <choice-help-item id="3" v-model:choice="choices[3]" text="Is de auto omnium verzekerd?" />
  </div>

  <div v-if="choices[3] === true" class="py-2">
    <choice-help-item id="4" v-model:choice="choices[4]" text="Wil je de vrijstelling (franchise) van deze verzekering afkopen?" />
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
    <choice-help-item id="5" v-model:choice="choices[5]" text="Wil je een omnium verzekering afsluiten?" />
  </div>

  <div v-if="displayText() !== ''" class="mt-2">
    <info-alert>
      <p v-html="displayText()"></p>
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
    const text = ref<string>('')

    const singleChoiceText = 'Aan de hand van voorgaande vragen is de volgende optie het best geschikt voor je aanvraag: '
    const multipleChoicesText = 'Aan de hand van voorgaande vragen zijn de volgende opties het best geschikt voor je aanvraag: '
    const noChoiceText = 'Aan de hand van voorgaande vragen is gebleken dat je <strong>geen</strong> extra verzekering nodig hebt.'

    const displayText = () => {
      // NEE NEE NEE
      if (choices.value[0] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = noChoiceText
      }

      // NEE NEE JA
      if (choices.value[0] === false && choices.value[3] === false && choices.value[5] === true) {
        text.value = singleChoiceText + '<strong>optie 1</strong>'
      }

      // NEE JA NEE
      if (choices.value[0] === false && choices.value[3] === true && choices.value[4] === false) {
        text.value = noChoiceText
      }

      // NEE JA JA
      if (choices.value[0] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = singleChoiceText + '<strong>optie 2</strong>'
      }

      // JA NEE NEE NEE
      if (choices.value[0] === true && choices.value[1] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = noChoiceText
      }

      // JA NEE JA JA
      if (choices.value[0] === true && choices.value[1] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = singleChoiceText + '<strong>optie 2</strong>'
      }

      // JA NEE JA NEE
      if (choices.value[0] === true && choices.value[1] === false && choices.value[3] === true && choices.value[4] === false) {
        text.value = noChoiceText
      }

      // JA JA NEE NEE NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === false && choices.value[5] === false) {
        text.value = noChoiceText
      }

      // JA JA NEE NEE JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === false && choices.value[5] === true) {
        text.value = singleChoiceText + '<strong>optie 1</strong>'
      }

      // JA JA NEE JA JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === true && choices.value[4] === true) {
        text.value = singleChoiceText + '<strong>optie 2</strong>'
      }

      // JA JA NEE JA NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === false && choices.value[3] === true && choices.value[4] === false) {
        text.value = noChoiceText
      }

      // JA JA JA NEE NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === false && choices.value[5] === false) {
        text.value = singleChoiceText + '<strong>optie 3</strong>' // this one
      }

      // JA JA JA NEE JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === false && choices.value[5] === true) {
        text.value = multipleChoicesText + '<strong>optie 1 & optie 3</strong>'
      }

      // JA JA JA JA NEE
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === true && choices.value[4] === false) {
        text.value = singleChoiceText + '<strong>optie 3</strong>'
      }

      // JA JA JA JA JA
      if (choices.value[0] === true && choices.value[1] === true && choices.value[2] === true && choices.value[3] === true && choices.value[4] === true) {
        text.value = multipleChoicesText + '<strong>optie 2 & optie 3</strong>'
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
