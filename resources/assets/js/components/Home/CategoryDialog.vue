<template>
    <div>
        <md-dialog :md-active.sync="boolShowDialog">
            <md-dialog-title>Preferences</md-dialog-title>

            <md-tabs md-dynamic-height>
                <md-tab md-label="General">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                </md-tab>

                <md-tab md-label="Activity">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                </md-tab>

                <md-tab md-label="Account">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
                </md-tab>
            </md-tabs>

            <md-dialog-actions>
                <md-button class="md-primary" @click="boolShowDialog = false">Close</md-button>
                <md-button class="md-primary" @click="boolShowDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    export default {
        props: ['showDialog'],
        data: () => ({
            boolShowDialog: this.showDialog
        }),
        mounted() {
            Bus.$on('showDialog', (id) => {
                this.boolShowDialog = true;
                console.log(id.id);
            });
        }
    }
</script>

<style lang="scss" scoped>
    .md-dialog {
        /*max-width: 768px;*/
        max-width: 1024px;
    }
</style>