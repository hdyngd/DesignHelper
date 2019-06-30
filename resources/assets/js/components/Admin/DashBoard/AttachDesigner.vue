<template>
    <div>
        <md-dialog :md-active.sync="active">
            <div class="md-layout-item">
                <md-field>
                    <label for="creator">Who is the creator?</label>
                    <md-select v-model="creator" name="creator" id="creator">
                        <md-option v-for="item in creators" :value="item.id" :key="item.id">{{ item.name }}</md-option>
                    </md-select>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="attach">Attach</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
    export default {
        data: () => ({
            active: false,
            proposition: null,
            creators: [],
            creator: '',

        }),
        created() {
            axios.get('/api/user/getCreator')
                .then(response => {
                    this.creators = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        mounted() {
            Bus.$on('showAttachDesigner', (data) => {

                // デザイナーアタッチ済みは無視する
                if(data.proposition.progress !== '未着手') return;

                this.proposition = data.proposition;
                this.active = true;
            });
        },
        methods: {
            attach() {
                let params = {
                    proposition_id: this.proposition.id,
                    designer_id: this.creator
                }
                axios.post('/api/proposition/attachCreator', params)
                    .then(response => {
                        this.$toasted.global.attachCreator();
                        Bus.$emit('setPropositions');
                        this.active = false;
                    })
                    .catch(error => {
                        for (let index in error.response.data.errors) {
                            this.$toasted.global.error({
                                message: error.response.data.errors[index]
                            });
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>