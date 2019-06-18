<template>
    <div>
        <md-toolbar md-elevation="1">
            <h3 class="md-title" style="flex: 1"><router-link to="/home">DesignHelper</router-link></h3>

            <div class="md-toolbar-section-end">
                <md-button>
                    <router-link to="/user">{{ user.name }}</router-link>
                </md-button>
                <md-badge :md-content="cartList.length">
                    <md-button class="md-icon-button" @click="show">
                        <md-icon>shopping_cart</md-icon>
                    </md-button>
                </md-badge>

                <md-button class="md-icon-button" @click="showSidepanel = true">
                    <md-icon>more_vert</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <md-drawer class="md-right" :md-active.sync="showSidepanel">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Menu</span>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-button @click="showSidepanel = false">
                        <router-link to="/login">LOGIN</router-link>
                    </md-button>
                </md-list-item>

                <md-list-item>
                    <md-button @click="logout" class="md-primary">LOGOUT</md-button>
                </md-list-item>

                <md-list-item>
                    <md-button @click="showSidepanel = false">
                        <router-link to="/admin/dash_board/user">ADMIN</router-link>
                    </md-button>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>
    export default {
        data: () => ({
            cartList: state.cart,
            showSidepanel: false,
            user: state.user
        }),
        methods: {
            logout() {
                axios.post('/api/logout').then(res => {
                    this.removeToken();
                    this.$router.push({path: '/login'});
                    this.showSidepanel = false;
                    this.removeUser();
                }).catch(error => {
                    this.removeToken();
                });
            },
            show() {
                console.log(this.cartList);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-drawer {
        width: 150px;
        max-width: calc(100vw - 125px);
    }
</style>