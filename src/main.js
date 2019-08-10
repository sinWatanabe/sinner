//入口文件
import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import moment from 'moment'
Vue.filter('dateFormat',function(datastr,pattren="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattren)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import { Header, Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import app from './App.vue'
import router from './router.js'
import { format } from "util";

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})