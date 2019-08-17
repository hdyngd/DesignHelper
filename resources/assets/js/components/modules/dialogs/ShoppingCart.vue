<template>
    <el-dialog
            title="Shopping Cart"
            :visible.sync="shoppingCartVisible"
            width="80%"
            :before-close="closeCart">

        <el-col :span="12" v-for="(item, index) in cart" :key="item.id">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                </div>
                <div class="text item">
                    <div>
                        <el-image
                                style="width: 100px; height: 100px"
                                src="https://4.bp.blogspot.com/-Xce-5TfWV2E/XDXcmL1iOzI/AAAAAAABRLQ/RlZsBIYJvRUisHAZ1XnvbCiEgNQceq9LACLcBGAs/s800/pose_ukkari_man.png"
                                fit="fill"></el-image>
                    </div>
                    <div>{{item.description}}</div>
                    <div>¥ {{item.price}}</div>
                </div>
                <div class="bottom clearfix">
                    <el-input-number style="float: right;" v-model="item.amount" :min="0" :max="100"></el-input-number>
                </div>
            </el-card>
        </el-col>

        <span slot="footer" class="dialog-footer">
            <el-input class="el-input" placeholder="0" v-model="totalPrice" :disabled="true">
                <template slot="prepend">Total : ¥</template>
            </el-input>
            <el-button @click="closeCart">Cancel</el-button>
            <el-button type="primary" @click="confirmOrder">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "ShoppingCart",
        props: {
            cart: Array,
            shoppingCartVisible: Boolean,
            toggleShoppingCart: Function,
            storeProposition: Function,
        },
        computed: {
            totalPrice: function() {
                let total = 0;
                for (let i in this.cart) {
                    total += this.cart[i].price * this.cart[i].amount;
                }
                return total;
            }
        },
        // data() {
        //     return {
        //         amounts: 0,
        //     };
        // },
        // created() {
        //     for (let key in this.cart) {
        //         this.amounts[key] = this.cart[key].amount
        //     }
        // },
        methods:{
            closeCart() {
                this.toggleShoppingCart(false)
            },
            confirmOrder() {
                if(confirm('この内容で発注してよろしいですか？')) {
                    this.storeProposition(this.cart)
                        .then(() => {
                            this.toggleShoppingCart(false)
                        })
                        .catch(() => {});
                    // for(let key in this.cart) {
                    //     this.cart[key].amount = this.amounts[key];
                    // }
                }
            },
            // handleChange(event) {
            //     console.log(event);
            // }
        },
    }
</script>

<style scoped>
    .box-card {
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .el-input {
        width: 220px;
    }
</style>