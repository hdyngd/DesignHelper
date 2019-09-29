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
                    <el-button style="float: right; padding: 3px 0" type="danger" icon="el-icon-close" @click="handleDeleteItem(index)"></el-button>
                </div>
                <div class="text item">
                    <div>
                        <el-image
                                v-if="item.image"
                                style="width: 100px; height: 100px"
                                :src="item.image"
                                fit="fill"/>
                        <el-image
                                v-else
                                style="width: 100px; height: 100px"
                                src="https://design-helper.s3-ap-northeast-1.amazonaws.com/menu/picture_icon.png"
                                fit="fill"/>
                    </div>
                    <div>{{item.description}}</div>
                    <div>¥ {{item.price}}</div>
                </div>
                <div class="bottom clearfix">
                    <el-input-number style="float: right;" v-model="amounts[index]" :min="0" :max="100"></el-input-number>
                </div>
            </el-card>
        </el-col>

        <span slot="footer" class="dialog-footer">
            <el-input class="el-input" v-model="totalPrice" placeholder="0" :disabled="true">
                <template slot="prepend">Total : ¥</template>
            </el-input>
            <el-button @click="closeCart">Cancel</el-button>
            <el-button v-if="creditToken" type="primary" @click="confirmOrder">確認</el-button>
            <el-button v-else type="primary" @click="doPurchase">クレジットカード情報入力</el-button>
            <form id="mainform">
                <input id="tkn" name="tkn" type="hidden" value="">
                <div id="CARD_INPUT_FORM" />
<!--                <el-button type="primary" @click="doPurchase()">クレジットテスト</el-button>-->
            </form>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "ShoppingCart",
        props: {
            cart: Array,
            amounts: Array,
            creditToken: String,
            shoppingCartVisible: Boolean,
            toggleShoppingCart: Function,
            storeProposition: Function,
            deleteItem: Function,
            saveShoppingCart: Function,
        },
        mounted() {
            if(this.creditToken) history.replaceState('','','/home');
        },
        computed: {
            totalPrice: function() {
                let total = 0;
                for (let i in this.amounts) {
                    total += this.cart[i].price * this.amounts[i];
                }
                return total;
            }
        },
        methods:{
            closeCart() {
                this.toggleShoppingCart(false)
            },
            confirmOrder() {
                
                if(confirm('この内容で発注してよろしいですか？')) {
                    for (let i in this.cart) {
                        this.cart[i].amount = this.amounts[i];
                    }

                    this.storeProposition(this.cart)
                        .then(() => {
                            this.toggleShoppingCart(false)
                        })
                        .catch(() => {});
                }
            },
            handleDeleteItem(index){
                this.deleteItem(index);
                // console.log(index);
            },

            // クレジット関係
            doPurchase() {

                CPToken.CardInfo (
                    {
                        aid: process.env.MIX_ROBOTPAYMENT_AID
                    },
                    this.execPurchase
                );
            },
            execPurchase(resultCode, errMsg) {
                if (resultCode != "Success") {
                // 戻り値がSuccess以外の場合はエラーメッセージを表示
                window.alert(errMsg);
                } else {
                    history.replaceState('','','/home');
                    this.saveShoppingCart().then(() => {
                        // スクリプトからフォームをsubmit
                        $("#mainform").submit();
                    });
                }
            },
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