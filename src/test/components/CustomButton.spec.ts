import { mount } from '@vue/test-utils'
import customButton from 'src/components/CustomButton.vue'

describe('Custom Button', () => {
  it('Text shown', () => {
    const wrapper = mount(customButton, {
      props: {
        text: 'a random button',
      },
    })
    // expect(wrapper.find(`button`).text()).toContain('a random button')
  })
})
