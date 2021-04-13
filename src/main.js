import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import './plugins/element.js'

import VueQuillEditor from 'vue-quill-editor'

import './assets/fonts/fonts.css'
import './assets/css/base.css'
import TreeTable from 'vue-table-with-tree-grid'


import login from './components/login.vue'
import shortcut from './components/shortcut'
import myheader from './components/header'
import mynav from './components/nav.vue'
import footer from './components/footer.vue'
import axios from 'axios'
Vue.component('login-shop', login)
Vue.component('short-cut', shortcut)
Vue.component('my-header', myheader)
Vue.component('my-nav', mynav)
Vue.component('my-footer', footer)
axios.defaults.baseURL = 'http://127.0.0.1:3007'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
});

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal * 1000)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')