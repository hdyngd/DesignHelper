<template>
    <div>
        <p v-show="isError">認証に失敗しました。</p>
        <form @submit.prevent="login">
            <h1>ログイン</h1>
            メールアドレス: <input type="email" v-model="email">
            パスワード: <input type="password" v-model="password">
            <button type="submit" class="btn btn-primary">ログイン</button>
        </form>
        <div>お試しユーザ1</div>
            <p>admin@example.com password</p>
        <div>お試しユーザ2</div>
            <p>test@aaa.com !fwxo!fs</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isError: false,
                email: '',
                password: '',
            }
        },
        methods: {
            login() {
                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    this.setToken('Bearer ' + res.data.access_token);
                    this.$router.push({path: '/home'});
                }).catch(error => {
                    this.isError = true;
                });
            },


        }
    }
</script>