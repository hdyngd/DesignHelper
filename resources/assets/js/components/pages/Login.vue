<template>
    <div>
        <p v-show="isError">認証に失敗しました。</p>
        <form @submit.prevent="login">
            <h1>ログイン</h1>
            メールアドレス: <input type="email" v-model="email">
            パスワード: <input type="password" v-model="password">
            <button type="submit" class="btn btn-primary">ログイン</button>
        </form>
        <div>お試しユーザ1(管理者)</div>
            <p>admin@example.com password</p>

        <div>お試しユーザ2(クリエイター)</div>
            <p>otameshi_creater@example.com xEs%592m</p>

        <div>お試しユーザ3(一般ユーザ)</div>
            <p>otameshi_ippan@example.com RpQ2%SR4</p>

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
                    this.setUser();
                    // this.setPropositions();
                }).catch(error => {
                    this.isError = true;
                });
            },


        }
    }
</script>