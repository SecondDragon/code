<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo"/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input
        v-model="toggleAll"
        data-testid="toggle-all"
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="handleDelteTodo"
          @edit-todo="handleEditTodo"
        />
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter
      :todos="todos"
      @clear-completed="handleClearCompleted"
    />
  </section>
</template>

<script>
import TodoHeader from './TodoHeader'
import TodoFooter from './TodoFooter'
import TodoItem from './TodoItem'

export default {
  name: 'TodoApp',
  components: {
    TodoHeader,
    TodoFooter,
    TodoItem
  },
  data () {
    return {
      todos: []
    }
  },
  computed: {
    toggleAll: {
      get () {
        // 设置 toggleALl 的选中状态
        return this.todos.length && this.todos.every(t => t.done)
      },
      set (checked) {
        this.todos.forEach(todo => {
          todo.done = checked
        })
      }
    },

    // 过滤数据
    filterTodos () {
      // 获取路由路径
      const path = this.$route.path
      // 根据路由路径过滤数据
      // / 所有的任务列表
      // /active 所有的未完成任务
      // /completed 所有的已完成任务
      let todos = this.todos
      switch (path) {
        case '/active':
          todos = this.todos.filter(t => !t.done)
          break
        case '/completed':
          todos = this.todos.filter(t => t.done)
          break
      }
      return todos
    }
  },
  methods: {
    handleNewTodo (text) {
      const lastTodo = this.todos[this.todos.length - 1]
      this.todos.push({
        id: lastTodo ? lastTodo.id + 1 : 1,
        text,
        done: false
      })
    },
    handleDelteTodo (todoId) {
      const index = this.todos.findIndex(t => t.id === todoId)
      if (index !== -1) {
        this.todos.splice(index, 1)
      }
    },
    handleEditTodo ({ id, text }) {
      const todo = this.todos.find(t => t.id === id)
      if (!todo) {
        return
      }
      if (!text.trim().length) {
        // 执行删除操作
        return this.handleDelteTodo(id)
      }
      // 执行修改操作
      todo.text = text
    },

    handleClearCompleted () {
      // 清除所有已完成的任务项
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].done) {
          // 执行删除操作
          this.todos.splice(i, 1)
          i--
        }
      }
    }
  }
}
</script>
