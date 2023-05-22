export default function directiveUnit(app) {
  app.directive("unit", {
    mounted(el, bindings) {
      const defaultText = el.textContent
      let unit = bindings.value
      if (!unit) {
        unit = "¥"
      }
      el.textContent = unit + defaultText
    }
  })
}