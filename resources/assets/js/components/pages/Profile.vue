<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-card>
                <div slot="header" class="clearfix">
<!--                    <i class="el-icon-close" style="float: right; padding: 3px 0"><el-button @click="handleBack()"></el-button></i>-->
                    <el-button style="float: right; padding: 3px 0" type="info" icon="el-icon-close" @click="handleBack()"></el-button>
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
        methods: {
            handleBack() {
                router.push('/');
            }

        }

    }
</script>

<style scoped>

</style>