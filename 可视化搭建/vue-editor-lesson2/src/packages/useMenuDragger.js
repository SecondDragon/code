import {events} from './events';
export function useMenuDragger(containerRef,data){
    let currentComponent = null;
    const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move'; // h5拖动的图标
    }
    const dragover = (e) => {
        e.preventDefault();
    }
    const dragleave = (e) => {
        e.dataTransfer.dropEffect = 'none';
    }
    const drop = (e) => {
        // 先留在这
        let blocks =  data.value.blocks; // 内部已经渲染的组件
        data.value = {...data.value,blocks:[
            ...blocks,
            {
                top:e.offsetY,
                left:e.offsetX,
                zIndex:1,
                key:currentComponent.key,
                alignCenter:true // 希望松手的时候你可以居中
            }
        ]}
        currentComponent = null;
    }
    const dragstart = (e, component) => {
        // dragenter进入元素中 添加一个移动的标识
        // dragover 在目标元素经过 必须要阻止默认行为 否则不能触发drop
        // dragleave 离开元素的时候 需要增加一个禁用标识
        // drop 松手的时候 根据拖拽的组件 添加一个组件
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component
        events.emit('start'); // 发布start
    }
    const dragend = (e)=>{
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
        events.emit('end'); // 发布end
    }
    return {
        dragstart,
        dragend
    }
}