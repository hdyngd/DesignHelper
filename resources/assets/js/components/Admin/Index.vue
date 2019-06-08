<!--<template>-->
<!--    <div>-->
<!--        <admin-side-menu></admin-side-menu>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <span class="md-title"> Design Helper </span>
            </md-app-toolbar>

            <md-app-drawer md-permanent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    管理メニュー
                </md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>person_add</md-icon>
                        <span class="md-list-item-text"><router-link to="/admin/regist_user">ユーザ登録</router-link></span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>create_new_folder</md-icon>
                        <span class="md-list-item-text"><router-link to="/admin/add_category">カテゴリ追加</router-link></span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>note_add</md-icon>
                        <span class="md-list-item-text">メニュー追加</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>group</md-icon>
                        <span class="md-list-item-text">ユーザ一覧</span>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>work</md-icon>
                        <span class="md-list-item-text">案件一覧</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view></router-view>
            </md-app-content>
        </md-app>
    </div>
</template>

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

<script>
    export default {
        name: 'Waterfall',
    }
</script>