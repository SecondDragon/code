import { Wrapper } from '@vue/test-utils'

Wrapper.prototype.findById = function (id) {
  return this.find(`[data-testid="${id}"]`)
}

Wrapper.prototype.findAllById = function (id) {
  return this.findAll(`[data-testid="${id}"]`)
}
