export default {
    methods: {
        setToken(token){
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('dhApiToken', token);
            state.isLogin = true;
        },
        getToken() {
            const token = localStorage.getItem('dhApiToken');
            if (token) this.setToken(token);
        },
        removeToken() {
            axios.defaults.headers.common['Authorization'] = '';
            state.isLogin = false;
            localStorage.removeItem("dhApiToken");
        }
    }
}