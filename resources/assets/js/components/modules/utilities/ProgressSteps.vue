<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step v-for="item in proposition.progressTags" :key="item.id" :title="item.name"></el-step>
        </el-steps>

        <el-button v-if="me.role === 1" style="margin-top: 12px;" @click="previous"><i class="el-icon-arrow-left"></i> Previous step</el-button>
        <el-button v-if="me.role === 1" style="margin-top: 12px;" @click="next">Next step <i class="el-icon-arrow-right"></i></el-button>
    </div>
</template>

<script>
    export default {
        name: "ProgressSteps",
        props: {
            proposition: Object,
            editProgress: Function,
            me: Object,
            // progress: Number,
            // progressTags: Array
        },
        data() {
            return {
                active: this.proposition.progress,
            };
        },
        methods: {
            next() {
                if(this.active < this.proposition.progressTags.length - 1) {
                    this.active++
                    this.editProgress({proposition_id: this.proposition.id, progress: this.active});
                }
            },
            previous() {
                if(this.active > 0) {
                    this.active--
                    this.editProgress({proposition_id: this.proposition.id, progress: this.active});
                }
            }
        }

    }
</script>

<style scoped>

</style>