<template>
    <div>
        <md-toolbar md-elevation="1">
            <h3 class="md-title" style="flex: 1"><router-link to="/home">DesignHelper</router-link></h3>
            <md-button>
                <router-link to="/home">HOME</router-link>
            </md-button>

            <md-button>
                <router-link to="/user">PROFILE</router-link>
            </md-button>

            <md-button>
                <router-link to="/admin/dash_board/user">ADMIN</router-link>
            </md-button>

            <md-button>
                <router-link to="/login">LOGIN</router-link>
            </md-button>

            <md-button @click="logout">LOGOUT</md-button>

            <md-button class="md-icon-button">
                <md-icon>shopping_cart</md-icon>
            </md-button>

        </md-toolbar>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                axios.post('/api/logout').then(res => {
                    this.removeToken();
                    this.$router.push({path: '/login'});
                }).catch(error => {
                    this.removeToken();
                });
            }
        }
    }
</script>

<style scoped>

</style>