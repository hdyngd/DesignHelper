<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="User" name="User">
            <user-list :users="users"></user-list>
        </el-tab-pane>
        <el-tab-pane label="Category" name="Category">
            <category-list :categories="categories"></category-list>
        </el-tab-pane>
        <el-tab-pane label="Menu" name="Menu">
            <menu-list :menus="menus"></menu-list>
        </el-tab-pane>
        <el-tab-pane label="Proposition" name="Proposition">
            <proposition-list
                :propositions="propositions"
                :attach-creator-visible="attachCreatorVisible"
                :toggle-attach-creator="toggleAttachCreator"
                :creators="creators"
                :attach-creator="attachCreator"
                ></proposition-list>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        props: {
            users: Array,
            categories: Array,
            menus: Array,
            propositions: Array,
            creators: Array,
            attachCreatorVisible: Boolean,
            toggleAttachCreator: Function,
            attachCreator: Function,
        },
        data() {
            return {
                activeName: 'User'
            };
        },
    };
</script>