import { createLocalVue, mount } from '@vue/test-utils'
import TodoFooter from '@/components/TodoApp/TodoFooter.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'selected'
})

describe('TodoFooter.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
  })

  test('Done Todos Count', async () => {
    const count = wrapper.vm.todos.filter(t => !t.done).length
    const countEl = wrapper.find('[data-testid="done-todos-count"]')
    expect(Number.parseInt(countEl.text())).toBe(count)
  })

  test('Clear Completed Show', async () => {
    const button = wrapper.find('[data-testid="clear-completed"]')
    expect(button.exists()).toBeTruthy()

    // 清除所有任务的完成状态，判断 button 不存在
    wrapper = mount(TodoFooter, {
      propsData: {
        todos: [
          { id: 1, text: 'eat', done: false },
          { id: 2, text: 'play', done: false },
          { id: 3, text: 'sleep', done: false }
        ]
      },
      localVue,
      router
    })
    expect(wrapper.find('[data-testid="clear-completed"]').exists()).toBeFalsy()
  })

  test('Clear Completed', async () => {
    const button = wrapper.find('[data-testid="clear-completed"]')
    await button.trigger('click')
    expect(wrapper.emitted()['clear-completed']).toBeTruthy()
  })

  test('Router Link ActiveClass', async () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    router.push('/active')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/active') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/completed')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/completed') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
