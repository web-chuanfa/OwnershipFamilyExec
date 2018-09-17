import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'
import axios from 'axios';

Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'

import App from 'src/App'


Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    render: (h) => h(App)
})
