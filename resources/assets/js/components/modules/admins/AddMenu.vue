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

            <el-form-item label="Display" prop="display">
                <el-radio-group v-model="ruleForm.display">
                    <el-radio :label="1">表示</el-radio>
                    <el-radio :label="0">非表示</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="ProgressTag">
                <tag-generator :dynamic-tags="dynamicTags"></tag-generator>
            </el-form-item>

            <el-form-item label="Image" prop="thumbnail">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="ruleForm.thumbnail" :src="ruleForm.thumbnail" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            addMenu: Function,
        },
        data() {
            return {
                ruleForm: {
                    category: '',
                    name: '',
                    price: 0,
                    description: '',
                    thumbnail: '',
                    display: '',
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
                    ],
                    display: [
                        { required: true, message: 'Please select activity display', trigger: 'change' }
                    ],
                },
                dynamicTags: ['未着手', '着手', '作業中'],
                fileData: null,
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new FormData();
                        params.append('category_id', this.ruleForm.category);
                        params.append('name', this.ruleForm.name);
                        params.append('price', this.ruleForm.price);
                        params.append('description', this.ruleForm.description);
                        params.append('display', this.ruleForm.display);
                        params.append('progress_tags', JSON.stringify(this.dynamicTags));
                        params.append('image', this.fileData);

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
            handleAvatarSuccess(res, file) {
                this.ruleForm.thumbnail = URL.createObjectURL(file.raw);
                this.fileData = file.raw;
            },
            beforeAvatarUpload(file) {
                const isIMG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isIMG) {
                    this.$message.error('Image picture must be JPG or PNG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Image picture size can not exceed 2MB!');
                }
                return isIMG && isLt2M;
            },
        }
    }
</script>

<style>
    input[type="file"] {
        display: none;
    }

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