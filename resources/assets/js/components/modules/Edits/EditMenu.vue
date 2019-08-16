<template>
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
            <el-button type="primary" @click.prevent="submitForm('ruleForm')">Edit</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "MenuEditForm",
        props: {
            menu: Object,
            category: Array,
            editMenu: Function,
            toggleDialogEditMenu: Function,
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
        created(){
            this.setData()
        },
        watch: {
            menu: function() {
                this.setData()
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.menu.id,
                            category_id: this.ruleForm.category,
                            name: this.ruleForm.name,
                            price: this.ruleForm.price,
                            description: this.ruleForm.description
                        }
                        //console.log(params);
                        this.editMenu(params)
                            .then((res) => {
                                this.toggleDialogEditMenu(false)
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
            handleAvatarSuccess(res, file) {
                this.ruleForm.thumbnail = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('Avatar picture must be JPG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Avatar picture size can not exceed 2MB!');
                }
                return isJPG && isLt2M;
            },
            setData() {
                this.ruleForm.name = this.menu.name
                this.ruleForm.price = this.menu.price
                this.ruleForm.description = this.menu.description
                this.ruleForm.category = this.menu.category_id
            },
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>