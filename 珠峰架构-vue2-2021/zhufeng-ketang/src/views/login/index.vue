<template>
    <div>
        <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
        <FormSubmit @submit="submit"></FormSubmit>

    </div>
</template>
<script >
import * as Types from '@/store/action-types'
import FormSubmit from '@/components/form-submit';
import {createNamespacedHelpers} from 'vuex'
let {mapActions} = createNamespacedHelpers('user');
import {Dialog} from 'vant'
export default {
    components: {
        FormSubmit
    },
    methods: {
        ...mapActions([Types.SET_LOGIN]),
        async submit(values) {
            try{
                await this[Types.SET_LOGIN](values);
                this.$router.push('/profile')
            }catch(e){
                Dialog.alert({
                    title:'登录失败',
                    message: e.data
                })
            }
            
        }
    }
}
</script>