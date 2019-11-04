<template>
    <el-menu mode="horizontal" class="main_menu">
        <el-row>
            <el-col :span="3">
                <el-menu-item index="1"><router-link to="/">Design Helper</router-link></el-menu-item>
            </el-col>

            <template v-if="user !== null && 'name' in user">

                <el-col v-if="user.role === 2" :span="1" :offset="14">
                    <el-menu-item index="4">
                        <el-badge :value="cart.length" class="item">
                            <el-button type="text" class="button" @click="openCart"><i class="fas fa-shopping-cart"></i></el-button>
                        </el-badge>
                    </el-menu-item>
                </el-col>

                <el-col v-else :span="15"><div>&nbsp;</div></el-col>

                <el-col :span="4">
                    <el-menu-item index="3">
                        <router-link to="/profile">
                            <el-avatar v-if="user.thumbnail" size="small" :src="user.thumbnail"></el-avatar>
                            <el-avatar v-else size="small" src="https://design-helper.s3-ap-northeast-1.amazonaws.com/profile/profile_default.png"></el-avatar>
                            {{ user.name }}
                        </router-link>
                    </el-menu-item>
                </el-col>

                <el-col :span="2">
                    <el-submenu index="2">
                        <template slot="title"><i class="fas fa-bars"></i></template>
                        <el-menu-item v-if="user.role === 0" index="2-1">
                            <router-link to="/admin/dash_board">管理画面</router-link>
                        </el-menu-item>
                        <el-menu-item v-if="user.role === 1 || user.role === 2" index="2-2">
                            <router-link to="/propositions">案件管理</router-link>
                        </el-menu-item>
                        <el-menu-item v-if="user.role === 1 || user.role === 2" index="2-3">
                            <router-link to="/information">ニュース</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-4" @click="onLogout()">
                            ログアウト
                        </el-menu-item>
                    </el-submenu>
                </el-col>
            </template>
            <template v-else>
                <el-col :offset="15" :span="3">
                    <el-menu-item index="2"><router-link to="/login">ログイン</router-link></el-menu-item>
                </el-col>
                <el-col :span="3">
                    <el-menu-item index="3"><router-link to="/signup">新規登録</router-link></el-menu-item>
                </el-col>
            </template>
        </el-row>
        <shopping-cart></shopping-cart>
    </el-menu>
</template>

<script>
    export default {
        name: "Header",
        props: {
            user: Object,
            cart: Array,
            logout: Function,
            toggleShoppingCart: Function,
        },
        data() {
            return {
                // dialogVisible: false
            };
        },
        methods: {
            onLogout() {
                this.logout();
            },
            openCart() {
                this.toggleShoppingCart(true)
                //console.log(this.cart);
            }
        }
    }
</script>

<style>

</style>