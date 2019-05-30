<template>
    <div>
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab title="ユーザ登録" active><regist-user></regist-user></b-tab>
                <b-tab title="カテゴリ登録"><b-card-text>Tab Contents 2</b-card-text></b-tab>
                <b-tab title="メニュー登録"><b-card-text>Tab Contents 3</b-card-text></b-tab>
                <b-tab title="Tab 1"><b-card-text>Tab Contents 1</b-card-text></b-tab>
                <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
                <b-tab title="Tab 3"><b-card-text>Tab Contents 3</b-card-text></b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "SideMenu"
    }
</script>

<style scoped>

</style>