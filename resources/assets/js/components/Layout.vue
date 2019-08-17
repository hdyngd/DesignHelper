<template>
<!--<el-container>-->
<!--        <header-workroom v-if="isWorkroom"></header-workroom>-->
<!--        <header-cenq v-else></header-cenq>-->
<!--        <div>-->
<!--            <loading/>-->
    <div v-loading="loading">
        <dh-header></dh-header>
        <router-view></router-view>
    </div>
<!--        </div>-->
<!--        <footer-cenq v-if="!isWorkroom"></footer-cenq>-->
<!--</el-container>-->
</template>
<script>
export default {
    props: {
        loading: Boolean
    }
}
</script>