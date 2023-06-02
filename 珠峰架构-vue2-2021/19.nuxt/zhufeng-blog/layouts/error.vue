<template>
    <div>
        <div>错误页面</div>
        <div v-if=" error.statusCode">{{ error.statusCode }}</div>
        <div>{{error.message}}</div>
    </div>
</template>

<script>
export default { // statusCode message
    props: ['error']
}
</script>