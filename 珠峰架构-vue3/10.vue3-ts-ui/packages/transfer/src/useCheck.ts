import { computed, getCurrentInstance, watch } from "vue";
import { IPanelState, ITransferPanelProps } from "./transfer.type";

export const useCheck = (props: ITransferPanelProps, panelState: IPanelState) => {
    const {emit} = getCurrentInstance()
    const labelProp = computed(() => props.props.label);
    const keyProp = computed(() => props.props.key);
    const disabledProp = computed(() => props.props.disabled);

    const checkableData = computed(() => { // 过滤出不是禁用的来
        return props.data.filter(item => !item[disabledProp.value])
    })

    const handleCheckedAllChange = (val) => {
        // 1.我需要将所有数据拿到， 通过当前的值 来做筛选
        panelState.allChecked = val;
        panelState.checked = val ? checkableData.value.map(item => item[keyProp.value]) : []
    }

    // 做全选 最好还是依次比较
    // watch的参数第一个尽量放函数
    watch(() => panelState.checked, () => {
        // 看一眼有没有false 如果儿子里有false 就表示没选中
        let checkKeys = checkableData.value.map(item => item[keyProp.value]); // 获取所有的key
        // 去所有的key 里面看  看panelState.checked是否包含这个key
        panelState.allChecked = checkKeys.length > 0 && checkKeys.every(key => panelState.checked.includes(key));

        emit('checked-change',panelState.checked)
    }); // watch是基于effect的实现 只是有对应的自己的调度方法scheduler
    // 全选功能 反选 半选

    watch(()=>props.data,()=>{ // 数据变化后清空 checked属性 保证还原allChecked
        panelState.checked = []
    })
    return {
        labelProp,
        keyProp,
        disabledProp,
        handleCheckedAllChange
    }
}