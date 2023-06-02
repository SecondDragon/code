export default {
    'has':{
        inserted(el,bindings,vnode){ // dom操作
            let value = bindings.value; // 用户写的 v-has=''''
            let permissions = vnode.context.$store.state.user.btnPermission;
            if(!permissions.includes(value)){
                el.parentNode.removeChild(el);
            }
        }
    }
}


// 自定义指令