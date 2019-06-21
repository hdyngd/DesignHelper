<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed">

            <md-app-drawer md-permanent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    注文メニュー
                </md-toolbar>

                <md-list>
                    <md-list-item v-for="item in categories" :key="item.id">
                        <md-icon>dashboard</md-icon>
                        <span class="md-list-item-text"><router-link :to="'/home/category/' + item.id">{{ item.name }} {{ item.id }}</router-link></span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <description v-if="isHome"></description>
                <router-view></router-view>
            </md-app-content>

        </md-app>
    </div>
</template>

<script>
    export default {
        beforeRouteUpdate (to, from, next) {
            this.isHome = to.path === "/home"
            next()
        },
        data: () => ({
            categories: [],
            isHome: location.pathname === "/home"
        }),
        created() {
            axios.get('/api/category/get')
                .then(response => {
                   this.categories = response.data

                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            showDialog(id) {
                Bus.$emit('showDialog', {id: id});
            }
        }
    }
</script>

<style lang="scss">
    .md-app {
        max-height: 800px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>