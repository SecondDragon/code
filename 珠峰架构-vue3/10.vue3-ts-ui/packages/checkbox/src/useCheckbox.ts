import { computed, getCurrentInstance, inject, WritableComputedRef } from "vue";
import { ICheckboxGroupProvide, ICheckboxProps } from "./ckeckbox.types";
const useCheckboxGroup = () => {
    const checkboxGroup = inject<ICheckboxGroupProvide>('ZCheckboxGroup', {})
    const isGroup = checkboxGroup.name == 'ZCheckboxGroup'; // 判断有没有父亲叫ZCheckboxGroup
    return {
        isGroup,
        checkboxGroup
    }
}


const useModel = (props: ICheckboxProps) => {
    const { emit } = getCurrentInstance(); // 以前只有checkbox的时候 用户会传递modelValue
    const { isGroup, checkboxGroup } = useCheckboxGroup();
    const store = computed(() => checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue); // 从爸爸的modelValue取出来 传递给自己， type="checkbox" 可以绑定数组
    const model = computed({
        get() {
            return isGroup ? store.value : props.modelValue
        },
        set(val) {
            if(isGroup){ // 只要是组 就需要触发组的更新方法，不触发自己的
                return checkboxGroup.changeEvent(val)
            }
            emit('update:modelValue', val);
        }
    });
    return model
}
const useCheckboxStatus = (props: ICheckboxProps, model: WritableComputedRef<unknown>) => {
    const isChecked = computed(() => {
        const value = model.value; // 当前是不是选中的  [上海,深圳]
        // todo...
        if(Array.isArray(value)){ // 针对父组件传递过来的数组
            return value.includes(props.label)
        }else{ // 针对true false
            return value
        }
    });
    return isChecked
}
const useEvent = () => {
    const { emit } = getCurrentInstance()
    const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        emit('change', target.checked);
    }
    return handleChange
}
export const useCheckbox = (props: ICheckboxProps) => {
    // 1.设计一个属性 这个属性采用的就是modelValue, 还能更改，更改的时候要触发一个事件，更新数据
    let model = useModel(props);

    // 2.需要给checkbox 设置一个checked的状态，等一会我们更改checkbox选中或者取消选中需要获取到checked状态
    const isChecked = useCheckboxStatus(props, model);

    // 3.创造一个change事件 可以触发绑定到自己身上的change
    const handleChange = useEvent();

    // 每次状态发生变化 都需要 调用changeEvent来触发更新

    return {
        model,
        isChecked,
        handleChange
    }
}