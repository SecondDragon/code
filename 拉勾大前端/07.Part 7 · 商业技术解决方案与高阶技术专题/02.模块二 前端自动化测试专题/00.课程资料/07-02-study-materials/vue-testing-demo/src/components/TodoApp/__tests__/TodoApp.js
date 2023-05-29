import { shallowMount } from '@vue/test-utils'
import TodoApp from '@/components/TodoApp/index.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'
import Vue from 'vue'

describe('TodoApp.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    const $route = {
      path: '/'
    }
    wrapper = shallowMount(TodoApp, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    await wrapper.setData({
      todos
    })
  })

  test('New todo', async () => {
    const text = 'play'
    wrapper.vm.handleNewTodo(text)
    const todo = wrapper.vm.todos.find(t => t.text === text)
    expect(todo).toBeTruthy()
  })

  test('Todo List', async () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(wrapper.vm.todos.length)
  })

  test('Delete Todo', async () => {
    await wrapper.vm.handleDelteTodo(1)
    expect(wrapper.vm.todos.length).toBe(2)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2)
  })

  test('Delete Todo', async () => {
    await wrapper.vm.handleDelteTodo(123)
    expect(wrapper.vm.todos.length).toBe(3)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(3)
  })

  test('Edit Todo', async () => {
    const todo = { id: 2, text: 'abc' }
    await wrapper.vm.handleEditTodo(todo)
    expect(wrapper.vm.todos[1].text).toBe(todo.text)

    todo.text = ''
    await wrapper.vm.handleEditTodo(todo)
    expect(wrapper.vm.todos.find(t => t.id === todo.id)).toBeFalsy()
  })

  test('Toggle All', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    await toggleAll.setChecked()
    // 断言所有的子任务都被选中了
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeTruthy()
    })

    // 取消完成状态
    await toggleAll.setChecked(false)
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeFalsy()
    })
  })

  test('Toggle All State', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    // 让所有任务都变成完成状态
    wrapper.vm.todos.forEach(todo => {
      todo.done = true
    })
    await Vue.nextTick()
    // 断言 toggleAll 也选中了
    expect(toggleAll.element.checked).toBeTruthy()

    // 取消某个任务未完成，断言 toggleAll 未完成
    wrapper.vm.todos[0].done = false
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeFalsy()
  })

  test('Clear All Completed', async () => {
    wrapper.vm.handleClearCompleted()
    await Vue.nextTick()
    expect(wrapper.vm.todos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])
  })

  test('Filter Todos', async () => {
    // 将路由导航到 /，断言 filterTodos = 完成的任务列表
    wrapper.vm.$route.path = '/'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /active
    // 断言 filterTodos = 所有未完成任务
    wrapper.vm.$route.path = '/active'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /completed
    // 断言 filterTodos = 所有已完成任务
    wrapper.vm.$route.path = '/completed'
    await Vue.nextTick()
    expect(wrapper.vm.filterTodos).toEqual([
      { id: 2, text: 'play', done: true }
    ])
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
