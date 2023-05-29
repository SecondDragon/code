<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"
      ><strong data-testid="done-todos-count">{{ doneTodosCount }}</strong> item
      left</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <!-- <a class="selected" href="#/">All</a> -->
        <router-link data-testid="link-all" exact to="/">All</router-link>
      </li>
      <li>
        <!-- <a href="#/active">Active</a> -->
        <router-link data-testid="link-active" to="/active">Active</router-link>
      </li>
      <li>
        <!-- <a href="#/completed">Completed</a> -->
        <router-link data-testid="link-completed" to="/completed">Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      v-if="isClearCompletedShow"
      class="clear-completed"
      data-testid="clear-completed"
      @click="$emit('clear-completed')"
    >Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'TodoFooter',
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    doneTodosCount () {
      return this.todos.filter(t => !t.done).length
    },
    isClearCompletedShow () {
      return this.todos.find(t => t.done)
    }
  }
}
</script>
