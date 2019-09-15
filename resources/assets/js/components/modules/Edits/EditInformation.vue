<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>お知らせ編集</h3>
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
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSendDm('ruleForm')">Edit</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "EditInformationForm",
        props: {
            information: Object,
            toggleDialogEditInformation: Function,
            editInformation: Function,
            fileUpload: Function,
        },
        data() {
            return {
                ruleForm: {
                    title: "",
                },
                rules: {
                    title: [
                        {required: true, message: 'Please input Title', trigger: 'blur'}
                    ]
                },
                value: "",
                fileList: [],
                files: [],
            }
        },
        created() {
            this.setData();
        },
        watch: {
            information: function() {
                this.setData();
            }
        },
        methods: {
            handleSendDm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new FormData();
                        params.append('id', this.information.id);
                        params.append('title', this.ruleForm.title);
                        params.append('content', this.value);
                        params.append('files', JSON.stringify(this.files));

                        this.editInformation(params)
                            .then(() => {
                                this.toggleDialogEditInformation(false);
                            }).catch(() => {});
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
                // console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            },
            handleSuccess(file, fileList) {
                // console.log(fileList);
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
            },
            setData() {
                this.ruleForm.title = this.information.title
                this.value = this.information.content
                this.fileList = this.information.files
                this.files = this.information.files
            },
        }
    }
</script>

<style>
    input[type="file"] {
        display: none;
    }
</style>