<template>
    <el-col :span="16" :offset="4">
        <el-card>
            <div slot="header" class="clearfix">
                <h3>新規登録</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="UserName" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="Email" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="on"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click.prevent="submitForm('ruleForm')">登録</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-col>
</template>

<script>
    export default {
        props: {
            signUp: Function
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    email: '',
                    password: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Name is required', trigger: 'blur' },
                        // { min: 3, message: 'Length should be 3 or more characters', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Email is required', trigger: 'blur' }
                    ],
                    password: [
                        {
                            required: true,
                            message: "Password is required",
                        },
                        {
                            min: 6,
                            message: "Password length should be at least 6 characters",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            name: this.ruleForm.name,
                            email: this.ruleForm.email,
                            role: 2,
                            password: this.ruleForm.password,
                            password_confirmation: this.ruleForm.password,
                        }

                        this.signUp(params)
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
        }
    }
</script>

<style>

</style>