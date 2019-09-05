<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>お知らせ作成</h3>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

            <el-form-item label="Title" prop="title">
                <el-input v-model="ruleForm.title" @blur="editTitle"></el-input>
            </el-form-item>

            <el-form-item>
                <mavon-editor
                    v-model="value"
                    language="ja"/>
            </el-form-item>

            <el-form-item label="Files">
<!--                <el-upload-->
<!--                        class="upload-demo"-->
<!--                        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                        :on-preview="handlePreview"-->
<!--                        :on-remove="handleRemove"-->
<!--                        :before-remove="beforeRemove"-->
<!--                        :on-success="handleSuccess"-->
<!--                        multiple-->
<!--                        :limit="5"-->
<!--                        :on-exceed="handleExceed"-->
<!--                        :file-list="fileList">-->
<!--                    <el-button size="small" type="primary">Click to upload</el-button>-->
<!--                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>-->
<!--                </el-upload>-->
                <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-change="handleUpload"
                        :file-list="fileList"
                        :auto-upload="false"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
<!--                    <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>-->
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSendDm('ruleForm')">Send</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        props: {
            sendInformation: Function,
            fileUpload: Function,
        },
        data() {
            return {
                ruleForm: {
                    title: '',
                },
                rules: {
                    title: [
                        {required: true, message: 'Please input Title', trigger: 'blur'}
                    ]
                },
                value: "# test",
                fileList: [],
                files: [],
            }
        },
        methods: {
            handleSendDm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new FormData();
                        params.append('title', this.ruleForm.title);
                        params.append('content', this.value);
                        params.append('files', JSON.stringify(this.files));

                        this.sendInformation(params);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleRemove(file, fileList) {
                for (let i in this.files) {
                    if(this.files[i].name === file.name) {
                        this.files.splice(i, 1);
                    }
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            },
            handleSuccess(file, fileList) {
                console.log(fileList);
                this.fileData.push(file.raw);
            },
            handleUpload(file, fileList) {
                //  onChangeだから消した時もきちゃうので。
                for (let i in this.files) {
                    if(this.files[i].name === file.name) {
                        return
                    }
                }

                let params = new FormData();
                params.append('file', file.raw);

                this.fileUpload(params)
                    .then((data) => {
                        this.files.push({
                            name: file.name,
                            url: data.url
                        })
                    }).catch(() => {});
            },
            editTitle() {
                this.value = "# " + this.ruleForm.title + '\n' + this.value;
            }
        },
    }
</script>

<style>
    input[type="file"] {
        display: none;
    }
</style>