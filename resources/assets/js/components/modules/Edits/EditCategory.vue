<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="CategoryName" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="Description" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="Thumbnail" prop="thumbnail">
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
            >
                <img v-if="ruleForm.thumbnail" :src="ruleForm.thumbnail" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click.prevent="submitForm('ruleForm')">Edit</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "CategoryEditForm",
        props: {
            category: Object,
            editCategory: Function,
            toggleDialogEditCategory: Function,
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    description: '',
                    thumbnail: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Category name is required', trigger: 'blur' },
                    ],
                },
                fileData: null,
            };
        },
        created(){
            this.setData()
        },
        watch: {
            category: function() {
                this.setData()
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let params = new FormData();
                        params.append('id', this.category.id);
                        params.append('name', this.ruleForm.name);
                        params.append('description', this.ruleForm.description);
                        params.append('image', this.fileData);
                        //console.log(params);
                        this.editCategory(params)
                            .then((res) => {
                                this.toggleDialogEditCategory(false)
                                // console.log(res)
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.thumbnail = URL.createObjectURL(file.raw);
                this.fileData = file.raw;
            },
            beforeAvatarUpload(file) {
                const isIMG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isIMG) {
                    this.$message.error('Image picture must be JPG or PNG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Image picture size can not exceed 2MB!');
                }
                return isIMG && isLt2M;
            },
            setData() {
                this.ruleForm.name = this.category.name
                this.ruleForm.description = this.category.description
            },
        }
    }
</script>

<style>
    input[type="file"] {
        display: none;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>