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
                axios.post('/api/user/store', params)
                    .then(response => {
                        this.lastUser = response.data.name
                        this.userSaved = true
                        this.sending = false
                        this.clearForm()
                        alert('password: ' + response.data.password);
                        //console.log(response.data.password);
                    })
                    .catch(error => {
                        this.sending = false
                        for (let index in error.response.data.errors) {
                            this.$toasted.global.error({
                                message : error.response.data.errors[index]
                            });
                        }
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