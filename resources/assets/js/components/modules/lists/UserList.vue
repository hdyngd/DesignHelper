<template>
    <el-card class="box-card">
        <el-table
                :data="users.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                height="500"
                style="width: 100%"
                :default-sort = "{prop: 'id', order: 'ascending'}">
            <el-table-column
                    label="ID"
                    prop="id"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Email"
                    prop="email"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="RoleName"
                    prop="roleName"
                    sortable>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="ユーザー情報編集"
                :visible.sync="dialogEditUser"
                :before-close="handleClose">

            <edit-user
                :admin="true"
            ></edit-user>
        </el-dialog>

    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
            }
        },
        props: {
            users: Array,
            dialogEditUser: Boolean,
            fetchEditUser: Function,
            toggleDialogEditUser: Function,
            deleteUser: Function,
        },
        methods: {
            handleEdit(index, row) {
                this.fetchEditUser(row.id)
                    .then(() => {
                        this.toggleDialogEditUser(true)
                    })
                    .catch(() => {})
            },
            handleDelete(index, row) {
                if(confirm('削除してよろしいですか？')) {
                    this.deleteUser(row.id)
                }
            },
            handleClose() {
                this.toggleDialogEditUser(false)
            }
        },
    }
</script>