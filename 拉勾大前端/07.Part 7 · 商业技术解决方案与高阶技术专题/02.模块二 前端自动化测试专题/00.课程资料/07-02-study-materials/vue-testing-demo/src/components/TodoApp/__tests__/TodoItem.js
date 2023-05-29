import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoItem.vue', () => {
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null
  beforeEach(() => {
    const todo = {
      id: 1,
      text: 'play',
      done: true
    }
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo
      }
    })
  })
  test('text', () => {
    expect(wrapper.find('[data-testid="todo-text"]').text()).toBe(wrapper.vm.todo.text)
  })

  test('done', async () => {
    const done = wrapper.find('[data-testid="todo-done"]')
    const todoItem = wrapper.find('[data-testid="todo-item"]')
    expect(done.element.checked).toBeTruthy()
    expect(todoItem.classes()).toContain('completed')

    await done.setChecked(false)
    expect(todoItem.classes('completed')).toBeFalsy()
  })

  test('delete todo', async () => {
    const deleteBtn = wrapper.find('button[data-testid="delete"]')
    await deleteBtn.trigger('click')
    expect(wrapper.emitted()['delete-todo']).toBeTruthy()
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id)
  })

  test('edit todo style', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoItem = wrapper.find('li[data-testid="todo-item"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    expect(todoItem.classes()).toContain('editing')

    await todoEdit.trigger('blur')
    expect(todoItem.classes('editing')).toBeFalsy()
  })

  test('save edit todo', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')
    await label.trigger('dblclick')

    // 编辑文本框中的内容展示
    expect(todoEdit.element.value).toBe(wrapper.vm.todo.text)

    // 修改文本框的值
    const text = 'hello'
    await todoEdit.setValue(text)

    // 触发回车保存事件
    await todoEdit.trigger('keyup.enter')

    // 断言数据被修改了
    // expect(wrapper.vm.todo.text).toBe(text)
    expect(wrapper.emitted()['edit-todo']).toBeTruthy()
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({
      id: wrapper.vm.todo.id,
      text
    })

    // 确保取消了编辑状态
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  test('cancel edit todo', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')

    await label.trigger('dblclick')
    const text = wrapper.vm.todo.text
    await todoEdit.setValue('bbb')
    // 触发取消的事件
    await todoEdit.trigger('keyup.esc')

    // 验证字段没有被修改
    expect(wrapper.vm.todo.text).toBe(text)
    // 验证编辑状态被取消
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
