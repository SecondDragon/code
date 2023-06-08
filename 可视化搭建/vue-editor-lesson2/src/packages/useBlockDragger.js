import { reactive } from "vue";
import { events } from "./events";

export function useBlockDragger(focusData, lastSelectBlock, data) {
    let dragState = {
        startX: 0,
        startY: 0,
        dragging:false // 默认不是正在拖拽
    }
    let markLine = reactive({
        x: null,
        y: null
    })
    const mousedown = (e) => {

        const { width: BWidth, height: BHeight } = lastSelectBlock.value; // 拖拽的最后的元素

        dragState = {
            startX: e.clientX,
            startY: e.clientY, // 记录每一个选中的位置
            startLeft: lastSelectBlock.value.left, // b点拖拽前的位置 left和top
            startTop: lastSelectBlock.value.top,
            dragging:false,
            startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
            lines: (() => {
                const { unfocused } = focusData.value; // 获取其他没选中的以他们的位置做辅助线
                let lines = { x: [], y: [] }; // 计算横线的位置用y来存放  x存的是纵向的
                [...unfocused,
                    {
                        top: 0,
                        left: 0,
                        width: data.value.container.width,
                        height: data.value.container.height
                    }
                ].forEach((block) => {
                    const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block;
                    // 当此元素拖拽到和A元素top一致的时候，要显示这根辅助线，辅助线的位置就是ATop
                    lines.y.push({ showTop: ATop, top: ATop });
                    lines.y.push({ showTop: ATop, top: ATop - BHeight }); // 顶对底
                    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 }); // 中对中
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }); // 底对顶
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight }); // 底对底

                    lines.x.push({ showLeft: ALeft, left: ALeft }); // 左对左边
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // 右边对左边
                    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 })
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth })
                    lines.x.push({ showLeft: ALeft, left: ALeft - BWidth }) // 左对右
                });
                return lines
            })()
        }
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup)
    }
    const mousemove = (e) => {
        let { clientX: moveX, clientY: moveY } = e;
        if(!dragState.dragging){
            dragState.dragging = true;
            events.emit('start'); // 触发事件就会记住拖拽前的位置
        }

        // 计算当前元素最新的left和top 去线里面找，找到显示线
        // 鼠标移动后 - 鼠标移动前 + left就好了
        let left = moveX - dragState.startX + dragState.startLeft;
        let top = moveY - dragState.startY + dragState.startTop;

        // 先计算横线  距离参照物元素还有5像素的时候 就显示这根线

        let y = null;
        let x = null;
        for (let i = 0; i < dragState.lines.y.length; i++) {
            const { top: t, showTop: s } = dragState.lines.y[i]; // 获取每一根线
            if (Math.abs(t - top) < 5) { // 如果小于五说明接近了 
                y = s; // 线要现实的位置
                moveY = dragState.startY - dragState.startTop + t; // 容器距离顶部的距离 + 目标的高度 就是最新的moveY
                // 实现快速和这个元素贴在一起
                break; // 找到一根线后就跳出循环
            }
        }
        for (let i = 0; i < dragState.lines.x.length; i++) {
            const { left: l, showLeft: s } = dragState.lines.x[i]; // 获取每一根线
            if (Math.abs(l - left) < 5) { // 如果小于五说明接近了 
                x = s; // 线要现实的位置
                moveX = dragState.startX - dragState.startLeft + l; // 容器距离顶部的距离 + 目标的高度 就是最新的moveY
                // 实现快速和这个元素贴在一起
                break; // 找到一根线后就跳出循环
            }
        }
        markLine.x = x; // markline 是一个响应式数据 x，y更新了会导致视图更新
        markLine.y = y;


        let durX = moveX - dragState.startX; // 之前和之后的距离
        let durY = moveY - dragState.startY;
        focusData.value.focus.forEach((block, idx) => {
            block.top = dragState.startPos[idx].top + durY;
            block.left = dragState.startPos[idx].left + durX;
        })
    }
    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup)
        markLine.x = null;
        markLine.y = null;
        if(dragState.dragging){ // 如果只是点击就不会触发
            events.emit('end');
        }
    }

    return {
        mousedown,
        markLine
    }
}