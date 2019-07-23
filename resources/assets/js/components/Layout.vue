<template>
    <div>
<!--        <header-workroom v-if="isWorkroom"></header-workroom>-->
<!--        <header-cenq v-else></header-cenq>-->
        <div>
<!--            <loading/>-->
            <router-view></router-view>
        </div>
<!--        <footer-cenq v-if="!isWorkroom"></footer-cenq>-->
    </div>
</template>
<script>
export default {
}
</script>