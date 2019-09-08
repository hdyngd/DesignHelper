<template>
    <div class="login">
        <el-card>
            <h2>パスワード設定</h2>
            <el-form
                    class="login-form"
                    :model="model"
                    :rules="rules"
                    ref="form"
                    @submit.native.prevent="setPassword"
            >
                <el-form-item prop="password">
                    <el-input
                            v-model="model.password"
                            placeholder="Password"
                            type="password"
                            prefix-icon="fas fa-lock"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                            :loading="loading"
                            class="login-button"
                            type="primary"
                            block
                            @click="handleSet('form')"
                    >Set Password</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            token: String,
            setPassword: Function,
        },
        data() {
            return {
                validCredentials: {
                    password: "lightscope"
                },
                model: {
                    password: ""
                },
                loading: false,
                rules: {
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
            handleSet(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            password: this.model.password,
                            token: this.token,
                        }

                        this.setPassword(params)
                            .then(() => {
                                router.push('/login');
                            });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }

    .login-button {
        width: 100%;
        margin-top: 40px;
    }
    .login-form {
        width: 290px;
    }
    .forgot-password {
        margin-top: 10px;
    }
</style>

<style scoped lang="scss">
    .el-button--primary {

        &:hover,
        &.active,
        &:focus {}
    }
    .login .el-input__prefix {
        left: 0;
        height: calc(100% - 2px);
        left: 1px;
        top: 1px;
        border-radius: 3px;
        .el-input__icon {
            width: 30px;
        }
    }
    .login .el-input input {
        padding-left: 35px;
    }
    .login .el-card {
        padding-top: 0;
        padding-bottom: 30px;
    }
    h2 {
        font-family: "Open Sans";
        letter-spacing: 1px;
        font-family: Roboto, sans-serif;
        padding-bottom: 20px;
    }
    a {
        text-decoration: none;
        &:hover,
        &:active,
        &:focus {}
    }
    .login .el-card {
        width: 340px;
        display: flex;
        justify-content: center;
    }
</style>