<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>お知らせ作成</h3>
        </div>
        <el-form>
            <el-form-item>
                <mavon-editor
                    v-model="value"
                    language="ja"/>
            </el-form-item>

            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload>

            <el-form-item>
                <el-button type="primary" @click.prevent="handleSendDm">Send</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        data() {
            return {
                value: "# test",
                fileList: [],
            }
        },
        methods: {
            handleSendDm() {
                console.log(this.value);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            }
        },
    }
</script>

<style>
    input[type="file"] {
        display: none;
    }
</style>