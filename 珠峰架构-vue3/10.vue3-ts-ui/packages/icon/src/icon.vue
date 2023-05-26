<template>
    <i :class="`z-icon-${name}`"></i>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name:'ZIcon',
    props:{
        name:{
            type:String,
            default:''
        }
    }
})
</script>



