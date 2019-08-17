<template>
    <chat></chat>
</template>

<script>
    export default {
        props: {
            proposition: Object
        },
        created() {
            console.log(this.proposition);
        }
    }
</script>

<style scoped>

</style>