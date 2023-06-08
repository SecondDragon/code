import { ElDialog ,ElButton,ElInput} from "element-plus";
import { createVNode, defineComponent, reactive, render } from "vue";

const DialogComponent = defineComponent({
    props:{
        option:{type:Object}
    },
    setup(props,ctx){
        const state = reactive({
            option:props.option, // 用户给组件的属性
            isShow:false
        })
        ctx.expose({ // 让外界可以调用组件的方法
            showDialog(option){
                state.option = option;
                state.isShow = true;
            }
        });
        const onCancel = () =>{
            state.isShow = false;
        }
        const onConfirm = ()=>{
            state.isShow = false;
            state.option.onConfirm && state.option.onConfirm(state.option.content)
        }
        return ()=>{
            return <ElDialog v-model={state.isShow} title={state.option.title}>
                {{
                    default:()=><ElInput 
                        type="textarea" 
                        v-model={state.option.content}
                        rows={10}
                    ></ElInput>,
                    footer:()=> state.option.footer&& <div>
                        <ElButton onClick={onCancel}>取消</ElButton>
                        <ElButton type="primary"  onClick={onConfirm}>确定</ElButton>
                    </div>
                }}
            </ElDialog>
        }
    }   
})
let vm;
export function $dialog(option){
    // element-plus中是有el-dialog组件 
    // 手动挂载组件   new SubComponent.$mount()
    if(!vm){
        let el = document.createElement('div');
        vm = createVNode(DialogComponent,{option}); // 将组件渲染成虚拟节点
    
        // 这里需要将el 渲染到我们的页面中
        document.body.appendChild((render(vm,el),el)) // 渲染成真实节点扔到页面中
    }
    // 将组件渲染到这个el元素上
    let {showDialog} = vm.component.exposed
    showDialog(option); // 其他说明组件已经有了只需要显示出来即可
}