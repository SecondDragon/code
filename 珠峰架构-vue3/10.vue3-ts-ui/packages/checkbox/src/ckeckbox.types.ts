import { ComputedRef } from "vue";

export interface ICheckboxProps {
    indeterminate?: boolean, // 是否半选
    checked?: boolean, // 是否选中
    name?: string, // 原生的name
    disabled?: boolean, // 是否禁用
    label?: string | number | boolean, // 目前没有 group中使用
    modelValue?: string |number | boolean // 绑定checkbox的值
}
// ts中接口中的可有可无


export interface ICheckboxGroupProvide{
    modelValue?:ComputedRef,
    changeEvent?: (val:unknown) => void,
    name?:string
}