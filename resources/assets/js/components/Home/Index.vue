<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed">

            <md-app-drawer md-permanent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    注文メニュー
                </md-toolbar>

                <md-list>
                    <md-list-item v-for="item in categories" :key="item.id">
<!--                        <md-icon>dashboard</md-icon>-->
<!--                        <span class="md-list-item-text"><router-link :to="'/home/category/' + item.id">{{ item.name }} {{ item.id }}</router-link></span>-->
                        <md-button @click="showDialog(item.id)">{{ item.name }}</md-button>

                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
<!--                <router-view></router-view>-->
            </md-app-content>

        </md-app>
        <category-dialog
            :show-dialog="false"
        ></category-dialog>
<!--        <md-dialog :md-active.sync="showDialog">-->
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
<!--                <md-button class="md-primary" @click="showDialog = false">Close</md-button>-->
<!--                <md-button class="md-primary" @click="showDialog = false">Save</md-button>-->
<!--            </md-dialog-actions>-->
<!--        </md-dialog>-->
    </div>
</template>

<script>
    export default {
        data: () => ({
          categories: [],
        }),
        created() {
            axios.get('/api/category/get')
                .then(response => {
                   this.categories = response.data

                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            showDialog(id) {
                Bus.$emit('showDialog', {id: id});
            }
        }
    }
</script>

<style lang="scss">
    .md-app {
        max-height: 800px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    /*.md-dialog {*/
    /*    max-width: 768px;*/
    /*}*/
</style>