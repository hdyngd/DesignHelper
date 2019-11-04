<template>
    <el-main>
        <el-col :span="6" class="sub_menu">
            <dh-side-menu :categories="categories" :isTop="isTop"></dh-side-menu>
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
            isHome: Boolean,
            isTop: Boolean,
        },
    }
</script>

<style>

</style>