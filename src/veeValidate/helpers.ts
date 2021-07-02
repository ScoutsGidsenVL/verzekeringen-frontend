import { ComputedRef, Ref, ref, watch } from 'vue'

export const scrollToFirstError = (validation: any, container: string) => {
  if (validation.valid) {
    return
  }

  let el = null
  const { errors } = validation
  console.log('ERRORS: ', errors)

  if (errors) {
    const [first] = Object.keys(errors)
    // console.log('FIRST: ', first)
    // console.log('CONTAINER: ', container)

    if (first) {
      if (!el) {
        el = document.querySelector('#' + container + ' input[name="' + first + '"]')
      }
      if (!el) {
        el = document.querySelector('#' + container + ' span[name="' + first + '"]')
      }
      if (!el) {
        el = document.querySelector('#' + container + ' #' + first)
      }
    }
  }

  if (el) {
    el = el.parentElement
    if (el) {
      // console.log('EL: ', el)
      el.scrollIntoView()
    }
  }
}

export const useScrollToTop = (): {
  formDiv: Ref<HTMLDivElement | undefined>
  scrollToTop: () => void
  scrollToTopOfPage: () => void
} => {
  const formDiv = ref<HTMLDivElement | undefined>(undefined)

  const scrollToTop = () => {
    if (formDiv.value) {
      formDiv.value.scrollTop = 0
    }
  }

  const scrollToTopOfPage = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return {
    formDiv,
    scrollToTop,
    scrollToTopOfPage,
  }
}

export type formMeta<T> = ComputedRef<{
  dirty: boolean
  touched: boolean
  valid: boolean
  pending: boolean
  initialValues: T
}>

export const useFormSendWithSuccess = <T>(
  meta: formMeta<T>
): {
  formSendWithSuccess: Ref<boolean>
} => {
  const formSendWithSuccess = ref<boolean>(false)

  if (meta) {
    watch(meta, (value: { dirty: boolean }) => {
      if (value.dirty) {
        formSendWithSuccess.value = false
      }
    })
  }

  return {
    formSendWithSuccess,
  }
}
