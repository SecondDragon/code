export type Key = string | number;
export type DataItem = {
    key:Key,
    label:string,
    disabled:boolean
}
export type Props = {
    key:string,
    label:string,
    disabled:string
}
export interface ITransferProps {
    data:DataItem[], // 所有数据
    modelValue:Key[], //放置右边框的索引  [1,4]
    props:Props // 数据的别名
} 

export interface ITransferPanelProps {
    data:any[],
    props?:Props
}

export interface IPanelState {
    allChecked:boolean,
    checked:Key[]
}