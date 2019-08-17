<template>
    <div>
        <progress-steps></progress-steps>
        <chat></chat>
    </div>
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