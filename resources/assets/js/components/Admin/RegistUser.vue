<template>
    <div>
        <b-card bg-variant="light">
            <b-form-group
                    label-cols-lg="3"
                    label="ユーザ登録"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
            >
                <b-form-group
                        label-cols-sm="3"
                        label="ユーザ名:"
                        label-align-sm="right"
                        label-for="user-name"
                >
                    <b-form-input id="user-name" type="text" v-model="name"></b-form-input>
                </b-form-group>

                <b-form-group
                        label-cols-sm="3"
                        label="EMail:"
                        label-align-sm="right"
                        label-for="email"
                >
                    <b-form-input id="email" type="email" v-model="email"></b-form-input>
                </b-form-group>

                <b-form-group
                        label-cols-sm="3"
                        label="ロール:"
                        label-align-sm="right" class="mb-0"
                >
                    <b-form-radio v-model="selected" value="2">一般ユーザー</b-form-radio>
                    <b-form-radio v-model="selected" value="1">クリエイター</b-form-radio>
                    <b-form-radio v-model="selected" value="0">管理者</b-form-radio>
                </b-form-group>
                <b-button variant="primary" @click="createUser">登録</b-button>
            </b-form-group>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                selected: '2'
            }
        },
        methods: {
            createUser() {
                let params = {
                    name: this.name,
                    email: this.email,
                    role: this.selected
                }
                this.$http.post('api/user', params)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>