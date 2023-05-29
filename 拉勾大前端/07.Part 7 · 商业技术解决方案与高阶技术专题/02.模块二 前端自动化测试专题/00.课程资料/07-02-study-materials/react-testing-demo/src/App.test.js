import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

describe('添加任务', () => {
  test('输入内容敲回车应该被添加到任务列表中并且输入框被清空', () => {
    render(
      <Router>
        <App />
      </Router>
    )

    // 找到输入框
    const input = screen.getByTestId('new-todo')
    // 输入内容，敲回车
    userEvent.type(input, 'Hello World{enter}')
    // 断言：
    //   - 列表中有添加的内容
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    //   - 输入框内容被清空了
    expect(input.value).toBe('')
  })
})

describe('删除任务', () => {
  test('点击删除按钮，任务项应该被移除', () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    // 找到删除按钮
    const button = screen.getByTestId('destroy')
    // 点击删除按钮
    userEvent.click(button)
    // 断言：
    //   页面中没有删除的任务项了
    expect(screen.queryByText('eat')).toBeNull()
  })
})

describe('切换单个任务完成状态', () => {
  test('切换任务完成状态按钮，任务的完成样式也跟随改变', async () => {
    const todos = [ { id: 1, text: 'eat', done: false } ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const todoDone = screen.getByTestId('todo-done')
    const todoItem = screen.getByTestId('todo-item')

    expect(todoDone.checked).toBeFalsy()
    expect(todoItem).not.toHaveClass('completed')
    // expect(todoItem.classList.contains('completed')).toBeFalsy()

    userEvent.click(todoDone)
    expect(todoDone.checked).toBeTruthy()
    expect(todoItem).toHaveClass('completed')
  })
})

describe('切换所有任务的完成状态', () => {
  test('点击切换所有按钮，所有的任务应该随之改变', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: true },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const toggleAll = screen.getByTestId('toggle-all')
    const todoDones = screen.getAllByTestId('todo-done')

    // 全选验证
    userEvent.click(toggleAll)
    todoDones.forEach(item => {
      expect(item.checked).toBeTruthy()
    })

    // 反选验证
    userEvent.click(toggleAll)
    todoDones.forEach(item => {
      expect(item.checked).toBeFalsy()
    })
  })

  test('当所有任务已完成的时候，全选按钮应该被选中，否则不选中', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: true },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    const toggleAll = screen.getByTestId('toggle-all')
    const todoDones = screen.getAllByTestId('todo-done')

    expect(toggleAll.checked).toBeTruthy()

    userEvent.click(todoDones[0])

    expect(toggleAll.checked).toBeFalsy()
  })
})

describe('编辑任务', () => {
  test('双击任务项文本，应该获得编辑状态', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')
    userEvent.dblClick(todoText)
    expect(todoItem).toHaveClass('editing')

    fireEvent.blur(todoEdit)
    expect(todoItem).not.toHaveClass('editing')
  })

  test('修改任务项文本敲回车之后，应该保存修改以及取消编辑状态', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')
    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, 'hello world{enter}')
    expect(screen.getByText('hello world')).toBeInTheDocument()
    expect(todoItem).not.toHaveClass('editing')
  })

  test('清空任务项文本，保存编辑应该删除任务项', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const todoText = screen.getByTestId('todo-text')
    const todoEdit = screen.getByTestId('todo-edit')
    userEvent.dblClick(todoText)
    userEvent.clear(todoEdit)
    userEvent.type(todoEdit, '{enter}')
    expect(screen.queryByTestId('todo-item')).toBeNull()
  })

  test('修改任务项文本按下 ESC 后，应该取消编辑状态以及任务项文本保持不变', async () => {
    const todos = [ { id: 1, text: 'eat', done: true } ]
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const todoText = screen.getByTestId('todo-text')
    const todoItem = screen.getByTestId('todo-item')
    const todoEdit = screen.getByTestId('todo-edit')
    userEvent.dblClick(todoText)
    userEvent.type(todoEdit, 'dsad{esc}')
    expect(screen.queryByText('eat')).not.toBeNull()
    expect(todoItem).not.toHaveClass('editing')
  })
})

describe('删除所有已完成任务', () => {
  test('如果所有任务未完成，清除按钮应该不展示，否则展示', async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: false }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )

    expect(screen.queryByTestId('clear-completed')).toBeNull()

    userEvent.click(screen.getAllByTestId('todo-done')[0])
    expect(screen.queryByTestId('clear-completed')).not.toBeNull()
  })

  test('点击清除按钮，应该删除所有已完成任务', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const clearComplted = screen.queryByTestId('clear-completed')
    userEvent.click(clearComplted)
    expect(screen.getAllByTestId('todo-item').length).toBe(1)
    expect(screen.getByText('sleep')).toBeInTheDocument()
  })
})

describe('展示剩余任务的数量', () => {
  test('展示所有剩余未完成任务数量', async () => {
    const todos = [
      { id: 1, text: 'eat', done: true },
      { id: 2, text: 'sleep', done: false },
      { id: 3, text: 'play', done: true }
    ]

    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    expect(screen.getByTestId('remaining').textContent).toBe('1')

    userEvent.click(screen.getAllByTestId('todo-done')[0])
    expect(screen.getByTestId('remaining').textContent).toBe('2')
  })
})

describe('数据筛选', () => {
  const todos = [
    { id: 1, text: 'play', done: true },
    { id: 2, text: 'eat', done: false },
    { id: 3, text: 'sleep', done: true }
  ]

  const filterTodos = {
    all: () => todos,
    active: () => todos.filter(t => !t.done),
    completed: () => todos.filter(t => t.done)
  }

  test('点击 all 链接，应该展示所有任务，并且 all 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-all')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item').length).toBe(filterTodos.all().length)
    expect(link).toHaveClass('selected')
  })

  test('点击 active 链接，应该展示所有任务，并且 active 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-active')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item').length).toBe(filterTodos.active().length)
    expect(link).toHaveClass('selected')
  })

  test('点击 completed 链接，应该展示所有任务，并且 completed 链接应该高亮', async () => {
    render(
      <Router>
        <App todos={todos} />
      </Router>
    )
    const link = screen.getByTestId('link-completed')
    userEvent.click(link)
    expect(screen.getAllByTestId('todo-item').length).toBe(filterTodos.completed().length)
    expect(link).toHaveClass('selected')
  })
})
