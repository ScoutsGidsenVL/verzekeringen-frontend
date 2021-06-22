export const scrollToFirstError = (validation: any, container: string) => {
  if (validation.valid) {
    return
  }

  let el = null
  const { errors } = validation
  if (errors) {
    const [first] = Object.keys(errors)
    if (first) {
      el = document.querySelector('#' + container + ' #' + first)
      if (!el) {
        el = document.querySelector('#' + container + ' input[name="' + first + '"]')
      }
    }
  }

  if (el) {
    el = el.parentElement
    if (el) {
      el.scrollIntoView()
    }
  }
}
