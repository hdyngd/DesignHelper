<template>
    <div>
        <md-dialog-prompt
                :md-active.sync="active"
                v-model="value"
                md-title="What's your name?"
                md-input-maxlength="30"
                md-input-placeholder="Type your name..."
                md-confirm-text="Done" />
    </div>
</template>

<script>
    export default {
        name: "ShoppingCart",
        data: () => ({
            active: false,
            value: null,
            cartList: state.cart
        }),
        mounted() {
            Bus.$on('showShoppingCart', () => {
                this.active = true;
                console.log(this.cartList);
                //this.setData(categoryId.id);
            });
        }
    }
</script>

<style scoped>

</style>