<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateCategory">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">カテゴリ追加</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('categoryName')">
                        <label for="category-name">カテゴリ名</label>
                        <md-input name="category-name" id="category-name" autocomplete="given-category-name" v-model="form.categoryName" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.categoryName.required">The category name is required</span>
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
                    <md-button type="submit" class="md-primary" :disabled="sending">Add category</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="categoryAdded">The category {{ categoryName }} was added with success!</md-snackbar>
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
                categoryName: null,
                description: null,
            },
            categoryName: null,
            categoryAdded: false,
            sending: false,
        }),
        validations: {
            form: {
                categoryName: {
                    required,
                },
            }
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
                this.form.categoryName = null
                this.form.description = null
            },
            addCategory() {
                this.sending = true

                let params = {
                    name: this.form.categoryName,
                    description: this.form.description
                }
                axios.post('/api/category/store', params)
                    .then(response => {
                        this.categoryName = response.data.name
                        this.categoryAdded = true
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
                    this.addCategory()
                }
            },
        }
    }
</script>