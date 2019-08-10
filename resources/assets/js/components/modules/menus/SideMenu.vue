<template>
    <el-menu>
        <el-menu-item v-for="item in categories" :key="item.id">
            <i class="fas fa-th-list"></i>
            <router-link :to="'/home/category/' + item.id">{{ item.name }}</router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        props: {
            categories: Array,
        },
    }
</script>

<style scoped>

</style>