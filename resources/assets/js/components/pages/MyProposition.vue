<template>
    <el-col :span="20" :offset="2">
        <el-card class="box-card">
            <el-table
                    :data="propositions.filter(data => !search || data.menuName.toLowerCase().includes(search.toLowerCase()))"
                    height="500"
                    style="width: 100%"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    @expand-change="handleExpandChange">

                <el-table-column type="expand">
                    <template slot-scope="props">
                        <progress-steps :proposition="props.row"></progress-steps>
<!--                        <template v-if="props.row.designer_id !== null">-->
<!--                            <el-button v-if="isChatOpen" type="primary" icon="el-icon-close" circle @click.stop="closeChat"></el-button>-->
<!--                            <el-button v-else type="primary" icon="el-icon-chat-line-round" circle @click.stop="openChat(props.row.id)"></el-button>-->
<!--                        </template>-->
                            <!--                        <chat></chat>-->
                    </template>
                </el-table-column>

                <el-table-column
                        label="ID"
                        prop="id"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="Menu"
                        prop="menuName"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="Amount"
                        prop="amount"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="Orderer"
                        prop="clientName"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="Creator"
                        prop="designerName"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="Progress"
                        prop="progressName"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="OrderDate"
                        prop="created_at"
                        sortable>
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="Type to search"/>
                    </template>
                    <template slot-scope="scope">
                        <template v-if="scope.row.designer_id !== null">
                            <el-button v-if="isChatOpen" type="primary" icon="el-icon-close" circle @click.stop="closeChat"></el-button>
                            <el-button v-else type="primary" icon="el-icon-chat-line-round" circle @click.stop="openChat(scope.row.id)"></el-button>
                        </template>
<!--                        <router-link :to="'/proposition/' + scope.row.id">-->
<!--                            <el-button size="mini">-->
<!--                                Detail-->
<!--                            </el-button>-->
<!--                        </router-link>-->
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <chat v-if="isChatOpen"></chat>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
            }
        },
        props: {
            propositions: Array,
            isChatOpen: Boolean,
            chatToggle: Function,
            fetchChat: Function,
            // fetchParticipants: Function,
            // fetchMessageList: Function,
            // fetchProposition: Function,
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleExpandChange(row) {
                // this.fetchParticipants(row.id);
                // this.fetchMessageList(row.id);
                // this.fetchProposition(row.id);
                console.log(row);
            },
            closeChat() {
                this.chatToggle(false);
            },
            openChat(id) {
                this.fetchChat(id);
                // this.chatToggle(true);
            }

        },
    }
</script>