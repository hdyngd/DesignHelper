<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="User" name="User">
            <user-list :users="users"></user-list>
        </el-tab-pane>
        <el-tab-pane label="Category" name="Category">
            <category-list></category-list>
        </el-tab-pane>
        <el-tab-pane label="Menu" name="Menu">
            <menu-list></menu-list>
        </el-tab-pane>
        <el-tab-pane label="Proposition" name="Proposition">
            <proposition-list></proposition-list>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        props: {
            users: Array
        },
        data() {
            return {
                activeName: 'User'
            };
        },
    };
</script>