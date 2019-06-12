<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    md-label="No users found"
                    :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
<!--                <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>-->
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Role" md-sort-by="role">{{ item.role }}</md-table-cell>
                <md-table-cell md-label="Edit"><md-icon @click="edit(item.id)">create</md-icon></md-table-cell>
<!--                <md-table-cell md-label="Role" md-sort-by="role">{{ item.role | conversion }}</md-table-cell>-->
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    const toLower = text => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.name).includes(toLower(term)))
        }

        return items
    }

    const roleName = {
        0: "管理者",
        1: "クリエイター",
        2: "一般ユーザー"
    }

    export default {
        data: () =>({
            search: null,
            searched: [],
            users: []
        }),
        // filters: {
        //    conversion: (role) => {
        //         return roleName[role];
        //    }
        // },
        created() {
            axios.get('/api/user/get')
                .then(response => {
                    let tmp = [];
                    // なぜかロールがソートされないのでここで文字に変換する
                    for (let index in response.data){
                        tmp[index] = response.data[index];
                        tmp[index].role = roleName[tmp[index].role];
                    }
                    this.users = tmp;
                    this.searched = tmp;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            // newUser () {
            //     window.alert('Noop')
            // },
            getClass: () => ({
                'md-primary': true,
            }),
            searchOnTable () {
                this.searched = searchByName(this.users, this.search)
            },
            onSelect (item) {
                console.log('select!!');
                console.log(item);
            },
            edit (id) {
                console.log('click!!');
                console.log(id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>