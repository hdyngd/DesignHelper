<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="UserName" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Role" prop="role" v-show="admin">
            <el-radio-group v-model="ruleForm.role">
                <el-radio :label="2">一般ユーザ</el-radio>
                <el-radio :label="1">クリエイター</el-radio>
                <el-radio :label="0">管理者</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="Image" prop="thumbnail">
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
        name: "ProfileEditForm",
        props: {
            user: Object,
            admin: Boolean,
            editProfile: Function,
            toggleDialogEditUser: Function,
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    email: '',
                    role: '',
                    thumbnail: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Name is required', trigger: 'blur' },
                        // { min: 3, message: 'Length should be 3 or more characters', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Email is required', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: 'Please select activity role', trigger: 'change' }
                    ],
                },
                fileData: null,
            };
        },
        created(){
            this.setData()
        },
        watch: {
            user: function() {
                this.setData()
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let params = new FormData();
                        params.append('id', this.user.id);
                        params.append('name', this.ruleForm.name);
                        params.append('email', this.ruleForm.email);
                        params.append('role', Number(this.ruleForm.role));
                        params.append('thumbnail', this.fileData);

                        // let params = {
                        //     id: this.user.id,
                        //     name: this.ruleForm.name,
                        //     email: this.ruleForm.email,
                        //     role: Number(this.ruleForm.role),
                        // }

                        // console.log(params);
                        this.editProfile(params)
                            .then((res) => {
                                this.toggleDialogEditUser(false)
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
                    this.$message.error('Avatar picture must be JPG or PNG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Avatar picture size can not exceed 2MB!');
                }
                return isIMG && isLt2M;
            },
            setData() {
                this.ruleForm.name = this.user.name
                this.ruleForm.email = this.user.email
                this.ruleForm.role = this.user.role
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