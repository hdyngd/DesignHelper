<template>
    <el-card class="box-card">
        <el-table
                :data="informations.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                height="500"
                style="width: 100%"
                :default-sort = "{prop: 'id', order: 'ascending'}">
            <el-table-column
                    label="ID"
                    prop="id"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Title"
                    prop="title"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="LastModifiedDate"
                    prop="updated_at"
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
                title="お知らせ編集"
                :visible.sync="dialogEditInformation"
                :before-close="handleClose"
                width="80%">
            <edit-information></edit-information>
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
            informations: Array,
            dialogEditInformation: Boolean,
            fetchEditInformation: Function,
            toggleDialogEditInformation: Function,
            deleteInformation: Function,
        },
        methods: {
            handleEdit(index, row) {
                this.fetchEditInformation(row.id)
                    .then(() => {
                        this.toggleDialogEditInformation(true)
                    })
                    .catch(() => {})
            },
            handleDelete(index, row) {
                if(confirm('削除してよろしいですか？')) {
                    this.deleteInformation(row.id)
                }
            },
            handleClose() {
                this.toggleDialogEditInformation(false)
            }
        },
    }
</script>