<template>
    <div>
        <el-input class="long-input" clearable v-model="article.title" placeholder="文章标题"></el-input>
        <el-input class="long-input" clearable v-model="article.tag" placeholder="标签,多个用空格隔开"></el-input>
        <div class="editor-container" v-if="isShowEditor">
            <vue-simplemde v-model="article.content" ref="markdownEditor" />
        </div>
        <el-button class="add-button" type="primary">添加文章</el-button>
    </div>
</template>

<style lang="scss">
@import "simplemde/dist/simplemde.min.css";
@import "font-awesome/css/font-awesome.min.css";
.el-input {
    margin-bottom: 30px;
}
</style>
<script>
export default {
    components: {
        VueSimplemde: () => import("vue-simplemde"),
    },
    data() {
        return {
            isShowEditor: false,
            article: {
                content: "",
                title: "",
                tag: "",
            },
        };
    },
    mounted() { // 如果不在mounted中使用可能 会导致 服务端报错
        this.isShowEditor = true;
    },
};
</script>