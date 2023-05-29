import { shallowMount } from '@vue/test-utils'
import TodoHeader from '@/components/TodoApp/TodoHeader.vue'

describe('TodoHeader.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(TodoHeader)
  })
  test('New todo', async () => {
    const input = wrapper.find('input[data-testid="new-todo"]')
    const text = 'play'
    await input.setValue(text)
    await input.trigger('keyup.enter')
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    expect(input.element.value).toBe('')
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
