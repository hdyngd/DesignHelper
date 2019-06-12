<template>
    <div>
        <md-tabs md-sync-route>
            <md-tab id="tab-user" md-label="User" to="/admin/dash_board/user" exact>
                <user-list></user-list>
            </md-tab>

            <md-tab id="tab-category" md-label="Category" to="/admin/dash_board/category" exact>
                <category-list></category-list>
            </md-tab>

            <md-tab id="tab-menu" md-label="Menu" to="/admin/dash_board/menu" exact>
                <menu-list></menu-list>
            </md-tab>

            <md-tab id="tab-proposition" md-label="Proposition" to="/admin/dash_board/proposition" exact>
                <proposition-list></proposition-list>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
    import CategoryList from "./CategoryList";
    export default {
        name: "ListHeader",
        components: {CategoryList}
    }
</script>

<style scoped>

</style>