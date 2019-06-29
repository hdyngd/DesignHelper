<template>
    <div>
        <md-dialog :md-active.sync="active">
            <md-dialog-title>ShoppingCart</md-dialog-title>
            <div>
                <md-card v-for="(item, index) in cartList" :key="item.id">
                    <md-card-header>
                        <md-card-media>
                            <img src="/images/menu/nouka_ase_fuku.png">
                        </md-card-media>

                        <md-card-header-text>
                            <div class="md-title">{{ item.name }}</div>
                            <div class="md-subhead">{{ item.description }}</div>
                        </md-card-header-text>
                        <md-card-content>¥ {{item.price}}</md-card-content>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-icon-button" @click="amountCounter(index, -1)">
                            <md-icon>exposure_neg_1</md-icon>
                        </md-button>
                        <md-field>
                            <md-input v-model="item.amount" type="number" readonly></md-input>
                        </md-field>
                        <md-button class="md-icon-button" @click="amountCounter(index, 1)">
                            <md-icon>exposure_plus_1</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card>
            </div>
            <md-dialog-actions>
                <md-field>
                    <span class="md-prefix">¥ </span>
                    <md-input v-model="totalPrice" readonly></md-input>
                </md-field>
                <md-button class="md-primary" @click="active = false">Confirm</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    export default {
        name: "ShoppingCart",
        data: () => ({
            active: false,
            value: null,
            cartList: state.cart,
        }),
        computed: {
          totalPrice: function() {
              let total = 0;
              for (let i in this.cartList) {
                  total += this.cartList[i].price * this.cartList[i].amount;
              }
              return total;
          }
        },
        mounted() {
            Bus.$on('showShoppingCart', () => {
                this.active = true;
                //console.log(this.cartList);
                //this.setData(categoryId.id);
            });
        },
        methods: {
            setData(id) {
                axios.get('/api/menu/get/'+id)
                    .then(response => {
                        this.category = response.data.category
                        this.menus = response.data.menus
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            amountCounter(index, operator) {
                // マイナスにはしない
                if(this.cartList[index].amount + operator < 0) {
                    this.cartList[index].amount = 0;
                    return;
                }

                this.cartList[index].amount += operator;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }

    .md-field {
        width: 10%;
    }

</style>