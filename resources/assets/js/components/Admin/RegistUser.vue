<!--<template>-->
<!--    <div>-->
<!--        <b-card bg-variant="light">-->
<!--            <b-form-group-->
<!--                    label-cols-lg="3"-->
<!--                    label="ユーザ登録"-->
<!--                    label-size="lg"-->
<!--                    label-class="font-weight-bold pt-0"-->
<!--                    class="mb-0"-->
<!--            >-->
<!--                <b-form-group-->
<!--                        label-cols-sm="3"-->
<!--                        label="ユーザ名:"-->
<!--                        label-align-sm="right"-->
<!--                        label-for="user-name"-->
<!--                >-->
<!--                    <b-form-input id="user-name" type="text" v-model="name"></b-form-input>-->
<!--                </b-form-group>-->

<!--                <b-form-group-->
<!--                        label-cols-sm="3"-->
<!--                        label="EMail:"-->
<!--                        label-align-sm="right"-->
<!--                        label-for="email"-->
<!--                >-->
<!--                    <b-form-input id="email" type="email" v-model="email"></b-form-input>-->
<!--                </b-form-group>-->

<!--                <b-form-group-->
<!--                        label-cols-sm="3"-->
<!--                        label="ロール:"-->
<!--                        label-align-sm="right" class="mb-0"-->
<!--                >-->
<!--                    <b-form-radio v-model="selected" value="2">一般ユーザー</b-form-radio>-->
<!--                    <b-form-radio v-model="selected" value="1">クリエイター</b-form-radio>-->
<!--                    <b-form-radio v-model="selected" value="0">管理者</b-form-radio>-->
<!--                </b-form-group>-->
<!--                <b-button variant="primary" @click="createUser">登録</b-button>-->
<!--            </b-form-group>-->
<!--        </b-card>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                name: '',-->
<!--                email: '',-->
<!--                selected: '2'-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            createUser() {-->
<!--                let params = {-->
<!--                    name: this.name,-->
<!--                    email: this.email,-->
<!--                    role: this.selected-->
<!--                }-->
<!--                this.$http.post('api/user', params)-->
<!--                    .then(response => {-->
<!--                        console.log(response);-->
<!--                    })-->
<!--                    .catch(error => {-->
<!--                        console.log(error);-->
<!--                    });-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">ユーザ登録</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('userName')">
                        <label for="user-name">ユーザ名</label>
                        <md-input name="user-name" id="user-name" autocomplete="given-name" v-model="form.userName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.userName.required">The user name is required</span>
                        <span class="md-error" v-else-if="!$v.form.userName.minlength">Invalid user name</span>
                    </md-field>

                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                    </md-field>

                    <md-field :class="getValidationClass('radio')">
                        <div>
                            <md-radio v-model="form.radio" value="2">一般ユーザ</md-radio>
                            <md-radio v-model="form.radio" value="1">クリエイター</md-radio>
                            <md-radio v-model="form.radio" value="0">管理者</md-radio>
                        </div>
                        <span class="md-error" v-if="!$v.form.radio.required">The role is required</span>
                    </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {
        required,
        email,
        minLength,
    } from 'vuelidate/lib/validators'

    export default {
        //name: 'FormValidation',
        mixins: [validationMixin],
        data: () => ({
            form: {
                userName: null,
                email: null,
                radio: null,
            },
            userSaved: false,
            sending: false,
            lastUser: null,
        }),
        validations: {
            form: {
                userName: {
                    required,
                    minLength: minLength(3)
                },
                email: {
                    required,
                    email
                },
                radio: {
                    required
                }
            }
        },
        methods: {
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]
                console.log(field);
                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm () {
                this.$v.$reset()
                this.form.userName = null
                this.form.email = null
                this.form.radio = null
            },
            saveUser () {
                this.sending = true


                let password = this.getRandomString();
                let params = {
                    name: this.form.userName,
                    email: this.form.email,
                    role: Number(this.form.radio),
                    password: password,
                    password_confirmation: password,
                }
                //console.log(params);
                axios.post('/api/user/store', params)
                    .then(response => {
                        //console.log(response);
                        this.lastUser = response.data.name
                        this.userSaved = true
                        this.sending = false
                        this.clearForm()
                    })
                    .catch(error => {
                        this.sending = false
                        for (let index in error.response.data.errors) {
                            this.$toasted.global.my_app_error({
                                message : error.response.data.errors[index]
                            });
                        }
                        //this.$toastr.e("ERRROR MESSAGE");
                        console.log(error.response.data.message);
                    });
            },
            validateUser () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            },
            getRandomString(){
                //使用文字の定義
                let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&=~/*-+";

                //桁数の定義
                let len = 8;

                //ランダムな文字列の生成
                let result = "";
                for(let i=0;i<len;i++){
                    result += str.charAt(Math.floor(Math.random() * str.length));
                }
                return result;
            }

        }
    }
</script>

<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>