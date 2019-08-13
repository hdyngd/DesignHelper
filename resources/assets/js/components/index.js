import Vue from 'vue'

Vue.component('dh-header', require('@/js/containers/header').default);
Vue.component('dh-side-menu', require('@/js/components/modules/menus/SideMenu'));
Vue.component('admin-side-menu', require('@/js/components/modules/menus/AdminSideMenu'));
Vue.component('admin-dash-board', require('@/js/components/modules/admins/DashBoard'));
Vue.component('admin-regist-user', require('@/js/components/modules/admins/RegistUser'));
Vue.component('admin-add-category', require('@/js/components/modules/admins/AddCategory'));
Vue.component('admin-add-menu', require('@/js/components/modules/admins/AddMenu'));
Vue.component('user-list', require('@/js/components/modules/lists/UserList'));
Vue.component('category-list', require('@/js/components/modules/lists/CategoryList'));
Vue.component('menu-list', require('@/js/components/modules/lists/MenuList'));
Vue.component('proposition-list', require('@/js/components/modules/lists/PropositionList'));
Vue.component('dh-description', require('@/js/components/modules/homes/Description'));
Vue.component('shopping-cart', require('@/js/containers/shopping_cart').default);
Vue.component('attach-creator', require('@/js/components/modules/dialogs/AttachCreator'));
Vue.component('chat', require('@/js/containers/chat').default);
