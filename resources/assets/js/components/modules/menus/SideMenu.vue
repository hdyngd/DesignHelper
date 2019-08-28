<template>
    <el-menu>
        <el-menu-item v-for="item in categories" :key="item.id">
            <el-image
                    v-if="item.image"
                    style="width: 50px; height: 50px"
                    :src="item.image"
                    fit="fill"/>
            <el-image
                    v-else
                    style="width: 50px; height: 50px"
                    src="https://design-helper.s3-ap-northeast-1.amazonaws.com/menu/picture_icon.png"
                    fit="fill"/>
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