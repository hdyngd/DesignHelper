export default {
    methods: {
        addCart(item){
            state.cart.push(item);
        },
        showCart() {
            return state.cart;
        }
        // showCart() {
        //     const token = localStorage.getItem('dhApiToken');
        //     if (token) this.setToken(token);
        // },
        // removeToken() {
        //     axios.defaults.headers.common['Authorization'] = '';
        //     state.isLogin = false;
        //     localStorage.removeItem("dhApiToken");
        // }

        // store: {
//     state: {
//         storeContents: this.editorContents
//     },
//     addContents(newFileData) {
//         this.state.storeContents.push(newFileData);
//     },
//     deleteContents(key) {
//         this.state.storeContents.splice(key,1);
//     }
// }
    }
}