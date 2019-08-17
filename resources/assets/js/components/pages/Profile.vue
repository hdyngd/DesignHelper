<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-card>
                <div slot="header" class="clearfix">
                    <h3>プロフィール</h3>
                </div>
                <profile-edit-form
                    :admin="false"
                ></profile-edit-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Profile",
    }
</script>

<style scoped>

</style>