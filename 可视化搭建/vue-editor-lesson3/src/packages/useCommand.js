import deepcopy from "deepcopy";
import { onUnmounted } from "vue";
import { events } from "./events";

export function useCommand(data, focusData) {
    const state = { // 前进后退需要指针
        current: -1, // 前进后退的索引值
        queue: [], //  存放所有的操作命令
        commands: {}, // 制作命令和执行功能一个映射表  undo : ()=>{}  redo:()=>{}
        commandArray: [], // 存放所有的命令
        destroyArray: []
    }
    const registry = (command) => {
        state.commandArray.push(command);
        state.commands[command.name] = (...args) => { // 命令名字对应执行函数
            const { redo, undo } = command.execute(...args);
            redo();
            if (!command.pushQueue) { // 不需要放到队列中直接跳过即可
                return
            }
            let { queue, current } = state;

            // 如果先放了 组件1 -》 组件2 => 组件3 =》 组件4 - -》 组件3
            // 组件1 -> 组件3
            if (queue.length > 0) {
                queue = queue.slice(0, current + 1); // 可能在放置的过程中有撤销操作，所以根据当前最新的current值来计算新的对了
                state.queue = queue;
            }
            queue.push({ redo, undo }); // 保存指令的前进后退
            state.current = current + 1;
            console.log(queue);
        }
    }
    // 注册我们需要的命令
    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        execute() {
            return {
                redo() {
                    let item = state.queue[state.current + 1]; // 找到当前的下一步还原操作
                    if (item) {
                        item.redo && item.redo();
                        state.current++;
                    }
                }
            }
        }
    })
    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute() {
            return {
                redo() {
                    if (state.current == -1) return; // 没有可以撤销的了
                    let item = state.queue[state.current]; // 找到上一步还原
                    if (item) {
                        item.undo && item.undo(); // 这里没有操作队列
                        state.current--;
                    }
                }
            }
        }
    });
    registry({ // 如果希望将操作放到队列中可以增加一个属性 标识等会操作要放到队列中
        name: 'drag',
        pushQueue: true,
        init() { // 初始化操作 默认就会执行
            this.before = null
            // 监控拖拽开始事件，保存状态
            const start = () => {
                this.before = deepcopy(data.value.blocks)
            }
            // 拖拽之后需要触发对应的指令
            const end = () => {
                state.commands.drag()
            }
            events.on('start', start)
            events.on('end', end)
            return () => {
                events.off('start', start);
                events.off('end', end)
            }
        },
        execute() { // state.commands.drag()
            let before = this.before;
            let after = data.value.blocks // 之后的状态
            return {
                redo() { // 默认一松手 就直接把当前事情做了
                    data.value = { ...data.value, blocks: after }
                },
                undo() { // 前一步的
                    data.value = { ...data.value, blocks: before }
                }
            }
        }
    });
    // 带有历史记录常用的模式 
    registry({
        name: 'updateContainer', // 更新整个容器
        pushQueue: true,
        execute(newValue) {
            let state = {
                before: data.value, // 当前的值
                after: newValue // 新值
            }
            return {
                redo: () => {
                    data.value = state.after
                },
                undo: () => {
                    data.value = state.before
                }
            }
        }
    })



    registry({
        name: 'updateBlock', // 更新某个组件
        pushQueue: true,
        execute(newBlock, oldBlock) {
            let state = {
                before: data.value.blocks,
                after: (() => {
                    let blocks = [...data.value.blocks]; // 拷贝一份用于新的block
                    const index = data.value.blocks.indexOf(oldBlock); // 找老的 需要通过老的查找
                    if (index > -1) {
                        blocks.splice(index, 1, newBlock)
                    }
                    return blocks;
                })()
            }
            return {
                redo: () => {
                    data.value = { ...data.value, blocks: state.after }
                },
                undo: () => {
                    data.value = { ...data.value, blocks: state.before }
                }
            }
        }
    })


    registry({ // 置顶操作
        name: 'placeTop',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value.blocks);
            let after = (() => { // 置顶就是在所有的block中找到最大的
                let { focus, unfocused } = focusData.value;
                let maxZIndex = unfocused.reduce((prev, block) => {
                    return Math.max(prev, block.zIndex);
                }, -Infinity);
                focus.forEach(block => block.zIndex = maxZIndex + 1); // 让当前选中的比最大的+1 即可
                return data.value.blocks
            })()

            return {
                undo: () => {
                    // 如果当前blocks 前后一致 则不会更新
                    data.value = { ...data.value, blocks: before }
                },
                redo: () => {
                    data.value = { ...data.value, blocks: after }
                }
            }
        }
    })
    registry({ // 置底操作
        name: 'placeBottom',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value.blocks);
            let after = (() => { // 置顶就是在所有的block中找到最大的
                let { focus, unfocused } = focusData.value;
                let minZIndex = unfocused.reduce((prev, block) => {
                    return Math.min(prev, block.zIndex);
                }, Infinity) - 1;
                // 不能直接 - 1 因为index 不能出现负值 负值就看不到组件了

                if (minZIndex < 0) { // 这里如果是赋值则让没选中的向上 ，自己变成0
                    const dur = Math.abs(minZIndex);
                    minZIndex = 0;
                    unfocused.forEach(block => block.zIndex += dur)
                }
                // 让当前选中的比最大的+1 即可

                focus.forEach(block => block.zIndex = minZIndex); // 控制选中的值
                return data.value.blocks
            })()

            return {
                undo: () => {
                    // 如果当前blocks 前后一致 则不会更新
                    data.value = { ...data.value, blocks: before }
                },
                redo: () => {
                    data.value = { ...data.value, blocks: after }
                }
            }
        }
    })
    registry({
        name: 'delete', // 删除
        pushQueue: true,
        execute() {
            let state = {
                before: deepcopy(data.value.blocks), // 当前的值
                after: focusData.value.unfocused // 选中的都删除了 留下的都是没选中的
            }
            return {
                redo: () => {
                    data.value = { ...data.value, blocks: state.after }
                },
                undo: () => {
                    data.value = { ...data.value, blocks: state.before }
                }
            }
        }
    })
    const keyboardEvent = (() => {
        const keyCodes = {
            90: 'z',
            89: 'y'
        }
        const onKeydown = (e) => {
            const { ctrlKey, keyCode } = e; // ctrl+z  / ctrl+y
            let keyString = [];
            if (ctrlKey) keyString.push('ctrl');
            keyString.push(keyCodes[keyCode]);
            keyString = keyString.join('+');

            state.commandArray.forEach(({ keyboard, name }) => {
                if (!keyboard) return; // 没有键盘事件
                if (keyboard === keyString) {
                    state.commands[name]();
                    e.preventDefault();
                }
            })
        }
        const init = () => { // 初始化事件
            window.addEventListener('keydown', onKeydown)
            return () => { // 销毁事件
                window.removeEventListener('keydown', onKeydown)
            }
        }
        return init
    })();
    (() => {

        // 监听键盘事件
        state.destroyArray.push(keyboardEvent())
        state.commandArray.forEach(command => command.init && state.destroyArray.push(command.init()))
    })();

    onUnmounted(() => { // 清理绑定的事件
        state.destroyArray.forEach(fn => fn && fn());
    })
    return state;
}