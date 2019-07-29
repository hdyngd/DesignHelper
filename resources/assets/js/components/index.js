import Vue from 'vue'

Vue.component('dh-header', require('@/js/containers/header').default);
Vue.component('dh-side-menu', require('@/js/containers/side_menu').default);
Vue.component('admin-side-menu', require('@/js/components/modules/menus/AdminSideMenu'));
Vue.component('admin-dash-board', require('@/js/components/modules/admins/DashBoard'));
Vue.component('admin-regist-user', require('@/js/components/modules/admins/RegistUser'));
Vue.component('admin-add-category', require('@/js/components/modules/admins/AddCategory'));
Vue.component('admin-add-menu', require('@/js/components/modules/admins/AddMenu'));
