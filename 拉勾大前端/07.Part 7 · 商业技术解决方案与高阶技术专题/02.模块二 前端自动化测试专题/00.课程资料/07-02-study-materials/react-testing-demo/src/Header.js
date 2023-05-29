import React from 'react'

export default function TodoHeader (props) {
  const handleNewTodo = (e) => {
    if (e.keyCode !== 13) {
      return
    }
    const value = e.target.value.trim()
    if (!value.length) {
      return
    }
    props.handleNewTodo(value)
    e.target.value = ''
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        data-testid="new-todo"
        onKeyUp={handleNewTodo}
      />
    </header>
  )
}
