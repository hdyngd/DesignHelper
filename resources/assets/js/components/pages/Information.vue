<template>
    <el-col :span="20" :offset="2">
        <el-card class="box-card">
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
                        prop="displayTime"
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
        </el-card>
    </el-col>
</template>

<script>
    export default {
        props: {
            informations: Array,
        },
        // mounted() {
        //     let date = Moment.tz("2019-10-3 20:34:15", "Asia/Tokyo")
        //     console.log(date.format());
        // },
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