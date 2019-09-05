<template>
    <el-col :span="20" :offset="2">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="item in informations" :key="item.id" :title="item.title" :name="item.id">
                <vue-markdown>{{ item.content }}</vue-markdown>

                <template v-if="item.files">
                    <div v-for="file in item.files" :key="file.id">
                        <el-link type="primary" icon="el-icon-download" :href="file.url" target="_blank">{{file.name}}  </el-link>
                    </div>
                </template>
            </el-collapse-item>
        </el-collapse>
    </el-col>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    export default {
        components: {
            VueMarkdown
        },
        props: {
            informations: Array,
        },
        data() {
            return {
                activeNames: []
            };
        },
        methods: {
            handleChange(val) {
                // console.log(val);
            }
        }
    }
</script>