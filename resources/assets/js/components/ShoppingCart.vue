<template>
    <div>
        <md-dialog :md-active.sync="active">
            <md-dialog-title>ShoppingCart</md-dialog-title>
            <div>
                <md-card>
                    <md-card-header>
                        <md-card-media>
                            <img src="/images/menu/nouka_ase_fuku.png">
                        </md-card-media>

                        <md-card-header-text>
                            <div class="md-title">test title</div>
                            <div class="md-subhead">subhead</div>
                        </md-card-header-text>
                        <md-card-content>¥ 1200</md-card-content>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-icon-button">
                            <md-icon>add_shopping_cart</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card>
                <md-card>
                    <md-card-header>
                        <md-card-media>
                            <img src="/images/menu/nouka_ase_fuku.png">
                        </md-card-media>

                        <md-card-header-text>
                            <div class="md-title">test title</div>
                            <div class="md-subhead">subhead</div>
                        </md-card-header-text>
                        <md-card-content>¥ 1200</md-card-content>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-icon-button">
                            <md-icon>add_shopping_cart</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card>
                <md-card>
                    <md-card-header>
                        <md-card-media>
                            <img src="/images/menu/nouka_ase_fuku.png">
                        </md-card-media>

                        <md-card-header-text>
                            <div class="md-title">test title</div>
                            <div class="md-subhead">subhead</div>
                        </md-card-header-text>
                        <md-card-content>¥ 1200</md-card-content>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-icon-button">
                            <md-icon>add_shopping_cart</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card>
                <md-card>
                    <md-card-header>
                        <md-card-media>
                            <img src="/images/menu/nouka_ase_fuku.png">
                        </md-card-media>

                        <md-card-header-text>
                            <div class="md-title">test title</div>
                            <div class="md-subhead">subhead</div>
                        </md-card-header-text>
                        <md-card-content>¥ 1200</md-card-content>
                    </md-card-header>

                    <md-card-actions>
                        <md-button class="md-icon-button" @click="amount--">
                            <md-icon>exposure_neg_1</md-icon>
                        </md-button>
                        <md-field>
                            <md-input v-model="amount" type="number" readonly></md-input>
                        </md-field>
                        <md-button class="md-icon-button" @click="amount++">
                            <md-icon>exposure_plus_1</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card>
            </div>
<!--            <md-tabs md-dynamic-height>-->
<!--                <md-tab md-label="General">-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                </md-tab>-->

<!--                <md-tab md-label="Activity">-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                </md-tab>-->

<!--                <md-tab md-label="Account">-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>-->
<!--                </md-tab>-->
<!--            </md-tabs>-->
            <md-dialog-actions>
                <md-field>
                    <span class="md-prefix">¥ </span>
                    <md-input v-model="total" readonly></md-input>
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
            amount: 1,
            total: 3000
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