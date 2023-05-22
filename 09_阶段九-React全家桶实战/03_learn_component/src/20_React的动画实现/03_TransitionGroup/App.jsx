import React, { PureComponent } from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import "./style.css"

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      books: [
        { id: 111, name: "你不知道JS", price: 99 },
        { id: 222, name: "JS高级程序设计", price: 88 },
        { id: 333, name: "Vuejs高级设计", price: 77 },
      ]
    }
  }

  addNewBook() {
    const books = [...this.state.books]
    books.push({ id: new Date().getTime(), name: "React高级程序设计", price: 99 })
    this.setState({ books })
  }

  removeBook(index) {
    const books = [...this.state.books]
    books.splice(index, 1)
    this.setState({ books })
  }

  render() {
    const { books } = this.state

    return (
      <div>
        <h2>书籍列表:</h2>
        <TransitionGroup component="ul">
          {
            books.map((item, index) => {
              return (
                <CSSTransition key={item.id} classNames="book" timeout={1000}>
                  <li>
                    <span>{item.name}-{item.price}</span>
                    <button onClick={e => this.removeBook(index)}>删除</button>
                  </li>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addNewBook()}>添加新书籍</button>
      </div>
    )
  }
}

export default App