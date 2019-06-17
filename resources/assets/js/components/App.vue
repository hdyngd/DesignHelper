<template>
    <div>
        <toolbar></toolbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created () {
          this.getToken();
        },
    }
</script>