<template>
    <div class="login">
        <el-card>
            <h2>パスワード再設定</h2>
            <p>登録済みのメールアドレスを入力してください。パスワード再設定用リンクを送信します。</p>
            <el-form
                    class="login-form"
                    :model="model"
                    :rules="rules"
                    ref="form"
                    @submit.native.prevent="resetPassword"
            >
                <el-form-item prop="email">
                    <el-input
                            v-model="model.email"
                            placeholder="Email"
                            prefix-icon="el-icon-message"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                            :loading="loading"
                            class="login-button"
                            type="primary"
                            block
                            @click="handleReset('form')"
                    >Send Email</el-button
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
            resetPassword: Function,
        },
        data() {
            return {
                validCredentials: {
                    email: "lightscope"
                },
                model: {
                    email: ""
                },
                loading: false,
                rules: {
                    email: [
                        {
                            required: true,
                            message: "Email is required",
                        },
                    ]
                }
            };
        },
        methods: {
            handleReset(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            email: this.model.email
                        }

                        this.resetPassword(params)
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