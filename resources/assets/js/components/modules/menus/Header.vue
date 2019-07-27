<template>
    <el-menu mode="horizontal">
        <el-row>
            <el-col :span="3">
                <el-menu-item index="1"><router-link to="/">Design Helper</router-link></el-menu-item>
            </el-col>
            <template v-if="user.name">
                <el-col :span="2" :offset="17">
                    <el-menu-item index="3">
                        <router-link to="/profile">
                            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                            {{ user.name }}
                        </router-link>
                    </el-menu-item>
                </el-col>
                <el-col :span="2">
                    <el-submenu index="2">
                        <template slot="title"><i class="fas fa-bars"></i></template>
                        <el-menu-item index="2-1">
                            <router-link to="/admin">管理画面</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link to="/proposition">案件管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-3" @click="onLogout()">
                            ログアウト
                        </el-menu-item>
                    </el-submenu>
                </el-col>
            </template>
        </el-row>
    </el-menu>
</template>

<script>
    export default {
        name: "Header",
        props: {
            user: Object,
            logout: Function
        },
        methods: {
            onLogout() {
                this.logout();
            }
        }
    }
</script>

<style>

</style>