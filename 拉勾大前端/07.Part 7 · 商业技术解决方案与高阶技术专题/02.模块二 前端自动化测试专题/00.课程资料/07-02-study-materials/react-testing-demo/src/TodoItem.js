import React, { useState, useRef } from 'react'
import classNames from 'classnames'

export default function TodoItem ({ todo, doneTodo, removeTodo, saveTodo }) {
  const [isEdit, setIsEdit] = useState(false)
  const inputEl = useRef(null)

  const saveEdit = e => {
    const value = e.target.value.trim()
    if (value.length) {
      saveTodo(todo.id, e.target.value)
    } else {
      removeTodo(todo.id)
    }
    setIsEdit(false)
  }

  const cancelEdit = e => {
    setIsEdit(false)
    e.target.value = todo.text
  }

  return (
    <li className={classNames({
      completed: todo.done,
      editing: isEdit
    })} data-testid="todo-item">
      {/* These are here just to show the structure of the list items */}
      {/* List items should get the class `editing` when editing and `completed` when marked as completed */}
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          data-testid="todo-done"
          onChange={e => doneTodo(todo.id, e.target.checked)}
        />
        <label
          data-testid="todo-text"
          onDoubleClick={() => {
            setIsEdit(true)
            setTimeout(() => {
              inputEl.current.focus()
            }, 0)
          }}
        >{todo.text}</label>
        <button
          className="destroy"
          data-testid="destroy"
          onClick={() => removeTodo(todo.id)}
        ></button>
      </div>
      <input
        ref={inputEl}
        className="edit"
        autoFocus
        defaultValue={todo.text}
        onBlur={saveEdit}
        data-testid="todo-edit"
        onKeyUp={e => {
          if (e.key === 'Enter') { // 保存编辑
            saveEdit(e)
          } else if (e.key === 'Escape') { // 取消编辑
            cancelEdit(e)
          }
        }}
      />
    </li>
  )
}
