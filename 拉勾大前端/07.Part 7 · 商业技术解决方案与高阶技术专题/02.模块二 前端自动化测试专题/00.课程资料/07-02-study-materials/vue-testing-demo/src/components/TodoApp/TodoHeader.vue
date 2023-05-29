<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      data-testid="new-todo"
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>

<script>
export default {
  name: 'TodoHeader',
  methods: {
    handleNewTodo (e) {
      const value = e.target.value.trim()
      if (!value.length) {
        return
      }
      this.$emit('new-todo', value)
      e.target.value = ''
    }
  }
}
</script>
