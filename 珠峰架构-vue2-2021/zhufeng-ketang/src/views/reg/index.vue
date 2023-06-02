<template>
    <div>
        <van-nav-bar title="注册" left-arrow @click-left="$router.back()"></van-nav-bar>
        <FormSubmit @submit="submit"></FormSubmit>
    </div>
</template>

<script >
import FormSubmit from '@/components/form-submit'
export default {
    components: {
        FormSubmit
    },
    methods: {
        submit(values) {
            console.log(values)
        }
    }
}
</script>