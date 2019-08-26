<template>
    <div class="login">
        <el-card>
            <h2>Login</h2>
            <el-form
                    class="login-form"
                    :model="model"
                    :rules="rules"
                    ref="form"
                    @submit.native.prevent="login"
            >
                <el-form-item prop="email">
                    <el-input
                            v-model="model.email"
                            placeholder="Email"
                            prefix-icon="el-icon-message"
                    >
                    </el-input>
                </el-form-item>
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
                            @click="onLogin('form')"
                    >Login</el-button
                    >
                </el-form-item>
                <a class="forgot-password" href="#"
                >Forgot password ?</a
                >
            </el-form>
            <el-button @click="testAdmin">テストユーザ(管理者)</el-button>
            <el-button @click="testGeneral">テストユーザ(一般1)</el-button>
            <el-button @click="testGeneral2">テストユーザ(一般2)</el-button>
            <el-button @click="testCreator">テストユーザ(クリエイター1)</el-button>
            <el-button @click="testCreator2">テストユーザ(クリエイター2)</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                validCredentials: {
                    email: "lightscope",
                    password: "lightscope"
                },
                model: {
                    email: "",
                    password: ""
                },
                loading: false,
                rules: {
                    email: [
                        {
                            required: true,
                            message: "Email is required",
                        },
                        // {
                        //     min: 4,
                        //     message: "Username length should be at least 5 characters",
                        //     trigger: "blur"
                        // }
                    ],
                    password: [
                        {
                            required: true,
                            message: "Password is required",
                        },
                        // {
                        //     min: 5,
                        //     message: "Password length should be at least 5 characters",
                        //     trigger: "blur"
                        // }
                    ]
                }
            };
        },
        props: {
            login: Function,
        },
        methods: {
            onLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            email: this.model.email,
                            password: this.model.password
                        }

                        this.login(params)
                            .then(() => {
                                router.push('/home');
                            });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            testAdmin(){
                this.model.email = 'admin@example.com'
                this.model.password = 'password'
            },
            testGeneral(){
                this.model.email = 'ippana@test.com'
                this.model.password = process.env.MIX_TEST_USER_GENERAL1_PASS
            },
            testGeneral2(){
                this.model.email = 'ippan_b@aaa.com'
                this.model.password = process.env.MIX_TEST_USER_GENERAL2_PASS
            },
            testCreator(){
                this.model.email = 'creater_a@test.com'
                this.model.password = process.env.MIX_TEST_USER_CREATOR1_PASS
            },
            testCreator2(){
                this.model.email = 'creater_c@test.com'
                this.model.password = process.env.MIX_TEST_USER_CREATOR2_PASS
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