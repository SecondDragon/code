import { computed, defineComponent, h, provide } from "vue";
export default defineComponent({
    name: 'ZRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 0
        },
        justify: {
            type: String,
            default: 'start' // flex-start flex-end space-around
        }
    },
    setup(props, { slots }) {
        // ts中的链判断运算符 slots.default && slots.default()
        provide('ZRow', props.gutter); // 提供给所有子组件，都能使用这个属性
        const classs = computed(() => [
            'z-row',
            props.justify !== 'start' ? `is-justify-${props.justify}` :''
        ])
        const styles = computed(() => {
            let ret = {
                marginLeft: '',
                marginRight: ''
            }
            if (props.gutter) {
                ret.marginRight = ret.marginLeft = `-${props.gutter / 2}px`
            }
            return ret;
        })
        return () => h(props.tag, {
            class: classs.value,
            style: styles.value
        }, slots.default?.())
    }
})
