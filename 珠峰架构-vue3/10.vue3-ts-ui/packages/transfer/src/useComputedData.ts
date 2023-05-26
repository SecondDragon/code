import { computed } from "@vue/runtime-core";
import { ITransferProps } from "./transfer.type";

export const useComputedData = (props: ITransferProps) => {

    // 如何计算 左右数据
    const propsKey = computed(() => props.props.key); // 重命名的名字
    const data = computed(() => {
        return props.data.reduce((memo, current) => { // [{key:'abc'}]
            memo[current[propsKey.value]] = current;
            return memo
        }, {})
    });
    const sourceData = computed(() => { // 我要的是不是props中的modelvalue 滤掉可以
        return props.data.filter(item => !props.modelValue.includes(item[propsKey.value]))
    })
    const targetData = computed(() => { // 我要的是不是props中的modelvalue 滤掉可以
        return props.modelValue.reduce((memo, key) => {
            memo.push(data.value[key]);
            return memo;
        }, []);
    })
    return {
        propsKey,
        sourceData,
        targetData
    }

}