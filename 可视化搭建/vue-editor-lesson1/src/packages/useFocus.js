import {computed} from 'vue'
export function useFocus(data,callback){ // 获取哪些元素被选中了
    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return { focus, unfocused }
    });
    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false);
    }
    const containerMousedown = () => {
        clearBlockFocus(); // 点击容器让选中的失去焦点
    }
    const blockMousedown = (e, block) => {
        e.preventDefault();
        e.stopPropagation();
        // block上我们规划一个属性 focus 获取焦点后就将focus变为true
        if (e.shiftKey) {
            block.focus = !block.focus;
        } else {
            if (!block.focus) {
                clearBlockFocus();
                block.focus = true; // 要清空其他人foucs属性
            } else {
                block.focus = false;
            }
        }
        callback(e)
    }
    return {
        blockMousedown,
        containerMousedown,
        focusData
    }
}