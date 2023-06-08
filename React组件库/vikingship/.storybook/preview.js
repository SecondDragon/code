import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"
library.add(fas)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      order: ['Welcome', '第四章：Button', '第四章作业：Alert 组件', '第六章：Menu', '第六章作业：Tabs', '第七章：Icon 组件', '第九章：Input', 'AutoComplete 组件', '第九章作业：Select', '第十章：Upload'], 
    },
  },
}