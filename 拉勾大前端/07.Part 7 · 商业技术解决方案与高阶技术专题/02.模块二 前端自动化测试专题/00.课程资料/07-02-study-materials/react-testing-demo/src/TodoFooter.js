// import classNames from 'classnames'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

export default function TodoFooter ({ todos, removeAllDone, filterText }) {
  const remainingCount = useMemo(
    () => {
      return todos.filter((t) => !t.done).length
    },
    [ todos ]
  )

  return (
    <footer className="footer">
      {/* This should be `0 items left` by default */}
      <span className="todo-count">
        <strong data-testid="remaining">{remainingCount}</strong> item left
      </span>
      {/* Remove this if you don't implement routing */}
      <ul className="filters">
        <li>
          <NavLink activeClassName="selected" exact to="/" data-testid="link-all">
            All
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/active" data-testid="link-active">
            Active
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/completed" data-testid="link-completed">
            Completed
          </NavLink>
        </li>
      </ul>
      {/* Hidden if no completed items are left ↓ */}
      {todos.some(t => t.done) ? (
        <button className="clear-completed" data-testid="clear-completed" onClick={removeAllDone}>
          Clear completed
        </button>
      ) : null}
    </footer>
  )
}
