import { App } from 'vue';
import ButtonGroup from '../button/src/button-group.vue'
ButtonGroup.install = (app:App): void => {
    app.component(ButtonGroup.name,ButtonGroup); // 注册全局组件
}
type IWithInstall<T> = T & { install(app:App): void };
const _ButtonGroup: IWithInstall<typeof ButtonGroup> = ButtonGroup;
export default _ButtonGroup;
