<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>メニュー追加</h3>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

            <el-form-item label="Category" prop="category">
                <el-select v-model="ruleForm.category" placeholder="Category">
                    <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="MenuName" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="Price" prop="price">
                <el-input-number v-model="ruleForm.price" controls-position="right" :min="1000">
                    <el-button slot="prepend" icon="fas fa-yen-sign"></el-button>
                </el-input-number>
            </el-form-item>

            <el-form-item label="Description" prop="description">
                <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click.prevent="submitForm('ruleForm')">Add</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        props: {
            category: Array,
            addMenu: Function
        },
        data() {
            return {
                ruleForm: {
                    category: '',
                    name: '',
                    price: 0,
                    description: '',
                },
                rules: {
                    category: [
                        { required: true, message: 'Select category is required', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: 'Menu name is required', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: 'price is required'},
                        { type: 'number', message: 'price must be a number'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            category_id: this.ruleForm.category,
                            name: this.ruleForm.name,
                            price: this.ruleForm.price,
                            description: this.ruleForm.description
                        }

                        //console.log(params);
                        this.addMenu(params)
                            .then((res) => {
                                // console.log(res)
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style>

</style>