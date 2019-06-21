<template>
<!--    <div>-->
<!--        <md-dialog :md-active.sync="boolShowDialog">-->
<!--            <md-dialog-title>Preferences</md-dialog-title>-->

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

<!--            <md-dialog-actions>-->
<!--                <md-button class="md-primary" @click="boolShowDialog = false">Close</md-button>-->
<!--                <md-button class="md-primary" @click="boolShowDialog = false">Save</md-button>-->
<!--            </md-dialog-actions>-->
<!--        </md-dialog>-->
<!--    </div>-->
    <div>
        <md-dialog :md-active.sync="boolShowDialog">
            <md-content>
                <span class="md-display-3">{{ this.category.name }}</span>
                <span class="md-display-1">{{ this.category.description }}</span>
            </md-content>

            <hr>

            <md-card v-for="item in this.menus" :key="item.id">
                <md-card-header>
                    <md-card-media>
                        <img src="/images/menu/nouka_ase_fuku.png">
                    </md-card-media>

                    <md-card-header-text>
                        <div class="md-title">{{item.name}}</div>
                        <div class="md-subhead">{{item.description}}</div>
                    </md-card-header-text>
                    <md-card-content>¥ {{item.price}}</md-card-content>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-icon-button" @click="addShoppingCart(item.id)">
                        <md-icon>add_shopping_cart</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>
        </md-dialog>
    </div>
</template>

<script>
    export default {
        props: ['showDialog'],
        data: () => ({
            boolShowDialog: this.showDialog,
            category: [],
            menus: [],
        }),
        mounted() {
            Bus.$on('showDialog', (categoryId) => {
                this.boolShowDialog = true;
                this.setData(categoryId.id);
            });
        },
        methods: {
            setData(categoryId) {
                axios.get('/api/menu/get/'+categoryId)
                    .then(response => {
                        this.category = response.data.category
                        this.menus = response.data.menus
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            addShoppingCart(id) {
                this.addCart(id);
                this.$toasted.global.addCart();

            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-dialog {
        /*max-width: 768px;*/
        max-width: 1024px;
    }

    .md-content {
        width: 100%;
        height: 200px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .md-card {
        width: 480px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>