<template>
    <el-card class="box-card">
        <el-table
                :data="propositions.filter(data => !search || data.menuName.toLowerCase().includes(search.toLowerCase()))"
                height="500"
                style="width: 100%"
                :default-sort = "{prop: 'id', order: 'ascending'}">
            <el-table-column
                    label="ID"
                    prop="id"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Menu"
                    prop="menuName"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Amount"
                    prop="amount"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Orderer"
                    prop="clientName"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Creator"
                    prop="designerName"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="Progress"
                    prop="progressName"
                    sortable>
            </el-table-column>
            <el-table-column
                    label="OrderDate"
                    prop="created_at"
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
                            @click="handleEdit(scope.$index, scope.row)">Attach</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            propositions: Array
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>