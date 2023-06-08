import deepcopy from "deepcopy";
import { ElButton, ElTag } from "element-plus";
import { defineComponent ,computed} from "vue";
import { $tableDialog } from "../components/TableDialog";

export default defineComponent({
    props: {
        propConfig: { type: Object },
        modelValue: { type: Array }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue || []
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })
        const add = () =>{
            $tableDialog({
                config:props.propConfig,
                data:data.value,
                onConfirm(value){
                    data.value = value; // 当点击确认的时候 将数据更新
                }
            })
        }
        return () => {
            return <div>
                {/* 此下拉框没有任何数据 直接显示一个按钮即可 */}
                {(!data.value || data.value.length == 0)  && <ElButton onClick={add}>添加</ElButton>}

                {/* [{label:'',value:''},{label:'',value:''}]  */}
                {(data.value || []).map(item=><ElTag onClick={add}>{item[props.propConfig.table.key]}</ElTag>)}
            </div>
        }
    }
})