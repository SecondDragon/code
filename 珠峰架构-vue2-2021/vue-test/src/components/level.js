export default {
    props:{
        type:String
    },
    render(h){
        return h('h'+this.type,this.$slots.default)
    }
}
