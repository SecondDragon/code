import { configure } from '@kadira/storybook'

function loadStories() {
  require('../stories/list')
}

configure(loadStories, module)
