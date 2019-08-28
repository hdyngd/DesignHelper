<template>
    <el-card>
        <div slot="header" class="clearfix">
            <h3>{{ category.name }}</h3>
            <h6>{{ category.description }}</h6>
        </div>

        <el-col :span="12" v-for="(item, index) in category.menus" :key="item.id">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                </div>
                <div class="text item">
                    <div>
                        <el-image
                            v-if="item.image"
                            style="width: 100px; height: 100px"
                            :src="item.image"
                            fit="fill"/>
                        <el-image
                            v-else
                            style="width: 100px; height: 100px"
                            src="https://design-helper.s3-ap-northeast-1.amazonaws.com/menu/picture_icon.png"
                            fit="fill"/>
                    </div>
                    <div>{{item.description}}</div>
                    <div>¥ {{item.price}}</div>
                </div>
                <div class="bottom clearfix">
                    <el-button style="float: right;" type="text" class="button" @click="onAddToCart(index)"><i class="fas fa-cart-plus"></i></el-button>
                </div>
            </el-card>
        </el-col>

    </el-card>
</template>

<script>
    export default {
        name: "MenuStore",
        props: {
            category: Object,
            fetchMenu: Function,
            addToCart: Function,
        },
        //動的ルートの時、パラメータのみの変更はインスタンス再利用のためlifecyclehookが呼ばれない。
        //だから、$route をwatchすることで変更を検知、任意のアクションを定義できる。
        watch: {
            '$route'(to, from) {
                this.fetchMenu(to.params.id)
            }
        },
        methods: {
            onAddToCart(index) {
                this.addToCart(this.category.menus[index])
            }
        }
    }
</script>

<style scoped>
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .box-card {
        margin-bottom: 10px;
        margin-right: 10px;
    }
</style>