<template>
    <div>
        <p v-show="isError">認証に失敗しました。</p>
        <form @submit.prevent="login">
            <h1>ログイン</h1>
            メールアドレス: <input type="email" v-model="email">
            パスワード: <input type="password" v-model="password">
            Remember Me: <input type="checkbox" name="remember" v-model="remember">
            <button type="submit" class="btn btn-primary">ログイン</button>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isError: false,
                email: '',
                password: '',
                remember: '',
            }
        },
        methods: {
            login() {
                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    const token = res.data.access_token;
                    console.log(res.data);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    state.isLogin = true;
                    this.$router.push({path: '/'});
                }).catch(error => {
                    this.isError = true;
                });
            }
        }
    }
</script>