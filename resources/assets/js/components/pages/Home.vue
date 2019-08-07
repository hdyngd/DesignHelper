<template>
    <el-main>
        <el-col :span="6">
            <dh-side-menu :categories="categories"></dh-side-menu>
        </el-col>
        <el-col :span="17" :offset="1">
            <dh-description v-if="isHome"></dh-description>
            <router-view></router-view>
        </el-col>
    </el-main>
</template>

<script>
    export default {
        props:{
            categories: Array,
        },
        data: () => ({
            isHome: location.pathname === "/home" || location.pathname === "/"
        }),
    }
</script>

<style>

</style>