<template>
    <el-card class="box-card">
        <el-table
                :data="categories.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                    label="Description"
                    prop="description"
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
            title="カテゴリ編集"
            :visible.sync="dialogEditCategory"
            :before-close="handleClose">

            <edit-category></edit-category>
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
            categories: Array,
            dialogEditCategory: Boolean,
            fetchEditCategory: Function,
            toggleDialogEditCategory: Function,
            deleteCategory: Function,
        },
        methods: {
            handleEdit(index, row) {
                this.fetchEditCategory(row.id)
                    .then(() => {
                        this.toggleDialogEditCategory(true)
                    })
                    .catch(() => {})
            },
            handleDelete(index, row) {
                if(confirm('削除してよろしいですか？')) {
                    this.deleteCategory(row.id)
                }
            },
            handleClose() {
                this.toggleDialogEditCategory(false)
            }
        },
    }
</script>