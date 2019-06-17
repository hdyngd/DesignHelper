<template>
    <div>
<!--        <ul>-->
<!--            <li><router-link to="/home">ホーム</router-link></li>-->
<!--            <li><router-link to="/login">ログイン</router-link></li>-->
<!--            <li><router-link to="/user">ユーザー情報</router-link></li>-->
<!--            <li><router-link to="/admin/dash_board/user">管理画面</router-link></li>-->
<!--            <li @click="logout"><button>ログアウト</button></li>-->
<!--        </ul>-->
        <toolbar></toolbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created () {
          this.getToken();
        },

    }
</script>