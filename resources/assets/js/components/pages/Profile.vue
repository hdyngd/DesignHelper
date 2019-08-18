<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-card>
                <div slot="header" class="clearfix">
                    <h3>プロフィール</h3>
                </div>
                <profile-edit-form
                    :admin="false"
                ></profile-edit-form>
                <form id="mainform">
                    <input id="tkn" name="tkn" type="hidden" value="">
                    <div id="CARD_INPUT_FORM" />

                    <el-button type="primary" @click="doPurchase()">購入する</el-button>

                </form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Profile",
        methods: {
            doPurchase() {
                CPToken.CardInfo (
                    {
                        aid: process.env.MIX_ROBOTPAYMENT_AID
                    },
                    this.execPurchase
                );
            },
            execPurchase(resultCode, errMsg) {
                if (resultCode != "Success") {
                    // 戻り値がSuccess以外の場合はエラーメッセージを表示
                    window.alert(errMsg);
                } else {
                    // スクリプトからフォームをsubmit
                    $("#mainform").submit();
                }
            }

        }

    }
</script>

<style scoped>

</style>