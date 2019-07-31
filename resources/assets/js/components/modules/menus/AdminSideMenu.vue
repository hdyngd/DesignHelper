<template>
    <el-menu
            default-active="1"
    >
        <el-menu-item index="1">
            <i class="fas fa-th-list"></i>
            <router-link to="/admin/dash_board">ダッシュボード</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="fas fa-user-plus"></i>
            <router-link to="/admin/regist_user">ユーザ登録</router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="fas fa-folder-plus"></i>
            <router-link to="/admin/add_category">カテゴリ追加</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="fas fa-file-medical"></i>
            <router-link to="/admin/add_menu">メニュー追加</router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "AdminSideMenu",
    }
</script>

<style scoped>

</style>