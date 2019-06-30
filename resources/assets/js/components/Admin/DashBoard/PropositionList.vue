<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Propositions</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by progress..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    md-label="No propositions found"
                    :md-description="`No proposition found for this '${search}' query. Try a different search term or create a new proposition.`">
                <!--                <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>-->
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Menu" md-sort-by="menuName">{{ item.menuName }}</md-table-cell>
                <md-table-cell md-label="Amount" md-sort-by="amount">{{ item.amount }}</md-table-cell>
                <md-table-cell md-label="Orderer" md-sort-by="clientName">{{ item.clientName }}</md-table-cell>
                <md-table-cell md-label="Creater" md-sort-by="desinerName">{{ item.designerName }}</md-table-cell>
                <md-table-cell md-label="Progress" md-sort-by="progress">{{ item.progress }}</md-table-cell>
                <md-table-cell md-label="OrderDate" md-sort-by="created_at">{{ item.created_at }}</md-table-cell>
            </md-table-row>
        </md-table>
        <attach-designer></attach-designer>
    </div>
</template>

<script>
    import AttachDesigner from "./AttachDesigner";
    const toLower = text => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.progress).includes(toLower(term)))
        }

        return items
    }

    const progressName = {
        0: "未着手",
        1: "着手",
        2: "作業中",
        3: "クライアント確認",
        4: "最終調整",
        5: "納品済"
    }

    export default {
        components: {AttachDesigner},
        data: () =>({
            search: null,
            searched: [],
            propositions: []
        }),
        created() {
            this.setPropositions();
        },
        mounted() {
            Bus.$on('setPropositions', () => {
                this.setPropositions();
            });
        },
        methods: {
            getClass: () => ({
                'md-primary': true,
            }),
            searchOnTable () {
                this.searched = searchByName(this.propositions, this.search)
            },
            onSelect (item) {
                Bus.$emit('showAttachDesigner', {proposition: item});
            },
            setPropositions() {
                axios.get('/api/proposition/get')
                    .then(response => {
                        let tmp = [];

                        for (let index in response.data){
                            tmp[index] = response.data[index];
                            tmp[index].progress = progressName[tmp[index].progress];
                        }
                        this.propositions = tmp;
                        this.searched = tmp;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>