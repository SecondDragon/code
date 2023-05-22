import ThemeContext from "./context/theme-context"

function HomeBanner() {

  return <div>
    {/* 函数式组件中使用Context共享的数据 */}
    <ThemeContext.Consumer>
      {
        value => {
          return <h2> Banner theme:{value.color}</h2>
        }
      }
    </ThemeContext.Consumer>
  </div>
}

export default HomeBanner
