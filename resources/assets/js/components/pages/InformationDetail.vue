<template>
    <div>
        <vue-markdown>{{ information.content }}</vue-markdown>
        <template v-if="information.files">
            <div v-for="file in information.files" :key="file.id">
                <el-link type="primary" icon="el-icon-download" :href="file.url" target="_blank">{{file.name}}  </el-link>
            </div>
        </template>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    export default {
        components: {
            VueMarkdown
        },
        props: {
            information: Object,
        },
    }
</script>