<template>
    <div>
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
    </div>
</template>

<script>

    export default {
        data: () => ({
            category: [],
            menus: [],
        }),
        beforeRouteUpdate (to, from, next) {
            this.setData(to.params.id);
            next();
        },
        created() {
            this.setData(this.$route.params.id);
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
            addShoppingCart(id) {
                this.addCart(id);
                this.$toasted.global.addCart();

            }
        }

    }
</script>

<style lang="scss" scoped>
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