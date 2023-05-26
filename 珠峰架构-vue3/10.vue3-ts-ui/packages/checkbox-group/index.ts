import { App } from 'vue';
import CheckboxGroup from '../checkbox/src/checkbox-group.vue'
CheckboxGroup.install = (app: App): void => {
    app.component(CheckboxGroup.name, CheckboxGroup); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _CheckboxGroup: IWithInstall<typeof CheckboxGroup> = CheckboxGroup;
export default _CheckboxGroup;
