<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>ユーザー登録</h3>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="UserName" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="Role" prop="role">
                <el-radio-group v-model="ruleForm.role">
                    <el-radio :label="2">一般ユーザ</el-radio>
                    <el-radio :label="1">クリエイター</el-radio>
                    <el-radio :label="0">管理者</el-radio>
                </el-radio-group>
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
                <el-button type="primary" @click.prevent="submitForm('ruleForm')">Create</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        props: {
          createUser: Function
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
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let password = this.getRandomString();
                        let params = {
                            name: this.ruleForm.name,
                            email: this.ruleForm.email,
                            role: Number(this.ruleForm.role),
                            password: password,
                            password_confirmation: password,
                        }
                        //console.log(params);
                        this.createUser(params)
                            .then((res) => {
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
            getRandomString(){
                //使用文字の定義
                let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+";

                //桁数の定義
                let len = 8;

                //ランダムな文字列の生成
                let result = "";
                for(let i=0;i<len;i++){
                    result += str.charAt(Math.floor(Math.random() * str.length));
                }
                return result;
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.thumbnail = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('Avatar picture must be JPG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Avatar picture size can not exceed 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
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