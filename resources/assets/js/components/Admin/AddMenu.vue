<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateCategory">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">メニュー追加</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('category')">
                        <label for="category">カテゴリ</label>
                        <md-select name="category" id="category" v-model="form.category">
                            <md-option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</md-option>
                        </md-select>
                        <span class="md-error" v-if="!$v.form.category.required">The select category is required</span>
                    </md-field>
                </md-card-content>

                <md-card-content>
                    <md-field :class="getValidationClass('menuName')">
                        <label for="menu-name">メニュー名</label>
                        <md-input name="menu-name" id="menu-name" autocomplete="given-menu-name" v-model="form.menuName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.menuName.required">The menu name is required</span>
                    </md-field>
                </md-card-content>

                <md-card-content>
                    <md-field :class="getValidationClass('price')">
                        <label for="price">価格</label>
                        <span class="md-prefix">¥</span>
                        <md-input name="price" id="price" autocomplete="given-menu-price" v-model="form.price" type="number" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.price.required">The price is required</span>
                    </md-field>
                </md-card-content>

                <md-card-content>
                    <md-field>
                        <label for="description">Description</label>
                        <md-textarea name="description" id="description" v-model="form.description"></md-textarea>
                    </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Add menu</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="menuAdded">The menu {{ menuName }} was added with success!</md-snackbar>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {
        required,
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        data: () => ({
            form: {
                category: null,
                menuName: null,
                price: 0,
                description: null,
            },
            categoryList: [],
            menuName: null,
            menuAdded: false,
            sending: false,
        }),
        validations: {
            form: {
                category: { required,},
                menuName: { required,},
                price: { required,},
            }
        },
        created() {
            axios.get('/api/category/get')
                .then(response => {
                    for (let index in response.data) {
                        let item = {
                            id: response.data[index].id,
                            name: response.data[index].name
                        }
                        this.categoryList.push(item);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]
                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.category = null
                this.form.menuName = null
                this.form.price = 0
                this.form.description = null
            },
            addMenu() {
                this.sending = true

                let params = {
                    category_id: this.form.category,
                    name: this.form.menuName,
                    price: this.form.price,
                    description: this.form.description
                }

                axios.post('/api/menu/store', params)
                    .then(response => {
                        this.menuName = response.data.name
                        this.menuAdded = true
                        this.sending = false
                        this.clearForm()
                    })
                    .catch(error => {
                        this.sending = false
                        for (let index in error.response.data.errors) {
                            this.$toasted.global.error({
                                message: error.response.data.errors[index]
                            });
                        }
                    });
            },
            validateCategory() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.addMenu()
                }
            },
        }
    }
</script>

<style scoped>

</style>