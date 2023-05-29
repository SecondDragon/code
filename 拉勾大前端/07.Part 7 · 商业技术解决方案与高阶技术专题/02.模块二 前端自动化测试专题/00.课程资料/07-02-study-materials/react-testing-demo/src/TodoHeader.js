export default function TodoHeader () {
  return (
    <header className="header">
      <h1 title="todos">todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus data-testid="new-todo" />
    </header>
  )
}
