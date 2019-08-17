//入口文件
import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state,goodsinfo){
            var flag = false;
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })

            if(!flag){
                state.car.push(goodsinfo)
            }

            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        }
    }
})

import moment from 'moment'
Vue.filter('dateFormat',function(datastr,pattren="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattren)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import app from './App.vue'
import router from './router.js'
import { format } from "util";

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,
    store
})