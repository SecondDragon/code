import { provide,inject, computed, createVNode, defineComponent, render,reactive, onMounted, ref, onBeforeUnmount } from "vue";

export const DropdownItem = defineComponent({
    props:{
        label:String,
        icon:String
    },
    setup(props){
        let {label,icon} = props
        let hide =  inject('hide')
        return ()=><div class="dropdown-item" onClick ={hide}> 
            <i class={icon}></i>
            <span>{label}</span>
        </div>
    }
})
const DropdownComponent = defineComponent({
    props:{
        option:{type:Object},
    },

    setup(props,ctx){
        const state = reactive({
            option:props.option,
            isShow:false,
            top:0,
            left:0
        })
        ctx.expose({
            showDropdown(option){
                state.option = option;
                state.isShow = true;
                let {top,left,height} =  option.el.getBoundingClientRect();
                state.top = top + height;
                state.left = left;
            }
        });
        provide('hide',()=>state.isShow = false)
        
        const classes = computed(()=>[
            'dropdown',
            {
                'dropdown-isShow': state.isShow
            }
        ])
        const styles = computed(()=>({
            top:state.top+'px',
            left:state.left + 'px'
        }))
        const el = ref(null)
        const onMousedownDocument = (e)=>{
            if(!el.value.contains(e.target)){ // 如果点击的是dropdown内部 什么都不做
                state.isShow = false;
            }
        }
        onMounted(()=>{
            // 事件的传递行为是先捕获 在冒泡
            // 之前为了阻止事件传播 我们给block 都增加了stopPropagation
            document.body.addEventListener('mousedown',onMousedownDocument,true)
        })

        onBeforeUnmount(()=>{
            document.body.removeEventListener('mousedown',onMousedownDocument)
        })
        return ()=>{
            return <div class={classes.value} style={styles.value} ref={el}>
                {state.option.content()}
            </div>
        }
    }
})


let vm;
export function $dropdown(option){
    // element-plus中是有el-dialog组件 
    // 手动挂载组件   new SubComponent.$mount()
    if(!vm){
        let el = document.createElement('div');
        vm = createVNode(DropdownComponent,{option}); // 将组件渲染成虚拟节点
    
        // 这里需要将el 渲染到我们的页面中
        document.body.appendChild((render(vm,el),el)) // 渲染成真实节点扔到页面中
    }
    // 将组件渲染到这个el元素上
    let {showDropdown} = vm.component.exposed
    showDropdown(option); // 其他说明组件已经有了只需要显示出来即可
}