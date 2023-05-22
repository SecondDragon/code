import React, { PureComponent } from 'react'
import ThemeContext from '../context/theme_context'
import withTheme from '../hoc/with_theme'

// export class Product extends PureComponent {
//   render() {
//     return (
//       <div>
//         Product:
//         <ThemeContext.Consumer>
//           {
//             value => {
//               return <h2>theme:{value.color}-{value.size}</h2>
//             }
//           }
//         </ThemeContext.Consumer>
//       </div>
//     )
//   }
// }

// export default Product

export class Product extends PureComponent {
  render() {
    const { color, size } = this.props

    return (
      <div>
        <h2>Product: {color}-{size}</h2>
      </div>
    )
  }
}

export default withTheme(Product)
