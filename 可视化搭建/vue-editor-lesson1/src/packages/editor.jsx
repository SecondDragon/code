import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import EditorBlock from './editor-block'
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDragger } from "./useBlockDragger";
export default defineComponent({
    props: {
        modelValue: { type: Object }
    },
    emits: ['update:modelValue'], // 要触发的时间
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        });

        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))

        const config = inject('config');

        const containerRef = ref(null);
        // 1.实现菜单的拖拽功能
        const { dragstart, dragend } = useMenuDragger(containerRef, data);

        // 2.实现获取焦点 选中后可能直接就进行拖拽了
        let { blockMousedown, focusData, containerMousedown } = useFocus(data, (e) => {
            // 获取焦点后进行拖拽
            mousedown(e)
        });
        // 2.实现组件拖拽
        let { mousedown } = useBlockDragger(focusData);









        // 3.实现拖拽多个元素的功能

        return () => <div class="editor">
            <div class="editor-left">
                {/* 根据注册列表 渲染对应的内容  可以实现h5的拖拽*/}
                {config.componentList.map(component => (
                    <div
                        class="editor-left-item"
                        draggable
                        onDragstart={e => dragstart(e, component)}
                        onDragend={dragend}
                    >
                        <span>{component.label}</span>
                        <div>{component.preview()}</div>
                    </div>
                ))}
            </div>
            <div class="editor-top">菜单栏</div>
            <div class="editor-right">属性控制栏目</div>
            <div class="editor-container">
                {/*  负责产生滚动条 */}
                <div class="editor-container-canvas">
                    {/* 产生内容区域 */}
                    <div
                        class="editor-container-canvas__content"
                        style={containerStyles.value}
                        ref={containerRef}
                        onMousedown={containerMousedown}

                    >
                        {
                            (data.value.blocks.map(block => (
                                <EditorBlock
                                    class={block.focus ? 'editor-block-focus' : ''}
                                    block={block}
                                    onMousedown={(e) => blockMousedown(e, block)}
                                ></EditorBlock>
                            )))
                        }
                    </div>
                </div>

            </div>
        </div>
    }
})