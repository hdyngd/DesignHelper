<template>
    <div>
        <div v-for="article in articles">
            <h1>
                <router-link :to="'/articles/' + article.id">{{ article.title }}</router-link>
            </h1>
            <p>
                {{ article.content }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.fetchArticles()
        },
        data() {
            return {
                articles: []
            }
        },
        methods: {
            fetchArticles() {
                this.$http.get('/api/articles')
                    .then(res =>  {
                        this.articles = res.data
                    })
            }
        }
    }
</script>