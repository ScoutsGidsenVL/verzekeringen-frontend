<template>
  <div>
    <strong v-if="!hideInput && label">
      <label>
        {{ label }}
        <required :rules="rules" />
      </label>
    </strong>
    <div v-if="extraInfo" style="font-size: 13px">
      <label  v-html= "extraInfo"></label>
    </div>
    <div>
      <slot />
    </div>
    <div
      :class="{
        'text-lightGray animate-pulse2 bg-lightGray': loadingSubmit || isSubmitting,
      }"
    >
      <input
        v-if="type !== InputTypes.TEXT_AREA && !hideInput && type !== InputTypes.TIME"
        v-model="inputValue"
        class="bg-lightGray p-2 min-w-0 w-100"
        :min="min"
        :max="max"
        :type="type"
        :step="step"
        :maxlength="maxlength"
        :name="name"
        :class="{ 'opacity-0': loadingSubmit || isSubmitting }"
        :disabled="disabled || loadingSubmit || isSubmitting"
        :placeholder="placeholder"
        :oninvalid="onInvalid"
        oninput="this.setCustomValidity('')"
      />

      <input
        v-if="type === InputTypes.TIME"
        :id="name"
        v-model="inputValue"
        class="bg-lightGray p-2 min-w-0 w-100"
        style="max-width: 100px"
        type="time"
        :name="name"
        :class="{ 'opacity-0': loadingSubmit || isSubmitting }"
        :disabled="disabled || loadingSubmit || isSubmitting"
        :step="step"
      />
    </div>
    <textarea
      v-if="type === InputTypes.TEXT_AREA && !hideInput && type !== InputTypes.TIME"
      v-model="inputValue"
      class="bg-lightGray p-2"
      :class="'md:' + textAreaWidth + ' ' + 'xs:w-full'"
      :type="'text'"
      :name="name"
      maxlength="500"
      :disabled="disabled || loadingSubmit || isSubmitting"
    />
    <span :name="name">
      <ErrorMessage :name="name" class="text-red text-sm block mt-1 w-80" />
    </span>
  </div>
</template>

<script lang="ts">
import { ErrorMessage, useField } from 'vee-validate'
import { InputTypes } from '@/enums/inputTypes'
import { computed, defineComponent, watch } from 'vue'
import Required from '@/components/semantic/Required.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CustomInput',
  components: {
    ErrorMessage,
    Required,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      required: false,
      default: '',
    },
    max: {
      type: String,
      required: false,
      default: '',
    },
    maxlength: {
      type: String,
      required: false,
      default: '1000',
    },
    extraInfo: {
      type: String,
      required: false,
    },
    hideInput: {
      type: Boolean,
      default: false,
      required: false,
    },
    loadingSubmit: {
      type: Boolean,
      default: false,
      required: false,
    },
    onInvalid: {
      type: String,
      default: '',
      required: false,
    },
    textAreaWidth: {
      type: String,
      required: false,
      default: 'w-96 h-32',
    },
    placeholder: {
      type: String,
      required: false,
    },
    step: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const { value: inputValue } = useField(props.name, props.rules, {
      initialValue: props.value,
    })

    const store = useStore()

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    const cardNumberSpace = () => {
      if (props.name === 'victim.bankAccount') {
        inputValue.value = inputValue.value
          .replace(/[^\dA-Z]/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim()
      }
    }

    watch(
      () => inputValue.value,
      () => {
        cardNumberSpace()
      }
    )

    return {
      InputTypes,
      inputValue,
      isSubmitting,
    }
  },
})
</script>
