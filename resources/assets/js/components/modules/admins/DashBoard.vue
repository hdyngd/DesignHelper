<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="User" name="User">
            <user-list
                :users="users"
                :fetch-edit-user="fetchEditUser"
                :dialog-edit-user="dialogEditUser"
                :toggle-dialog-edit-user="toggleDialogEditUser"
                :delete-user="deleteUser"
            ></user-list>
        </el-tab-pane>
        <el-tab-pane label="Category" name="Category">
            <category-list
                :categories="categories"
                :dialog-edit-category="dialogEditCategory"
                :toggle-dialog-edit-category="toggleDialogEditCategory"
                :delete-category="deleteCategory"
                :fetch-edit-category="fetchEditCategory"
            ></category-list>
        </el-tab-pane>
        <el-tab-pane label="Menu" name="Menu">
            <menu-list
                :menus="menus"
                :dialog-edit-menu="dialogEditMenu"
                :toggle-dialog-edit-menu="toggleDialogEditMenu"
                :delete-menu="deleteMenu"
                :fetch-edit-menu="fetchEditMenu"
            ></menu-list>
        </el-tab-pane>
        <el-tab-pane label="Proposition" name="Proposition">
            <proposition-list
                :propositions="propositions"
                :attach-creator-visible="attachCreatorVisible"
                :toggle-attach-creator="toggleAttachCreator"
                :creators="creators"
                :attach-creator="attachCreator"
                :fetch-edit-user="fetchEditUser"
                ></proposition-list>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        props: {
            users: Array,
            dialogEditUser: Boolean,
            categories: Array,
            dialogEditCategory: Boolean,
            menus: Array,
            dialogEditMenu: Boolean,
            propositions: Array,
            creators: Array,
            attachCreatorVisible: Boolean,
            toggleAttachCreator: Function,
            attachCreator: Function,
            fetchEditUser: Function,
            toggleDialogEditUser: Function,
            deleteUser: Function,
            fetchEditCategory: Function,
            toggleDialogEditCategory: Function,
            deleteCategory: Function,
            fetchEditMenu: Function,
            toggleDialogEditMenu: Function,
            deleteMenu: Function,
        },
        data() {
            return {
                activeName: 'User'
            };
        },
    };
</script>