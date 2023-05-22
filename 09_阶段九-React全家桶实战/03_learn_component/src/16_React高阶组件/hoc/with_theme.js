import ThemeContext from "../context/theme_context"

function withTheme(OriginComponment) {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          value => {
            return <OriginComponment {...value} {...props}/>
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

export default withTheme
