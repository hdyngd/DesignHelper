<template>
    <el-table
            :data="informations"
            style="width:640px;">
        <el-table-column
                fixed
                prop="title"
                label="タイトル"
                width="300">
        </el-table-column>
        <el-table-column
                prop="updated_at"
                label="更新日"
                width="220">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="Operations"
                width="120">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">詳細</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props: {
            informations: Array,
        },
        data() {
            return {
                activeNames: []
            };
        },
        methods: {
            handleClick(index, row) {
                router.push('/information/'+row.id);
            }
        }
    }
</script>