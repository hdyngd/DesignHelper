<template>
    <div>
        <ul>
            <li><router-link to="/">ホーム</router-link></li>
            <li><router-link to="/login">ログイン</router-link></li>
            <li><router-link to="/user">ユーザー情報</router-link></li>
            <li><router-link to="/admin">管理画面</router-link></li>
            <li @click="logout"><button>ログアウト</button></li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                axios.post('/api/logout').then(res => {
                    axios.defaults.headers.common['Authorization'] = '';
                    state.isLogin = false;
                    this.$router.push({path: '/'});
                });
            }
        }
    }
</script>