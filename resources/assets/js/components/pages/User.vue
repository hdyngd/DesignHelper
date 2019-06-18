<template>
    <div>
        <p v-show="user.length == 0">情報の取得に失敗しました。</p>
        <h1>ユーザー情報</h1>
        <table>
            <tr>
                <th>ID</th>
                <td>{{ user.id }}</td>
            </tr>
            <tr>
                <th>ユーザー名</th>
                <td>{{ user.name }}</td>
            </tr>
            <tr>
                <th>メール</th>
                <td>{{ user.email }}</td>
            </tr>
            <tr>
                <th>登録日</th>
                <td>{{ user.created_at }}</td>
            </tr>
            <tr>
                <th>ロール</th>
                <td>{{ user.role }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: state.user
            }
        },
    }
</script>