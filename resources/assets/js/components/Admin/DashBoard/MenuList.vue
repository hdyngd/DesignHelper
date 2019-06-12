<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Menus</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    md-label="No Menus found"
                    :md-description="`No menu found for this '${search}' query. Try a different search term or create a new menu.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="CategoryName" md-sort-by="CategoryName">{{ item.categoryName }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Price" md-sort-by="price" md-numeric>¥ {{ item.price }}</md-table-cell>
                <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
                <md-table-cell md-label="Edit"><md-icon @click="edit(item.id)">create</md-icon></md-table-cell>
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

    export default {
        data: () =>({
            search: null,
            searched: [],
            menus: []
        }),
        created() {
            axios.get('/api/menu/get')
                .then(response => {
                    console.log(response.data);
                    this.menus = response.data;
                    this.searched = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            getClass: () => ({
                'md-primary': true,
            }),
            searchOnTable () {
                this.searched = searchByName(this.menus, this.search)
            },
            onSelect (item) {
                console.log(item);
            },
            edit (id) {
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