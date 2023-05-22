import directiveFocus from "./focus"
import directiveUnit from "./unit"
import directiveFtime from "./ftime"

// export default function useDirectives(app) {
//   directiveFocus(app)
//   directiveUnit(app)
//   directiveFtime(app)
// }

export default function directives(app) {
  directiveFocus(app)
  directiveUnit(app)
  directiveFtime(app)
}
