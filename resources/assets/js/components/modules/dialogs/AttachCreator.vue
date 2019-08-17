<template>
    <el-dialog
        title="Select Creator"
        :visible.sync="attachCreatorVisible"
        :before-close="closeDialog"
        width="30%">
        <el-form>
            <el-form-item label="Creator">
                <el-select v-model="creator" placeholder="Please select a Creator">
                    <el-option v-for="item in creators" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">Cancel</el-button>
    <el-button type="primary" @click="onAttach">Attach</el-button>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "AttachCreator",
        props: {
            attachCreatorVisible: Boolean,
            creators: Array,
            propositionId: Number,
            attachCreator: Function,
            toggleAttachCreator: Function,
        },
        data() {
            return {
                creator: null,
            };
        },
        methods: {
            closeDialog() {
                this.toggleAttachCreator(false)
            },
            onAttach() {
                const params = {
                    proposition_id: this.propositionId,
                    designer_id: this.creator
                }
                this.attachCreator(params)
                    .then(() => {
                        this.toggleAttachCreator(false)
                    })
                    .catch(() => {});
            }

        }
    }
</script>

<style scoped>

</style>