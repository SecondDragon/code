<template>
  <li data-testid="todo-item" :class="{
    completed: todo.done,
    editing: isEditing
  }">
    <div class="view">
      <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <label
        data-testid="todo-text"
        @dblclick="isEditing = true"
      >{{ todo.text }}</label>
      <button
        data-testid="delete"
        class="destroy"
        @click="$emit('delete-todo', todo.id)"
      ></button>
    </div>
    <input
      :value="todo.text"
      v-focus="isEditing"
      class="edit"
      data-testid="todo-edit"
      @blur="isEditing = false"
      @keyup.enter="handleEditTodo"
      @keyup.esc="handleCancelEdit"
    />
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  directives: {
    focus (element, binding) {
      if (binding.value) {
        element.focus()
      }
    }
  },
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    handleEditTodo (e) {
      this.$emit('edit-todo', {
        id: this.todo.id,
        text: e.target.value
      })
      // 取消编辑状态
      this.isEditing = false
    },

    handleCancelEdit () {
      this.isEditing = false
    }
  }
}
</script>
